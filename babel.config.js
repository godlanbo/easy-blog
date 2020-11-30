module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      "prismjs",
      {
        "languages": ["html", "css", "javascript", "typescript", "http", "scss", "nginx", "sql", "markup"],
        "theme": "okaidia",
        "css": true
      }
    ]
  ]
}
