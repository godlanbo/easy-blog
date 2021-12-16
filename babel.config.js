module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'prismjs',
      {
        languages: [
          'html',
          'css',
          'javascript',
          'typescript',
          'http',
          'scss',
          'nginx',
          'sql',
          'markup',
          'json',
          'diff',
          'jsx',
          'bash'
        ],
        plugins: ['line-numbers', 'diff-highlight', 'autoloader'],
        theme: 'okaidia',
        css: true
      }
    ]
  ]
}
