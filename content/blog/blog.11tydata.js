import slugify from "slugify";

export default {
  tags: [
    "post"
  ],
  "layout": "post.njk",
  eleventyComputed: {
    permalink: data => {
      return `/blog/${slugify(data.page.fileSlug, { lower: true })}/`;
    }
  }
};
