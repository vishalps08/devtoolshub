export type Category =
  | "Utilities"
  | "Encoders & Decoders"
  | "Converters"
  | "Image Tools"
  | "Generators"
  | "Security & Encryption"
  | "Formatters & Beautifiers"
  | "SEO Tools";

export interface Tool {
  name: string;
  slug: string;
  description: string;
  category: Category;
  icon: string;
}

export const tools: Tool[] = [
  // ── Utilities ──
  { name: "Website Status Checker", slug: "website-status-checker", description: "Check whether a website is online or not.", category: "Utilities", icon: "Globe" },
  { name: "User Agent Finder", slug: "user-agent-finder", description: "Find out your browser's user agent string.", category: "Utilities", icon: "Monitor" },
  { name: "What's My IP", slug: "whats-my-ip", description: "Find out your public IP address.", category: "Utilities", icon: "Wifi" },
  { name: "Ping", slug: "ping", description: "Measure ping latency for any address.", category: "Utilities", icon: "Activity" },
  { name: "URL Unshortener", slug: "url-unshortener", description: "Unshorten a URL and find the original.", category: "Utilities", icon: "ExternalLink" },
  { name: "SSL Checker", slug: "ssl-checker", description: "Verify SSL certificate of any website.", category: "Utilities", icon: "ShieldCheck" },
  { name: "HTTP Headers Parser", slug: "http-headers-parser", description: "Parse and inspect HTTP headers of any URL.", category: "Utilities", icon: "FileText" },
  { name: "QR Code Reader", slug: "qr-code-reader", description: "Read and decode QR codes from images.", category: "Utilities", icon: "ScanLine" },
  { name: "Email Validator", slug: "email-validator", description: "Check if an email address is valid.", category: "Utilities", icon: "Mail" },
  { name: "YouTube Thumbnail Downloader", slug: "youtube-thumbnail-downloader", description: "Download thumbnails from any YouTube video.", category: "Utilities", icon: "Youtube" },
  { name: "Redirect Checker", slug: "redirect-checker", description: "Trace URL redirects and hops.", category: "Utilities", icon: "CornerUpRight" },

  // ── Encoders & Decoders ──
  { name: "URL Encoder", slug: "url-encoder", description: "Encode your URL to make it transmission-safe.", category: "Encoders & Decoders", icon: "Link" },
  { name: "URL Decoder", slug: "url-decoder", description: "Decode any URL that has been encoded.", category: "Encoders & Decoders", icon: "Unlink" },
  { name: "Base64 Encode", slug: "text-to-base64", description: "Encode text to Base64 format.", category: "Encoders & Decoders", icon: "Code" },
  { name: "Base64 Decode", slug: "base64-to-text", description: "Decode Base64 back to plain text.", category: "Encoders & Decoders", icon: "FileCode" },
  { name: "ROT13 Encoder", slug: "rot13-encoder", description: "Encode text using the ROT13 cipher.", category: "Encoders & Decoders", icon: "RotateCw" },
  { name: "ROT13 Decoder", slug: "rot13-decoder", description: "Decode ROT13-encoded text.", category: "Encoders & Decoders", icon: "RotateCcw" },
  { name: "Binary to Text", slug: "binary-to-text", description: "Convert binary code to readable text.", category: "Encoders & Decoders", icon: "Binary" },
  { name: "Text to Binary", slug: "text-to-binary", description: "Convert text to binary representation.", category: "Encoders & Decoders", icon: "Binary" },
  { name: "Punycode to Unicode", slug: "punycode-to-unicode", description: "Convert Punycode to Unicode characters.", category: "Encoders & Decoders", icon: "Languages" },
  { name: "Unicode to Punycode", slug: "unicode-to-punycode", description: "Convert Unicode to Punycode encoding.", category: "Encoders & Decoders", icon: "Languages" },

  // ── Converters ──
  { name: "Hex to RGB", slug: "hex-to-rgb", description: "Convert hex color codes to RGB values.", category: "Converters", icon: "Palette" },
  { name: "RGB to Hex", slug: "rgb-to-hex", description: "Convert RGB values to hex color codes.", category: "Converters", icon: "Palette" },
  { name: "Timestamp Converter", slug: "timestamp-converter", description: "Convert between Unix timestamps and dates.", category: "Converters", icon: "Clock" },
  { name: "Markdown to HTML", slug: "markdown-to-html", description: "Convert Markdown text to HTML.", category: "Converters", icon: "FileType" },
  { name: "HTML to Markdown", slug: "html-to-markdown", description: "Convert HTML back to Markdown.", category: "Converters", icon: "FileType" },
  { name: "CSV to JSON", slug: "csv-to-json", description: "Convert CSV data to JSON format.", category: "Converters", icon: "Table" },
  { name: "JSON to CSV", slug: "json-to-csv", description: "Convert JSON data to CSV format.", category: "Converters", icon: "Table" },
  { name: "Memory Storage Converter", slug: "memory-storage-converter", description: "Convert between bytes, KB, MB, GB, and TB.", category: "Converters", icon: "HardDrive" },

  // ── Image Tools ──
  { name: "JPG to PNG", slug: "jpg-to-png", description: "Convert JPG images to PNG format.", category: "Image Tools", icon: "Image" },
  { name: "JPG to WebP", slug: "jpg-to-webp", description: "Convert JPG images to WebP format.", category: "Image Tools", icon: "Image" },
  { name: "PNG to JPG", slug: "png-to-jpg", description: "Convert PNG images to JPG format.", category: "Image Tools", icon: "Image" },
  { name: "PNG to WebP", slug: "png-to-webp", description: "Convert PNG images to WebP format.", category: "Image Tools", icon: "Image" },
  { name: "WebP to JPG", slug: "webp-to-jpg", description: "Convert WebP images to JPG format.", category: "Image Tools", icon: "Image" },
  { name: "WebP to PNG", slug: "webp-to-png", description: "Convert WebP images to PNG format.", category: "Image Tools", icon: "Image" },
  { name: "Image Compressor", slug: "image-compressor", description: "Compress images without losing quality.", category: "Image Tools", icon: "Minimize2" },
  { name: "Image Resizer", slug: "image-resizer", description: "Resize images to any dimension.", category: "Image Tools", icon: "Maximize2" },
  { name: "Image to Base64", slug: "image-to-base64", description: "Convert images to Base64 encoded strings.", category: "Image Tools", icon: "FileImage" },

  // ── Generators ──
  { name: "Password Generator", slug: "password-generator", description: "Generate strong, random passwords.", category: "Generators", icon: "KeyRound" },
  { name: "UUID Generator", slug: "uuid-generator", description: "Generate random UUIDv4 identifiers.", category: "Generators", icon: "Fingerprint" },
  { name: "QR Code Generator", slug: "qr-code-generator", description: "Generate QR codes from any text or URL.", category: "Generators", icon: "QrCode" },
  { name: "Lorem Ipsum Generator", slug: "lorem-ipsum-generator", description: "Generate placeholder text for designs.", category: "Generators", icon: "AlignLeft" },
  { name: "Random Number Generator", slug: "random-number-generator", description: "Generate random numbers in any range.", category: "Generators", icon: "Dices" },

  // ── Security & Encryption ──
  { name: "Bcrypt Generator", slug: "bcrypt-generator", description: "Hash passwords using the Bcrypt algorithm.", category: "Security & Encryption", icon: "Lock" },
  { name: "MD5 Generator", slug: "md5-generator", description: "Generate MD5 hashes from any text.", category: "Security & Encryption", icon: "Hash" },
  { name: "SHA Generator", slug: "sha-generator", description: "Generate SHA-1, SHA-256, and SHA-512 hashes.", category: "Security & Encryption", icon: "Hash" },
  { name: "Hash Generator", slug: "hash-generator", description: "Generate various hash digests from text.", category: "Security & Encryption", icon: "ShieldAlert" },
  { name: "Password Strength Test", slug: "password-strength-test", description: "Test how strong your password is.", category: "Security & Encryption", icon: "ShieldCheck" },

  // ── Formatters & Beautifiers ──
  { name: "JSON Formatter", slug: "json-formatter", description: "Format and beautify JSON data.", category: "Formatters & Beautifiers", icon: "Braces" },
  { name: "HTML Formatter", slug: "html-formatter", description: "Beautify and indent HTML code.", category: "Formatters & Beautifiers", icon: "Code" },
  { name: "CSS Formatter", slug: "css-formatter", description: "Format and beautify CSS code.", category: "Formatters & Beautifiers", icon: "Paintbrush" },
  { name: "JavaScript Formatter", slug: "javascript-formatter", description: "Beautify and format JavaScript code.", category: "Formatters & Beautifiers", icon: "FileCode" },
  { name: "SQL Formatter", slug: "sql-formatter", description: "Format and beautify SQL queries.", category: "Formatters & Beautifiers", icon: "Database" },
  { name: "XML Formatter", slug: "xml-formatter", description: "Format and beautify XML documents.", category: "Formatters & Beautifiers", icon: "FileCode" },

  // ── SEO Tools ──
  { name: "Meta Tags Generator", slug: "meta-tags-generator", description: "Generate meta tags for better SEO.", category: "SEO Tools", icon: "Search" },
  { name: "Open Graph Generator", slug: "open-graph-generator", description: "Generate Open Graph tags for social sharing.", category: "SEO Tools", icon: "Share2" },
  { name: "Twitter Card Generator", slug: "twitter-card-generator", description: "Generate Twitter Card meta tags.", category: "SEO Tools", icon: "Twitter" },
];

export interface CategoryInfo {
  name: Category;
  slug: string;
  icon: string;
  color: string;
  description: string;
}

export const categories: CategoryInfo[] = [
  { name: "Utilities", slug: "utilities", icon: "Flame", color: "from-orange-500 to-red-500", description: "Essential everyday tools — check website status, find your IP, inspect SSL certificates, and more." },
  { name: "Encoders & Decoders", slug: "encoders-decoders", icon: "Code", color: "from-violet-500 to-purple-600", description: "Encode and decode URLs, Base64, binary, ROT13, Punycode, and other formats instantly." },
  { name: "Converters", slug: "converters", icon: "ArrowLeftRight", color: "from-blue-500 to-cyan-500", description: "Convert between colors, timestamps, markup languages, data formats, and storage units." },
  { name: "Image Tools", slug: "image-tools", icon: "Image", color: "from-pink-500 to-rose-500", description: "Convert, compress, and resize images between JPG, PNG, and WebP — all client-side." },
  { name: "Generators", slug: "generators", icon: "Sparkles", color: "from-emerald-500 to-green-500", description: "Generate passwords, UUIDs, QR codes, lorem ipsum, and random numbers on the fly." },
  { name: "Security & Encryption", slug: "security-encryption", icon: "Lock", color: "from-yellow-500 to-amber-500", description: "Hash passwords with Bcrypt, generate MD5/SHA digests, and test password strength." },
  { name: "Formatters & Beautifiers", slug: "formatters-beautifiers", icon: "Braces", color: "from-indigo-500 to-blue-500", description: "Format and beautify JSON, HTML, CSS, JavaScript, SQL, and XML in one click." },
  { name: "SEO Tools", slug: "seo-tools", icon: "Search", color: "from-teal-500 to-cyan-500", description: "Generate meta tags, Open Graph tags, and Twitter Cards for better search and social reach." },
];

export function getToolsByCategory(category: Category): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return categories.find((c) => c.slug === slug);
}
