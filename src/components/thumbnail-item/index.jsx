import React from 'react'
import { Link } from 'gatsby'
import { TARGET_CLASS } from '../../utils/visible'

import './index.scss'

export const ThumbnailItem = ({ node }) => (
  <Link className={`thumbnail ${TARGET_CLASS}`} to={node.fields.slug}>
    <div key={node.fields.slug}>
      <h3 style={{ display: 'flow-root' }}>
        <span style={{ float: 'left' }}>
          {node.frontmatter.title || node.fields.slug}
        </span>
        <span style={{ float: 'right', color: '#b8c8db', fontSize: '19px' }}>{node.frontmatter.category}</span>
      </h3>
      <p>
        <time className="thumbnail-date">
          {node.frontmatter.date}
        </time>
      </p>
      <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
    </div>
  </Link >
)
