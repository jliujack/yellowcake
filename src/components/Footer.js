import React from 'react'
import './Footer.css'

export default () => (
  <div>
    {/* <h2 className="taCenter">
      Follow us{' '}
      <a>@legalandwise.com</a>
    </h2>
    <br /> */}
    <footer className="footer">
      <div className="container taCenter">
        <span>
          © {new Date().getFullYear()} Legal and Wise - All RIghts Reserved.
          {/* <a href="">jack</a>. */}
        </span>
      </div>
    </footer>
  </div>
)
