import React, { useState, useMemo } from 'react'
import ReactDOMServer from 'react-dom/server'
import Marked from 'react-markdown'
import PropTypes from 'prop-types'
import Image from './Image'

import './Content.css'

const encodeMarkdownURIs = (source = '') => {
  const markdownLinkRegex = /\[(.+)\]\((.+)(".+)\)/g
  console.log(source)
  return source.replace(markdownLinkRegex, (match, linkURI) => {
    if (!linkURI) return match
    const replaced = match.replace(linkURI, encodeURI(linkURI))
    return replaced
  })
}

const withContentImages = source => {
  const images = source.match(/<img(.*?)\\?>/gim)

  for (let i in images) {
    const src = /src="(.*?)"/g.exec(images[i]),
      alt = /alt="(.*?)"/g.exec(images[i]),
      title = /title="(.*?)"/g.exec(images[i])
    source = source.replace(
      images[i],
      ReactDOMServer.renderToStaticMarkup(
        <Image
          resolutions="medium"
          className="Content--Image"
          lazy={false}
          src={src ? src[1] : null}
          alt={alt ? alt[1] : null}
          title={title ? title[1] : null}
        />
      )
    )
  }

  return source
}

const MyImage = ({ nodeKey, src, title, alt }) => {
  const decodedSrc = decodeURI(src)
  return (
    <Image
      className="Content--Image markdown-preview"
      resolutions="medium"
      lazy={false}
      src={decodedSrc}
      title={title}
      alt={alt}
    />
  )
}

const HtmlBlock = ({ value }) => {
  if (value.indexOf('<iframe') !== 0) return value
  return (
    <div
      className={`Content--Iframe`}
      dangerouslySetInnerHTML={{
        __html: value
      }}
    />
  )
}

const Content = ({ source, src, className = '' }) => {
  const [isShowMore, setIsShowMore] = useState(false)
  console.log('liujie log:', 'source')
  // accepts either html or markdown
  source = source || src || ''
  let enableShowMore = false
  if (source.split('\n').length > 50000) {
    enableShowMore = true
  }

  const showMoreDom = useMemo(() => {
    if (!enableShowMore) {
      return null
    }

    const text = isShowMore ? 'showLess' : 'showMore'
    return (
      <a
        className="showMoreInContent"
        onClick={() => setIsShowMore(!isShowMore)}
      >
        {text}
      </a>
    )
  }, [isShowMore, enableShowMore])

  if (enableShowMore && !isShowMore) {
    source = source
      .split('\n')
      .slice(0, 49)
      .join('\n')
  }
  let outPut
  if (source.match(/^</)) {
    source = withContentImages(source)

    outPut = (
      <div
        className={`Content ${className}`}
        dangerouslySetInnerHTML={{ __html: source }}
      />
    )
  } else {
    outPut = (
      <Marked
        className={`Content ${className}`}
        source={encodeMarkdownURIs(source)}
        renderers={{
          image: MyImage,
          html: HtmlBlock
        }}
      />
    )
  }

  return (
    <>
      {outPut}
      {showMoreDom}
    </>
  )
}

Content.propTypes = {
  source: PropTypes.string,
  src: PropTypes.string,
  className: PropTypes.string
}

export default Content
