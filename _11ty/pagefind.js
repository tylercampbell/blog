// https://pagefind.app/docs/node-api/
import * as pagefind from "pagefind";

// Pagefind returns errors in its responses instead of throwing them.
function check({ errors, ...response }) {
  if (errors.length) {
    throw new Error(`Pagefind: ${errors.join(", ")}`);
  }
  return response;
}

export default eleventyConfig => {
  eleventyConfig.on("eleventy.after", async ({ directories }) => {
    try {
      const { index } = check(await pagefind.createIndex());
      check(await index.addDirectory({ path: directories.output, glob: "**/*.html" }));
      check(await index.writeFiles({ outputPath: `${directories.output}pagefind` }));
    } finally {
      await pagefind.close();
    }
  });
};
