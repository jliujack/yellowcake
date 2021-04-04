import React from 'react'
import NavLink from './NavLink'
import { Link } from 'gatsby'
import './HomeFooter.css'

export default () => (
  <div>
    {/* <h2 className="taCenter">
      Follow us{' '}
      <a>@legalandwise.com</a>
    </h2>
    <br /> */}
    <footer className="home-footer">
      <div className="container taCenter">
        <div className="home-flex-container">
          <div className="home-footer-item">
            <div className="home-footer-item-title">Service</div>
            <div className="home-footer-item-content">
              <Link className="home-footer-href" to="/service/">
                Company Establishment
              </Link>
              <Link className="home-footer-href" to="/service/">
                Foreign Direct Investment
              </Link>
              <Link className="home-footer-href" to="/service/">
                Contract Management
              </Link>
              <Link className="home-footer-href" to="/service/">
                Daily Corporate Operation
              </Link>
              <Link className="home-footer-href" to="/service/">
                Labor and Employment
              </Link>
              <Link className="home-footer-href" to="/service/">
                Intellectual Property
              </Link>
              <Link className="home-footer-href" to="/service/">
                Disputes Resolution
              </Link>
              <Link className="home-footer-href" to="/service/">
                Merger and Acquisition
              </Link>
            </div>
          </div>
          <div className="home-footer-item">
            <div className="home-footer-item-title">Quicklinks</div>
            <div className="home-footer-item-content">
              <Link className="home-footer-href" to="/">
                Home
              </Link>
              <Link className="home-footer-href" to="/blog/">
                Publication
              </Link>
              <Link className="home-footer-href" to="/about-us/">
                Practice Area
              </Link>
              <Link className="home-footer-href" to="/about-us/">
                Founder Team
              </Link>
              <Link className="home-footer-href" to="/about-us/">
                Key Features
              </Link>
              <Link className="home-footer-href" to="/about-us/">
                Our Location
              </Link>
            </div>
          </div>
          <div className="home-footer-item">
            <div className="home-footer-item-title">
              Related Institutions' Links
            </div>
            <div className="home-footer-item-content">
              <a
                className="home-footer-href"
                target="_blank"
                href="http://www.scia.com.cn/en"
              >
                Shenzhen Court of International Arbitration
              </a>
              <a
                className="home-footer-href"
                target="_blank"
                href="http://www.cietac.org.cn/?l=en"
              >
                China International Economic and Trade Arbitration Commission{' '}
              </a>
              <a
                className="home-footer-href"
                target="_blank"
                href="http://english.court.gov.cn/"
              >
                The Supreme People's Court of the People's Republic of China{' '}
              </a>
            </div>
          </div>
          <div className="home-footer-item">
            <div className="home-footer-item-title">Contact</div>
            <div className="home-footer-item-content">
              <a
                className="home-footer-href"
                href="mailto:administrator@legalandwise.com"
              >
                administrator@legalandwise.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
)
