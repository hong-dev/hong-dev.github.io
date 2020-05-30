import React from 'react'
import { Link } from 'gatsby'
import { TARGET_CLASS } from '../../utils/visible'

import './index.scss'

export const ThumbnailItem = ({ node }) => (
  <Link className={`thumbnail ${TARGET_CLASS}`} to={node.fields.slug}>
    <div key={node.fields.slug}>
      <h3>
        <span>
          {node.frontmatter.title || node.fields.slug}
        </span>
      </h3>
      <p>
        <time className="thumbnail-date">
          <span style={{ color: '#b8c8db', fontSize: '16.5px', fontWeight: 'bold' }}>
            {node.frontmatter.category} | </span>
          {node.frontmatter.date}
        </time>
      </p>
      <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
    </div>
  </Link >
)
