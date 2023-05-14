import React, { useEffect } from 'react'
import './InstagramFeed.scss'

const INSTAGRAM_ID = 'instagram-feed'

const InstagramFeed = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="section-title-area ltn__section-title-2--- text-center">
            <h1 className="section-title">Instagram Feed</h1>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 instagram-feed-container" id={INSTAGRAM_ID}>
          <iframe
            src="https://www.juicer.io/api/feeds/brunorgamarra/iframe"
            className="feed"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default InstagramFeed
