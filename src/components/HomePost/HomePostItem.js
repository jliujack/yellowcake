import React from 'react'
import { Link } from 'gatsby'

import './index.css'

const PostItem = ({
  featuredImage,
  title,
  excerpt,
  slug,
  categories = [],
  className = '',
  date,
  ...props
}) => (
  <Link to={slug} className={`PostItem ${className}`}>
    <div className="PostItem--Date">{date.substr(0, 10)}</div>
    <h5 className="PostItem--Content">{title}</h5>
  </Link>
)

export default PostItem
