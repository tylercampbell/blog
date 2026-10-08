import { DateTime } from "luxon";

export default function(eleventyConfig) {
  eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
    // If dateObj is a string, parse it into a Date object
    if (typeof dateObj === "string") {
      dateObj = new Date(dateObj);
    }

    // Ensure dateObj is a valid Date object
    if (!(dateObj instanceof Date) || isNaN(dateObj)) {
      return "Invalid Date";
    }

    // Format the date using Luxon
    return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "MMMM d, yyyy");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    // dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
  });

  eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
    return (tags || []).filter(tag => ["all", "post", "snapshot"].indexOf(tag) === -1);
  });

  eleventyConfig.addFilter("groupBy", function(collection, property) {
    return collection.reduce((acc, item) => {
      const key = item.data[property] || item[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});
  });

};
