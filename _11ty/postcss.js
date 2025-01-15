import tailwind from "tailwindcss";
import postCss from "postcss";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {

  const postcssFilter = async (cssCode, done) => {
    const tailwindConfig = await import("../tailwind.config.js");
    postCss([
      tailwind(tailwindConfig.default),
      autoprefixer(),
      cssnano({ preset: 'default' })
    ])
      .process(cssCode, {
        from: "../_includes/tailwind.css",
      })
      .then(
        (r) => done(null, r.css),
        (e) => done(e, null)
      );
  };

  eleventyConfig.addWatchTarget("./_includes/tailwind.css");
  eleventyConfig.addNunjucksAsyncFilter("postcss", postcssFilter);
  eleventyConfig.setServerOptions({watch: ["./_site/style.css"]});
};