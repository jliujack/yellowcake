import React from 'react'
import { Link } from 'gatsby'

import PostItem from './HomePostItem'

export default ({ posts }) => {
  let filteredPosts = posts
  if (posts.length > 3) {
    filteredPosts = posts.slice(0, 3)
  }

  return (
    <>
      <div className="container Home-post-title">LEGAL UPDATE</div>
      <div className="container Home-Post">
        {posts.map((post, index) => (
          <PostItem key={post.title + index} {...post} />
        ))}
        <Link to="blog/" className="PostItem-all">
          VIEW ALL
        </Link>
      </div>
    </>
  )
}
