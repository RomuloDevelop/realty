import React from 'react'

let publicUrl = process.env.PUBLIC_URL + '/'

const ProfileDetail = () => {
  return (
    <div id="ltn_tab_1_2">
      <div className="ltn__myaccount-tab-content-inner">
        {/* comment-area */}
        <div className="ltn__comment-area mb-50">
          <div className="ltn-author-introducing clearfix">
            <div className="author-img">
              <img
                src={publicUrl + 'assets/img/blog/author.jpg'}
                alt="Author Image"
              />
            </div>
            <div className="author-info">
              <h6>Agent of Property</h6>
              <h2>Rosalina D. William</h2>
              <div className="footer-address">
                <ul>
                  <li>
                    <div className="footer-address-icon">
                      <i className="icon-placeholder" />
                    </div>
                    <div className="footer-address-info">
                      <p>Brooklyn, New York, United States</p>
                    </div>
                  </li>
                  <li>
                    <div className="footer-address-icon">
                      <i className="icon-call" />
                    </div>
                    <div className="footer-address-info">
                      <p>
                        <a href="tel:+0123-456789">+0123-456789</a>
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="footer-address-icon">
                      <i className="icon-mail" />
                    </div>
                    <div className="footer-address-info">
                      <p>
                        <a href="mailto:example@example.com">
                          example@example.com
                        </a>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="ltn__form-box contact-form-box box-shadow white-bg">
            <h4 className="title-2">Get A Quote</h4>
            <form id="contact-form" action="mail.php" method="post">
              <div className="row">
                <div className="col-md-6">
                  <div className="input-item input-item-name ltn__custom-icon">
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-item input-item-email ltn__custom-icon">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-item">
                    <select className="nice-select">
                      <option>Select Service Type</option>
                      <option>Property Management </option>
                      <option>Mortgage Service </option>
                      <option>Consulting Service</option>
                      <option>Home Buying</option>
                      <option>Home Selling</option>
                      <option>Escrow Services</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-item input-item-phone ltn__custom-icon">
                    <input
                      type="text"
                      name="phone"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </div>
              <div className="input-item input-item-textarea ltn__custom-icon">
                <textarea
                  name="message"
                  placeholder="Enter message"
                  defaultValue={''}
                />
              </div>
              <p>
                <label className="input-info-save mb-0">
                  <input type="checkbox" name="agree" /> Save my name, email,
                  and website in this browser for the next time I comment.
                </label>
              </p>
              <div className="btn-wrapper mt-0">
                <button
                  className="btn theme-btn-1 btn-effect-1 text-uppercase"
                  type="submit"
                >
                  get a free service
                </button>
              </div>
              <p className="form-messege mb-0 mt-20" />
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetail
