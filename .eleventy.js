const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");

module.exports = function (eleventyConfig) {
  eleventyConfig.addTemplateFormats("css");

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: "poll",
    functionsDir: "./netlify/functions/",
    redirects: "netlify-toml-builders",
  });

  return {
    dir: {
      input: "src",
      output: "public",
      layouts: "_layout",
    },
  };
};
