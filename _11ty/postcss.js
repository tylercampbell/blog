import tailwind from "tailwindcss";
import postCss from "postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {

  // Every page's layout calls this filter with the same CSS, so compile it once per build.
  // The cache is cleared before each build so `npm run dev` picks up template changes.
  let compiled;
  eleventyConfig.on("eleventy.before", () => {
    compiled = undefined;
  });

  const compile = async (cssCode) => {
    const tailwindConfig = await import("../tailwind.config.js");
    const result = await postCss([
      tailwind(tailwindConfig.default),
      autoprefixer(),
      cssnano({ preset: 'default' })
    ]).process(cssCode, {
      from: "../_includes/tailwind.css",
    });
    return result.css;
  };

  const postcssFilter = (cssCode, done) => {
    compiled ??= compile(cssCode);
    compiled.then(
      (css) => done(null, css),
      (e) => done(e, null)
    );
  };

  eleventyConfig.addWatchTarget("./_includes/tailwind.css");
  eleventyConfig.addNunjucksAsyncFilter("postcss", postcssFilter);
  eleventyConfig.setServerOptions({watch: ["./_site/style.css"]});
};