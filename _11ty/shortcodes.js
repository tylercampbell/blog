import Image from "@11ty/eleventy-img";

async function svgIcon(src, css) {
  let url = `./content/assets/ui/${src}`;
  let metadata = await Image(url, {
    formats: ['svg'],
    dryRun: true,
  })

  let str = metadata.svg[0].buffer.toString();
  let index = str.indexOf('>')
  if (index !== -1) {
    return str.slice(0, index) + ' class="' + css + '"' + str.slice(index);
  }

  return str
};

export default eleventyConfig => {
  eleventyConfig.addNunjucksAsyncShortcode("svg", svgIcon);
};