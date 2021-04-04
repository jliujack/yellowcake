import React, { Fragment, useRef, useEffect } from 'react'
import _get from 'lodash/get'
import { Link, graphql } from 'gatsby'
import { ChevronLeft } from 'react-feather'
import Valine from 'gatsby-plugin-valine'

import Content from '../components/Content'
import Layout from '../components/Layout'
import './SinglePost.css'

const langMode = {
  nick: 'Name',
  mail: 'Mail',
  link: 'Website(http://)',
  nickFail: 'Name cannot be less than 3 bytes.',
  mailFail: 'Please confirm your email address.',
  sofa: 'No comment yet.',
  submit: 'Submit',
  reply: 'Reply',
  cancelReply: 'Cancel reply',
  comments: 'Comments',
  cancel: 'Cancel',
  confirm: 'Confirm',
  continue: 'Continue',
  more: 'Load More...',
  preview: 'Preview',
  emoji: 'Emoji',
  expand: 'See more....',
  seconds: 'seconds ago',
  minutes: 'minutes ago',
  hours: 'hours ago',
  days: 'days ago',
  now: 'just now',
  uploading: 'Uploading ...',
  uploadDone: 'Upload completed!',
  busy: 'Submit is busy, please wait...',
  'code-98':
    'Valine initialization failed, please check your version of av-min.js.',
  'code-99':
    'Valine initialization failed, Please check the `el` element in the init method.',
  'code-100':
    'Valine initialization failed, Please check your appId and appKey.',
  'code-140':
    'The total number of API calls today has exceeded the development version limit.',
  'code-401': 'Unauthorized operation, Please check your appId and appKey.',
  'code-403':
    'Access denied by API domain white list, Please check your security domain.'
}

export const SinglePostTemplate = ({
  title,
  date,
  body,
  slug,
  nextPostURL,
  prevPostURL,
  categories = []
}) => {
  const valineRef = useRef()

  useEffect(() => {
    if (valineRef.current) {
      const v = document.querySelector('.SinglePost--Valine')
      let timer
      const setName = () => {
        const nick = v.querySelector('.vnick')
        const mail = v.querySelector('.vmail')
        if (nick) {
          nick.setAttribute('placeholder', 'Name')
          mail.setAttribute('placeholder', 'Email')
        } else {
          timer = setTimeout(setName, 300)
        }
      }
      if (v) {
        timer = setTimeout(setName, 300)
      }
    }
  }, [valineRef.current])

  return (
    <main>
      <article
        className="SinglePost section light"
        itemScope
        itemType="http://schema.org/BlogPosting"
      >
        <div className="container skinny">
          <Link className="SinglePost--BackButton" to="/blog/">
            <ChevronLeft /> BACK
          </Link>
          <div className="SinglePost--Content relative">
            <div className="SinglePost--Meta">
              {date && (
                <time
                  className="SinglePost--Meta--Date"
                  itemProp="dateCreated pubdate datePublished"
                  date={date}
                >
                  {date}
                </time>
              )}
              {categories && (
                <Fragment>
                  <span>|</span>
                  {categories.map((cat, index) => (
                    <span
                      key={cat.category}
                      className="SinglePost--Meta--Category"
                    >
                      {cat.category}
                      {/* Add a comma on all but last category */}
                      {index !== categories.length - 1 ? ',' : ''}
                    </span>
                  ))}
                </Fragment>
              )}
            </div>

            {title && (
              <h1 className="SinglePost--Title" itemProp="title">
                {title}
              </h1>
            )}

            <div className="SinglePost--InnerContent">
              <Content source={body} />
            </div>

            <Valine
              path={slug}
              className="SinglePost--Valine"
              placeholder="Feel free to leave a comment."
              lang="en"
              langMode={langMode}
              ref={valineRef}
            />

            <div className="SinglePost--Pagination">
              {prevPostURL && (
                <Link
                  className="SinglePost--Pagination--Link prev"
                  to={prevPostURL}
                >
                  Previous Post
                </Link>
              )}
              {nextPostURL && (
                <Link
                  className="SinglePost--Pagination--Link next"
                  to={nextPostURL}
                >
                  Next Post
                </Link>
              )}
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}

// Export Default SinglePost for front-end
const SinglePost = ({ data: { post, allPosts } }) => {
  const thisEdge = allPosts.edges.find(edge => edge.node.id === post.id)
  return (
    <Layout
      meta={post.frontmatter.meta || false}
      title={post.frontmatter.title || false}
    >
      <SinglePostTemplate
        {...post}
        {...post.frontmatter}
        {...post.fields}
        body={post.html}
        nextPostURL={_get(thisEdge, 'next.fields.slug')}
        prevPostURL={_get(thisEdge, 'previous.fields.slug')}
      />
    </Layout>
  )
}

export default SinglePost

export const pageQuery = graphql`
  ## Query for SinglePost data
  ## Use GraphiQL interface (http://localhost:8000/___graphql)
  ## $id is processed via gatsby-node.js
  ## query name must be unique to this file
  query SinglePost($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      id
      fields {
        slug
      }
      frontmatter {
        title
        template
        subtitle
        date(formatString: "MMMM Do, YYYY")
        categories {
          category
        }
      }
    }

    allPosts: allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
        }
        next {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
        previous {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
