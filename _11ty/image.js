import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function(eleventyConfig) {
    // Image optimization: https://www.11ty.dev/docs/plugins/image/#eleventy-transform
    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        // Output formats for each image.
        formats: ["svg", "avif", "webp", "auto"],
        widths: ["480","640","1280"],
        failOnError: false,
        urlPath: "/img/",
        // e.g. <img loading decoding> assigned on the HTML tag will override these values.
        defaultAttributes: {
            loading: "lazy",
            decoding: "async",
        },
        // Don't use `htmlOptions.imgAttributes`: eleventy-img writes each image's `src` into that
        // shared object, which changes its in-memory cache key and re-encodes the same image on
        // every page it appears on. The empty object also replaces the plugin's shared default.
        htmlOptions: {},
        sharpOptions: {
            animated: true,
        },
    });
};