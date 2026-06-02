"""
Generate DevTools Hub User Guide PDF
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.units import inch, mm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    HRFlowable
)
from reportlab.lib.enums import TA_CENTER, TA_LEFT
import os

VIOLET = HexColor("#7c3aed")
INDIGO = HexColor("#4f46e5")
DARK = HexColor("#18181b")
GRAY = HexColor("#71717a")
LIGHT_BG = HexColor("#f4f4f5")
WHITE = HexColor("#ffffff")

output_dir = os.path.join(os.path.dirname(__file__), "..", "public")
output_path = os.path.join(output_dir, "devtoolshub-guide.pdf")

doc = SimpleDocTemplate(
    output_path,
    pagesize=A4,
    topMargin=30 * mm,
    bottomMargin=25 * mm,
    leftMargin=25 * mm,
    rightMargin=25 * mm,
)

styles = getSampleStyleSheet()

# Custom styles
styles.add(ParagraphStyle("CoverTitle", parent=styles["Title"], fontSize=32, textColor=VIOLET, spaceAfter=10, alignment=TA_CENTER, fontName="Helvetica-Bold"))
styles.add(ParagraphStyle("CoverSub", parent=styles["Normal"], fontSize=14, textColor=GRAY, alignment=TA_CENTER, spaceAfter=30))
styles.add(ParagraphStyle("SectionTitle", parent=styles["Heading1"], fontSize=20, textColor=VIOLET, spaceBefore=20, spaceAfter=10, fontName="Helvetica-Bold"))
styles.add(ParagraphStyle("ToolName", parent=styles["Heading2"], fontSize=13, textColor=DARK, spaceBefore=14, spaceAfter=4, fontName="Helvetica-Bold"))
styles.add(ParagraphStyle("ToolDesc", parent=styles["Normal"], fontSize=10, textColor=GRAY, spaceAfter=2, leftIndent=12))
styles.add(ParagraphStyle("HowTo", parent=styles["Normal"], fontSize=10, textColor=DARK, spaceAfter=8, leftIndent=12, leading=15))
styles.add(ParagraphStyle("FooterStyle", parent=styles["Normal"], fontSize=8, textColor=GRAY, alignment=TA_CENTER))
styles.add(ParagraphStyle("Intro", parent=styles["Normal"], fontSize=11, textColor=DARK, spaceAfter=10, leading=16))

story = []

# ── Cover Page ──
story.append(Spacer(1, 80))
story.append(Paragraph("&lt;/&gt;", ParagraphStyle("CodeIcon", parent=styles["Title"], fontSize=48, textColor=VIOLET, alignment=TA_CENTER, spaceAfter=10)))
story.append(Paragraph("DevTools Hub", styles["CoverTitle"]))
story.append(Paragraph("User Guide & Tool Reference", styles["CoverSub"]))
story.append(HRFlowable(width="40%", thickness=2, color=VIOLET, spaceAfter=20))
story.append(Paragraph("50+ free developer tools — encode, decode, hash, convert,<br/>format, and more. All client-side, private, no sign-up.", styles["CoverSub"]))
story.append(Spacer(1, 40))
story.append(Paragraph("https://devtoolshub-pink.vercel.app", ParagraphStyle("URL", parent=styles["Normal"], fontSize=11, textColor=INDIGO, alignment=TA_CENTER)))
story.append(PageBreak())

# ── Table of Contents ──
story.append(Paragraph("Table of Contents", styles["SectionTitle"]))
story.append(Spacer(1, 10))

toc_items = [
    "1. Getting Started",
    "2. Utilities",
    "3. Encoders & Decoders",
    "4. Converters",
    "5. Image Tools",
    "6. Generators",
    "7. Security & Encryption",
    "8. Formatters & Beautifiers",
    "9. SEO Tools",
]
for item in toc_items:
    story.append(Paragraph(item, ParagraphStyle("TOC", parent=styles["Normal"], fontSize=12, textColor=DARK, spaceBefore=6, leftIndent=20)))

story.append(PageBreak())

# ── Getting Started ──
story.append(Paragraph("1. Getting Started", styles["SectionTitle"]))
story.append(Paragraph(
    "DevTools Hub is a collection of 50+ free, fast developer tools that run entirely in your browser. "
    "Your data never leaves your device — there are no uploads, no server processing, no tracking, and no sign-up required.",
    styles["Intro"]
))
story.append(Paragraph(
    "<b>How to use:</b> Visit the homepage, find the tool you need by browsing categories or using the search bar, "
    "click on it, and start using it immediately. Results appear in real-time as you type.",
    styles["Intro"]
))
story.append(Paragraph(
    "<b>Privacy:</b> All encoding, decoding, hashing, formatting, and conversion happens client-side using JavaScript and the Web Crypto API. "
    "Image tools use the HTML5 Canvas. Server-side API routes are only used for tools that need to make external network requests "
    "(like Website Status Checker and HTTP Headers Parser).",
    styles["Intro"]
))
story.append(Spacer(1, 10))

# ── Tool Categories ──
categories = [
    ("2. Utilities", [
        ("Website Status Checker", "Check whether a website is online or not.", "Enter a URL (e.g. google.com) and click 'Check Status'. The tool pings the site via our API and reports the HTTP status code and response time."),
        ("User Agent Finder", "Find out your browser's user agent string.", "Simply open the tool — your user agent is detected and displayed automatically. Click 'Copy' to copy it to your clipboard."),
        ("What's My IP", "Find out your public IP address.", "Opens and instantly displays your public IP address as detected by our server. Useful for debugging network issues."),
        ("Ping", "Measure HTTP latency for any address.", "Enter a hostname or URL. The tool sends 5 HTTP HEAD requests and shows response time for each, plus min/avg/max stats."),
        ("URL Unshortener", "Unshorten a URL and find the original.", "Paste a shortened URL (bit.ly, t.co, etc.) to reveal the full destination URL. Coming soon."),
        ("URL Encoder", "Encode your URL to make it transmission-safe.", "Paste any text or URL. The encoded version appears instantly using JavaScript's encodeURIComponent()."),
        ("URL Decoder", "Decode any URL that has been encoded.", "Paste a percent-encoded string. The decoded version appears instantly using decodeURIComponent()."),
        ("SSL Checker", "Verify SSL certificate of any website.", "Enter a domain to check its SSL certificate validity. Coming soon."),
        ("HTTP Headers Parser", "Parse and inspect HTTP headers of any URL.", "Enter a URL and click 'Get Headers'. Our API fetches the headers and displays them in a formatted table with header name and value."),
        ("QR Code Reader", "Read and decode QR codes from images.", "Upload an image containing a QR code to decode it. Coming soon."),
        ("Email Validator", "Check if an email address is valid.", "Type an email address. The tool validates the format in real-time using a regex pattern and shows a green/red indicator."),
        ("YouTube Thumbnail Downloader", "Download thumbnails from any YouTube video.", "Paste a YouTube URL or video ID. All available thumbnail sizes (max, SD, HQ, MQ, default) are displayed instantly — click to open."),
        ("Redirect Checker", "Trace URL redirects and hops.", "Enter a URL and click 'Trace Redirects'. The tool follows each redirect hop and displays the chain with status codes."),
    ]),
    ("3. Encoders & Decoders", [
        ("Base64 Encode", "Encode text to Base64 format.", "Type or paste any text. The Base64-encoded output appears instantly. Supports Unicode text via UTF-8 encoding."),
        ("Base64 Decode", "Decode Base64 back to plain text.", "Paste a Base64 string. The decoded plain text appears instantly. Shows an error message for invalid Base64 input."),
        ("ROT13 Encoder", "Encode text using the ROT13 cipher.", "Type any text. Each letter is shifted 13 positions in the alphabet. Numbers, spaces, and symbols are preserved."),
        ("ROT13 Decoder", "Decode ROT13-encoded text.", "Paste ROT13 text. Since ROT13 is its own inverse, encoding and decoding use the same function."),
        ("Binary to Text", "Convert binary code to readable text.", "Enter space-separated 8-bit binary values (e.g. 01001000 01101001). Each byte is converted to its ASCII character."),
        ("Text to Binary", "Convert text to binary representation.", "Type any text. Each character is converted to its 8-bit binary representation, space-separated."),
        ("Punycode to Unicode", "Convert Punycode to Unicode characters.", "Enter a Punycode-encoded domain (e.g. xn--nxasmq6b). The Unicode equivalent is displayed."),
        ("Unicode to Punycode", "Convert Unicode to Punycode encoding.", "Enter a Unicode domain (e.g. münchen.de). The Punycode-encoded version is displayed."),
    ]),
    ("4. Converters", [
        ("Hex to RGB", "Convert hex color codes to RGB values.", "Enter a hex color code (with or without #). The RGB value is displayed along with a color preview swatch."),
        ("RGB to Hex", "Convert RGB values to hex color codes.", "Enter R, G, B values (0-255). The hex code is displayed along with a color preview swatch."),
        ("Timestamp Converter", "Convert between Unix timestamps and dates.", "Two panels: enter a Unix timestamp to convert to ISO date, or enter a date string to get the timestamp. 'Now' button fills the current time."),
        ("Markdown to HTML", "Convert Markdown text to HTML.", "Type Markdown syntax (headings, bold, italic, links, lists). The HTML output appears in real-time."),
        ("HTML to Markdown", "Convert HTML back to Markdown.", "Paste HTML code. The Markdown equivalent is generated, converting tags to their Markdown syntax."),
        ("CSV to JSON", "Convert CSV data to JSON format.", "Paste CSV data with a header row. Click 'Convert' to get a formatted JSON array of objects."),
        ("JSON to CSV", "Convert JSON data to CSV format.", "Paste a JSON array of objects. Click 'Convert' to get CSV with headers extracted from object keys."),
        ("Memory Storage Converter", "Convert between bytes, KB, MB, GB, and TB.", "Enter a value and select the source unit. All other unit conversions are displayed simultaneously in a grid."),
    ]),
    ("5. Image Tools", [
        ("JPG to PNG / JPG to WebP", "Convert JPG images to PNG or WebP format.", "Click to select a JPG file. Click 'Convert' — the image is processed in your browser using HTML5 Canvas. Click 'Download' to save."),
        ("PNG to JPG / PNG to WebP", "Convert PNG images to JPG or WebP format.", "Same workflow as above. The conversion happens entirely client-side — your images are never uploaded."),
        ("WebP to JPG / WebP to PNG", "Convert WebP images to JPG or PNG format.", "Select a WebP file, convert, and download. All processing happens in the browser."),
        ("Image Compressor", "Compress images without losing quality.", "Select an image, adjust the quality slider (10%-100%), click 'Compress'. Shows original vs. compressed size and percentage saved."),
        ("Image Resizer", "Resize images to any dimension.", "Select an image. Enter new width/height. 'Lock ratio' keeps the aspect ratio. Click 'Resize' then 'Download'."),
        ("Image to Base64", "Convert images to Base64 encoded strings.", "Select any image. The full data URI (data:image/...) is displayed and can be copied for use in CSS, HTML, or APIs."),
    ]),
    ("6. Generators", [
        ("Password Generator", "Generate strong, random passwords.", "Set length (4-128), toggle character types (uppercase, lowercase, digits, symbols). Click 'Generate'. Uses crypto.getRandomValues() for true randomness."),
        ("UUID Generator", "Generate random UUIDv4 identifiers.", "Set the count (1-100) and click 'Generate'. Uses crypto.randomUUID() for cryptographically random UUIDs."),
        ("QR Code Generator", "Generate QR codes from any text or URL.", "Enter text or a URL and click 'Generate QR'. The QR code image can be downloaded as PNG."),
        ("Lorem Ipsum Generator", "Generate placeholder text for designs.", "Set the number of paragraphs (1-50) and click 'Generate'. Each paragraph has 40-80 random Latin words."),
        ("Random Number Generator", "Generate random numbers in any range.", "Set min, max, and count. Click 'Generate' to get random integers in the specified range."),
    ]),
    ("7. Security & Encryption", [
        ("Bcrypt Generator", "Hash passwords using a secure algorithm.", "Enter a password, set the rounds (4-16), click 'Generate Hash'. Uses PBKDF2-SHA256 via Web Crypto API as a browser-compatible alternative."),
        ("MD5 Generator", "Generate MD5 hashes from any text.", "Enter text and click 'Generate MD5'. Uses a pure JavaScript MD5 implementation. Note: MD5 is not recommended for security — use SHA-256 instead."),
        ("SHA Generator", "Generate SHA-1, SHA-256, and SHA-512 hashes.", "Enter text, select the algorithm, click 'Generate'. Uses the Web Crypto API's SubtleCrypto.digest() method."),
        ("Hash Generator", "Generate various hash digests from text.", "Enter text and click 'Generate Hashes'. Produces SHA-1, SHA-256, and SHA-512 all at once for comparison."),
        ("Password Strength Test", "Test how strong your password is.", "Type a password. A real-time strength meter shows 7 criteria: length (8+, 12+), uppercase, lowercase, numbers, symbols, and common pattern detection."),
    ]),
    ("8. Formatters & Beautifiers", [
        ("JSON Formatter", "Format and beautify JSON data.", "Paste JSON, choose indent (2 or 4 spaces), click 'Format' to beautify or 'Minify' to compress. Shows syntax errors for invalid JSON."),
        ("HTML Formatter", "Beautify and indent HTML code.", "Paste HTML and click 'Format'. The tool parses tags and applies proper indentation. Self-closing tags are handled correctly."),
        ("CSS Formatter", "Format and beautify CSS code.", "Paste CSS and click 'Format' to beautify or 'Minify' to compress. Adds proper line breaks after properties and braces."),
        ("JavaScript Formatter", "Beautify and format JavaScript code.", "Paste JS code and click 'Format'. Adds indentation based on braces, brackets, semicolons, and commas."),
        ("SQL Formatter", "Format and beautify SQL queries.", "Paste a SQL query and click 'Format'. Keywords (SELECT, FROM, WHERE, etc.) are uppercased and placed on new lines."),
        ("XML Formatter", "Format and beautify XML documents.", "Paste XML and click 'Format'. Applies proper indentation based on nesting level."),
    ]),
    ("9. SEO Tools", [
        ("Meta Tags Generator", "Generate meta tags for better SEO.", "Fill in the title, description, keywords, and canonical URL. The tool generates standard meta tags and Open Graph tags in real-time."),
        ("Open Graph Generator", "Generate Open Graph tags for social sharing.", "Fill in title, description, URL, image URL, and site name. Copy the generated og: meta tags and paste them into your HTML head."),
        ("Twitter Card Generator", "Generate Twitter Card meta tags.", "Select card type (summary or summary_large_image), fill in the fields. Copy the generated twitter: meta tags for your site."),
    ]),
]

for cat_title, tools in categories:
    story.append(PageBreak())
    story.append(Paragraph(cat_title, styles["SectionTitle"]))
    story.append(Spacer(1, 6))

    for name, desc, howto in tools:
        story.append(Paragraph(name, styles["ToolName"]))
        story.append(Paragraph(desc, styles["ToolDesc"]))
        story.append(Paragraph("<b>How to use:</b> " + howto, styles["HowTo"]))

# ── Footer on last page ──
story.append(PageBreak())
story.append(Spacer(1, 100))
story.append(Paragraph("&lt;/&gt;", ParagraphStyle("EndIcon", parent=styles["Title"], fontSize=36, textColor=VIOLET, alignment=TA_CENTER, spaceAfter=10)))
story.append(Paragraph("DevTools Hub", ParagraphStyle("EndTitle", parent=styles["Title"], fontSize=24, textColor=DARK, alignment=TA_CENTER, spaceAfter=6)))
story.append(Paragraph("Built for developers. Free forever.", ParagraphStyle("EndSub", parent=styles["Normal"], fontSize=12, textColor=GRAY, alignment=TA_CENTER, spaceAfter=20)))
story.append(HRFlowable(width="30%", thickness=1, color=VIOLET, spaceAfter=20))
story.append(Paragraph("https://devtoolshub-pink.vercel.app", ParagraphStyle("EndURL", parent=styles["Normal"], fontSize=11, textColor=INDIGO, alignment=TA_CENTER)))

# Build
doc.build(story)
print(f"PDF generated: {output_path}")
