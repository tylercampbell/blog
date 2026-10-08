import path from "node:path";

// Lets a post keep its images next to it (e.g. `snapshots/2026-10-04-aew-collision/index.md`
// with `a.jpg` beside it) and reference them by relative path. Relative paths are rewritten
// to input-rooted ones (`/snapshots/2026-10-04-aew-collision/a.jpg`) so they still resolve
// when the post is rendered inside the home page, timeline, and tag pages.

const INPUT_DIR = "content";

function isRelative(src) {
  return src && !/^(\/|[a-z][a-z0-9+.-]*:|#)/i.test(src);
}

export function resolveImageSrc(src, inputPath) {
  if (!isRelative(src)) {
    return src;
  }
  const file = path.join(path.dirname(inputPath), src);
  return "/" + path.relative(INPUT_DIR, file).split(path.sep).join("/");
}

// For the `images` front matter on snapshots
export function resolveImages(data) {
  return (data.images || []).map(image => ({
    ...image,
    src: resolveImageSrc(image.src, data.page.inputPath),
  }));
}

export default function(eleventyConfig) {
  // For <img src> and ![alt](src) in post bodies
  eleventyConfig.addPreprocessor("relative-images", "md", (data, content) => {
    return content
      .replace(/(<img\b[^>]*?\ssrc=)(["'])(.*?)\2/gi,
        (match, before, quote, src) => `${before}${quote}${resolveImageSrc(src, data.page.inputPath)}${quote}`)
      // Markdown links can't contain spaces, so URL-encode (eleventy-img decodes it again)
      .replace(/(!\[[^\]]*\]\()([^)\s]+)/g,
        (match, before, src) => `${before}${encodeURI(resolveImageSrc(decodeURI(src), data.page.inputPath))}`);
  });
}
