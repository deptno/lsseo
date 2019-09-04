import axios from 'axios'
import domino from 'domino'

const promises = process.argv.slice(2).map(
  async u => {
    try {
      const r = await axios.get(u)
      const d = await domino.createDocument(r.data)
      const title = d.querySelector('title')
      const description = d.querySelector('meta[name=description]')
      const keywords = d.querySelector('meta[name=keywords]')
      const ogUrl = d.querySelector('meta[property=og:url]')
      const image = d.querySelector('meta[property=og:image]')
      const canonicalUrl = d.querySelector('link[rel=canonical]')

      return {
        title       : title
          ? title.textContent
          : null,
        description : description
          ? description.getAttribute('content')
          : null,
        keywords    : keywords
          ? keywords.getAttribute('content')
          : null,
        requestUrl  : u,
        ogUrl       : ogUrl
          ? ogUrl.getAttribute('content')
          : null,
        canonicalUrl: canonicalUrl
          ? canonicalUrl.getAttribute('href')
          : null,
        image       : image
          ? image.getAttribute('content')
          : null,
      }
    } catch (e) {
      console.error(u)
      return {
        error: u,
      }
    }
  },
)

Promise
  .all(promises)
  .then(console.log)
