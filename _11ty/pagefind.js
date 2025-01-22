// https://rknight.me/using-pagefind-with-eleventy-for-search/
import { execSync } from 'child_process'

export default eleventyConfig => {
  eleventyConfig.on('eleventy.after', () => {
    execSync(`npx pagefind --site _site --glob \"**/*.html\"`, { encoding: 'utf-8' })
  })
}