import slugify from "slugify";

export default {
    tags: [
    "snapshot"
  ],
  eleventyComputed: {
    permalink: data => {
      const date = new Date(data.page.date).toISOString().split('T')[0];
      return `/snapshots/${date}/${slugify(data.page.fileSlug, { lower: true })}/`;
    }
  }
};
