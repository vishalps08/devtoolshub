import { notFound } from "next/navigation";
import { tools } from "@/lib/tools";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";

const toolComponents: Record<string, React.ComponentType> = {
  // Utilities
  "website-status-checker": dynamic(() => import("@/components/tools/WebsiteStatusChecker")),
  "user-agent-finder": dynamic(() => import("@/components/tools/UserAgentFinder")),
  "whats-my-ip": dynamic(() => import("@/components/tools/WhatsMyIp")),
  "ping": dynamic(() => import("@/components/tools/Ping")),
  "http-headers-parser": dynamic(() => import("@/components/tools/HttpHeadersParser")),
  "email-validator": dynamic(() => import("@/components/tools/EmailValidator")),
  "youtube-thumbnail-downloader": dynamic(() => import("@/components/tools/YoutubeThumbnailDownloader")),
  "redirect-checker": dynamic(() => import("@/components/tools/RedirectChecker")),
  "qr-code-generator": dynamic(() => import("@/components/tools/QrCodeGenerator")),

  // Encoders & Decoders
  "url-encoder": dynamic(() => import("@/components/tools/UrlEncoder")),
  "url-decoder": dynamic(() => import("@/components/tools/UrlDecoder")),
  "text-to-base64": dynamic(() => import("@/components/tools/Base64Encode")),
  "base64-to-text": dynamic(() => import("@/components/tools/Base64Decode")),
  "rot13-encoder": dynamic(() => import("@/components/tools/Rot13Encoder")),
  "rot13-decoder": dynamic(() => import("@/components/tools/Rot13Decoder")),
  "binary-to-text": dynamic(() => import("@/components/tools/BinaryToText")),
  "text-to-binary": dynamic(() => import("@/components/tools/TextToBinary")),
  "punycode-to-unicode": dynamic(() => import("@/components/tools/PunycodeToUnicode")),
  "unicode-to-punycode": dynamic(() => import("@/components/tools/UnicodeToPunycode")),

  // Converters
  "hex-to-rgb": dynamic(() => import("@/components/tools/HexToRgb")),
  "rgb-to-hex": dynamic(() => import("@/components/tools/RgbToHex")),
  "timestamp-converter": dynamic(() => import("@/components/tools/TimestampConverter")),
  "markdown-to-html": dynamic(() => import("@/components/tools/MarkdownToHtml")),
  "html-to-markdown": dynamic(() => import("@/components/tools/HtmlToMarkdown")),
  "csv-to-json": dynamic(() => import("@/components/tools/CsvToJson")),
  "json-to-csv": dynamic(() => import("@/components/tools/JsonToCsv")),
  "memory-storage-converter": dynamic(() => import("@/components/tools/MemoryStorageConverter")),

  // Image Tools
  "jpg-to-png": dynamic(() => import("@/components/tools/JpgToPng")),
  "jpg-to-webp": dynamic(() => import("@/components/tools/JpgToWebp")),
  "png-to-jpg": dynamic(() => import("@/components/tools/PngToJpg")),
  "png-to-webp": dynamic(() => import("@/components/tools/PngToWebp")),
  "webp-to-jpg": dynamic(() => import("@/components/tools/WebpToJpg")),
  "webp-to-png": dynamic(() => import("@/components/tools/WebpToPng")),
  "image-compressor": dynamic(() => import("@/components/tools/ImageCompressor")),
  "image-resizer": dynamic(() => import("@/components/tools/ImageResizer")),
  "image-to-base64": dynamic(() => import("@/components/tools/ImageToBase64")),

  // Generators
  "password-generator": dynamic(() => import("@/components/tools/PasswordGenerator")),
  "uuid-generator": dynamic(() => import("@/components/tools/UuidGenerator")),
  "random-number-generator": dynamic(() => import("@/components/tools/RandomNumberGenerator")),
  "lorem-ipsum-generator": dynamic(() => import("@/components/tools/LoremIpsumGenerator")),

  // Security & Encryption
  "bcrypt-generator": dynamic(() => import("@/components/tools/BcryptGenerator")),
  "md5-generator": dynamic(() => import("@/components/tools/Md5Generator")),
  "sha-generator": dynamic(() => import("@/components/tools/ShaGenerator")),
  "hash-generator": dynamic(() => import("@/components/tools/HashGenerator")),
  "password-strength-test": dynamic(() => import("@/components/tools/PasswordStrengthTest")),

  // Formatters & Beautifiers
  "json-formatter": dynamic(() => import("@/components/tools/JsonFormatter")),
  "html-formatter": dynamic(() => import("@/components/tools/HtmlFormatter")),
  "css-formatter": dynamic(() => import("@/components/tools/CssFormatter")),
  "javascript-formatter": dynamic(() => import("@/components/tools/JavascriptFormatter")),
  "sql-formatter": dynamic(() => import("@/components/tools/SqlFormatter")),
  "xml-formatter": dynamic(() => import("@/components/tools/XmlFormatter")),

  // SEO Tools
  "meta-tags-generator": dynamic(() => import("@/components/tools/MetaTagsGenerator")),
  "open-graph-generator": dynamic(() => import("@/components/tools/OpenGraphGenerator")),
  "twitter-card-generator": dynamic(() => import("@/components/tools/TwitterCardGenerator")),
};

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);

  if (!tool) return notFound();

  const ToolComponent = toolComponents[slug];

  if (ToolComponent) return <ToolComponent />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        All tools
      </Link>

      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{tool.name}</h1>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{tool.description}</p>

      <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-8 text-center dark:border-white/[0.06] dark:bg-white/[0.02]">
        <p className="text-zinc-400 dark:text-zinc-500">This tool requires a server-side API and is coming soon.</p>
      </div>
    </div>
  );
}
