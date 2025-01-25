import { InputPathToUrlTransformPlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import pluginNavigation from "@11ty/eleventy-navigation";

import pluginFilters from "./_11ty/filters.js";
import postcssFilter from "./_11ty/postcss.js";
import imageTransform from "./_11ty/image.js";
import pluginShortcodes from "./_11ty/shortcodes.js";
import pagefindPlugin from "./_11ty/pagefind.js";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
    // Copy the contents of the `public` folder to the output folder
    eleventyConfig
        .addPassthroughCopy({
            "./public/": "/"
        })
        .addPassthroughCopy("./content/feed/pretty-atom-feed.xsl");

    // Watch images for the image pipeline.
    eleventyConfig.addWatchTarget("content/**/*.{svg,webp,png,jpg,jpeg,gif}");

    // Per-page bundles, see https://github.com/11ty/eleventy-plugin-bundle
    // Adds the {% css %} paired shortcode
    eleventyConfig.addBundle("css", {
        toFileDirectory: "dist",
    });
    // Adds the {% js %} paired shortcode
    eleventyConfig.addBundle("js", {
        toFileDirectory: "dist",
    });

    // Official plugins
    eleventyConfig.addPlugin(pagefindPlugin);
    eleventyConfig.addPlugin(pluginNavigation);
    eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
    eleventyConfig.addPlugin(feedPlugin, {
        type: "atom", // or "rss", "json"
        outputPath: "/feed/feed.xml",
        stylesheet: "pretty-atom-feed.xsl",
        // templateData: {
        //     eleventyNavigation: {
        //         key: "RSS",
        //         order: 5
        //     }
        // },
        collection: {
            name: "posts",
            limit: 10,
        },
        metadata: {
            language: "en",
            title: "Wrestling Baby",
            subtitle: "A wrestling website for crybabies",
            base: "https://www.wrestling.baby/",
            author: {
                name: "Wrestling Baby"
            }
        }
    });

    // Add a collection for featProducts
    eleventyConfig.addCollection('aew', (collectionApi) => {
      const allData = collectionApi.getAll()[0].data.aew;
      return allData || [];
    });

    // Image optimization
    await imageTransform(eleventyConfig);

    // Filters
    eleventyConfig.addPlugin(pluginFilters);
    eleventyConfig.addPlugin(postcssFilter);
    eleventyConfig.addPlugin(pluginShortcodes);
    
    eleventyConfig.addShortcode("currentBuildDate", () => {
        return (new Date()).toISOString();
    });
};

export const config = {
    // Control which files Eleventy will process
    templateFormats: [
        "md",
        "njk",
        "html",
        "liquid",
        "11ty.js",
    ],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "njk",

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",

    // These are all optional:
    dir: {
        input: "content",          // default: "."
        includes: "../_includes",
        layouts: "../_layouts",  // default: "_includes" (`input` relative)
        data: "../_data",          // default: "_data" (`input` relative)
        output: "_site"
    },
};