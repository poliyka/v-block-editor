module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "prismjs",
      {
        languages: "all",
        plugins: [
          "line-highlight",
          "line-numbers",
          "show-invisibles",
          "show-language",
          "autolinker",
          "file-highlight",
          "inline-color",
          "previewers",
          "data-uri-highlight",
          "toolbar",
          "copy-to-clipboard",
          "diff-highlight",
          "treeview"
        ],
        theme: "tomorrow",
        css: true,
      },
    ],
  ],
};
