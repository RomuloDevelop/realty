import React from 'react'

const AccountDetail = () => {
  return (
    <div id="ltn_tab_1_4">
      <div className="ltn__myaccount-tab-content-inner">
        <p>
          The following addresses will be used on the checkout page by default.
        </p>
        <div className="ltn__form-box">
          <form action="#">
            <div className="row mb-50">
              <div className="col-md-6">
                <label>First name:</label>
                <input type="text" name="ltn__name" />
              </div>
              <div className="col-md-6">
                <label>Last name:</label>
                <input type="text" name="ltn__lastname" />
              </div>
              <div className="col-md-6">
                <label>Display Name:</label>
                <input type="text" name="ltn__lastname" placeholder="Ethan" />
              </div>
              <div className="col-md-6">
                <label>Display Email:</label>
                <input
                  type="email"
                  name="ltn__lastname"
                  placeholder="example@example.com"
                />
              </div>
            </div>
            <fieldset>
              <legend>Password change</legend>
              <div className="row">
                <div className="col-md-12">
                  <label>
                    Current password (leave blank to leave unchanged):
                  </label>
                  <input type="password" name="ltn__name" />
                  <label>New password (leave blank to leave unchanged):</label>
                  <input type="password" name="ltn__lastname" />
                  <label>Confirm new password:</label>
                  <input type="password" name="ltn__lastname" />
                </div>
              </div>
            </fieldset>
            <div className="btn-wrapper">
              <button
                type="submit"
                className="btn theme-btn-1 btn-effect-1 text-uppercase"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AccountDetail
