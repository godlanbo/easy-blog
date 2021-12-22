import markdownIt from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'

const md = new markdownIt({
  langPrefix: 'language-',
  highlight: (str, lang) => {
    const isDiffBlock = /\n(\+|-)\s/.test(str)
    let res =
      `<pre class="language-${lang} extra-class">` +
      `<pre class="language-${
        isDiffBlock ? 'diff-' : ''
      }${lang} diff-highlight line-numbers">` +
      `<code>${str.replace(/</g, '&lt;')}</code>` +
      `</pre>` +
      `</pre>`
    return res
  }
})

// 配置markdown-it插件
md.use(markdownItAnchor, {
  permalink: true,
  permalinkBefore: true,
  permalinkClass: 'anchor',
  permalinkSymbol: '<div class="octicon-link octicon"></div>',
  permalinkAttrs: slug => {
    return { id: slug }
  },
  slugify: s => {
    return String(s)
      .trim()
      .toLowerCase()
  }
})

export default md
