module.exports = function (eleventyConfig) {
  eleventyConfig.addTemplateFormats("css");

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  return {
    dir: {
      input: "src",
      output: "public",
      layouts: "_layout",
    },
  };
};
