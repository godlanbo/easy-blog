module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      "prismjs",
      {
        "languages": ["html", "css", "javascript", "typescript", "http", "scss", "nginx", "sql"],
        "theme": "okaidia",
        "css": true
      }
    ]
  ]
}
