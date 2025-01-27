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
        htmlOptions: {
            imgAttributes: {
                // e.g. <img loading decoding> assigned on the HTML tag will override these values.
                loading: "lazy",
                decoding: "async",
            }
        },
        sharpOptions: {
            animated: true,
        },
    });
};