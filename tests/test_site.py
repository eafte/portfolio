import json
import shutil
import subprocess
import unittest
import xml.etree.ElementTree as ET
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit


ROOT = Path(__file__).resolve().parents[1]


class PortfolioPage(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.references = []
        self.id_references = []
        self.json_ld = []
        self.inline_scripts = []
        self.lang = None
        self.title = ""
        self.description = None
        self.canonical = None
        self._in_title = False
        self._in_json_ld = False
        self._in_javascript = False

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag == "html":
            self.lang = attrs.get("lang")
        if tag == "title":
            self._in_title = True
        if tag == "meta" and attrs.get("name") == "description":
            self.description = attrs.get("content")
        if tag == "meta" and (
            attrs.get("property") == "og:image" or attrs.get("name") == "twitter:image"
        ):
            self.references.append(attrs.get("content", ""))
        if tag == "link" and "canonical" in attrs.get("rel", "").split():
            self.canonical = attrs.get("href")
        if tag == "script" and attrs.get("type") == "application/ld+json":
            self._in_json_ld = True
            self.json_ld.append("")
        elif tag == "script" and not attrs.get("src") and attrs.get("type", "") in (
            "", "text/javascript", "application/javascript"
        ):
            self._in_javascript = True
            self.inline_scripts.append("")

        if attrs.get("id"):
            self.ids.append(attrs["id"])
        for attribute in ("href", "src"):
            if attrs.get(attribute):
                self.references.append(attrs[attribute])
        if attrs.get("srcset"):
            self.references.extend(
                candidate.strip().split()[0]
                for candidate in attrs["srcset"].split(",")
                if candidate.strip()
            )
        for attribute in ("aria-controls", "aria-labelledby", "aria-describedby"):
            self.id_references.extend(attrs.get(attribute, "").split())

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False
        if tag == "script":
            self._in_json_ld = False
            self._in_javascript = False

    def handle_data(self, data):
        if self._in_title:
            self.title += data
        if self._in_json_ld:
            self.json_ld[-1] += data
        if self._in_javascript:
            self.inline_scripts[-1] += data


class PortfolioTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.page = PortfolioPage()
        cls.page.feed((ROOT / "index.html").read_text(encoding="utf-8"))
        cls.page.close()

    def local_reference(self, reference):
        base = urlsplit(self.page.canonical)
        target = urlsplit(urljoin(self.page.canonical, reference))
        prefix = base.path.rstrip("/") + "/"
        if (target.scheme, target.netloc) != (base.scheme, base.netloc):
            return None
        if not target.path.startswith(prefix):
            return None
        path = unquote(target.path[len(prefix):]) or "index.html"
        return path, unquote(target.fragment)

    def test_page_has_basic_metadata_and_sections(self):
        self.assertEqual(self.page.lang, "en")
        self.assertTrue(self.page.title.strip())
        self.assertTrue(self.page.description)
        self.assertTrue(self.page.canonical)
        self.assertTrue(
            {"work", "research", "skills", "experience", "education", "contact"}
            <= set(self.page.ids)
        )

    def test_ids_are_unique(self):
        duplicates = [name for name, count in Counter(self.page.ids).items() if count > 1]
        self.assertEqual(duplicates, [])

    def test_internal_links_and_accessibility_references_resolve(self):
        ids = set(self.page.ids)
        for reference in self.page.references:
            local = self.local_reference(reference)
            if local and local[0] == "index.html" and local[1]:
                with self.subTest(reference=reference):
                    self.assertIn(local[1], ids)
        for reference in self.page.id_references:
            with self.subTest(reference=reference):
                self.assertIn(reference, ids)

    def test_local_files_exist(self):
        for reference in self.page.references:
            local = self.local_reference(reference)
            if local is None:
                continue
            with self.subTest(reference=reference):
                target = (ROOT / local[0]).resolve()
                self.assertTrue(target == ROOT or ROOT in target.parents, reference)
                self.assertTrue(target.exists(), reference)

    def test_structured_data_and_sitemap_match_canonical_url(self):
        self.assertEqual(len(self.page.json_ld), 1)
        person = json.loads(self.page.json_ld[0])
        self.assertEqual(person["@type"], "Person")
        self.assertEqual(person["url"], self.page.canonical)

        sitemap = ET.parse(ROOT / "sitemap.xml")
        locations = [element.text for element in sitemap.findall(".//{*}loc")]
        self.assertIn(self.page.canonical, locations)
        robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
        self.assertIn(f"Sitemap: {urljoin(self.page.canonical, 'sitemap.xml')}", robots)

    @unittest.skipUnless(shutil.which("node"), "Node.js is not installed")
    def test_javascript_syntax(self):
        scripts = [("script.js", (ROOT / "script.js").read_text(encoding="utf-8"))]
        scripts.extend(
            (f"inline script {index}", script)
            for index, script in enumerate(self.page.inline_scripts, start=1)
        )
        for name, script in scripts:
            with self.subTest(script=name):
                result = subprocess.run(
                    ["node", "--check"],
                    input=script,
                    capture_output=True,
                    text=True,
                    check=False,
                )
                self.assertEqual(result.returncode, 0, result.stderr)


if __name__ == "__main__":
    unittest.main()
