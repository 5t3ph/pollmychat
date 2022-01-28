module.exports = function (eleventyConfig) {
  eleventyConfig.addTemplateFormats("css");

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
