import React from 'react'
import PriceInput from '../../../../components/PriceInput'
import Select from '../../../../components/Select'
import useCreateProperty from './useCreateProperty'

const CreateProperty = () => {
  const { handleSubmit, control } = useCreateProperty()

  return (
    <form onSubmit={handleSubmit} className="ltn__myaccount-tab-content-inner">
      <h6>Property Description</h6>
      <div className="row">
        <div className="col-md-12">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="ltn__name"
              placeholder="*Title (mandatory)"
            />
          </div>
          <div className="input-item input-item-textarea ltn__custom-icon">
            <textarea
              name="ltn__message"
              placeholder="Description"
              defaultValue={''}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h6>Precio</h6>
          <PriceInput control={control} prefix="$" placeholder="$(USD)" />
        </div>
        <div className="col-md-6">
          <h6>Category</h6>
          <Select
            control={control}
            name="category"
            defaultValue={0}
            options={[
              {
                value: 0,
                description: 'Selecciona categoría',
              },
              {
                value: 1,
                description: 'Descripción 1',
              },
              {
                value: 2,
                description: 'Descripción 2',
              },
            ]}
          />
          {/* <div className="input-item">
            <select className="nice-select" placeholder="Select category">
              <option>None</option>
              <option>Apartments</option>
              <option>Condos</option>
              <option>Duplexes</option>
              <option>Houses</option>
              <option>Industrial</option>
              <option>Land</option>
              <option>Offices</option>
              <option>Retail</option>
              <option>Villas</option>
            </select>
          </div> */}
        </div>
      </div>
      <h6>Listing Media</h6>
      <input
        type="file"
        id="myFile"
        name="filename"
        multiple={true}
        className="btn theme-btn-3 mb-10"
      />
      <br />
      <p>
        <small>* At least 1 image is required for a valid submission.</small>
      </p>
      <h6>Listing Location</h6>
      <div className="row">
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input type="text" name="ltn__name" placeholder="*Address" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input type="text" name="ltn__name" placeholder="Country" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input type="text" name="ltn__name" placeholder="County / State" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input type="text" name="ltn__name" placeholder="City" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input type="text" name="ltn__name" placeholder="Neighborhood" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input type="text" name="ltn__name" placeholder="Zip" />
          </div>
        </div>
        <div className="col-lg-12">
          <div className="property-details-google-map mb-60">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9334.271551495209!2d-73.97198251485975!3d40.668170674982946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25b0456b5a2e7%3A0x68bdf865dda0b669!2sBrooklyn%20Botanic%20Garden%20Shop!5e0!3m2!1sen!2sbd!4v1590597267201!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              frameBorder={0}
              allowFullScreen
              aria-hidden="false"
              tabIndex={0}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="ltn__name"
              placeholder="Latitude (for Google Maps)"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="ltn__name"
              placeholder="Longitude (for Google Maps)"
            />
          </div>
        </div>
      </div>
      <h6>Listing Details</h6>
      <div className="row">
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="ltn__name"
              placeholder="Size in ft2 (*only numbers)"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="ltn__name"
              placeholder="Bedrooms (*only numbers)"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="ltn__name"
              placeholder="Bathrooms (*only numbers)"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <input
              type="text"
              name="ltn__name"
              placeholder="Custom ID (*text)"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-item">
            <select className="nice-select">
              <option>Floors No</option>
              <option>Not Available</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="input-item input-item-textarea ltn__custom-icon">
            <textarea
              name="ltn__message"
              placeholder="Owner/Agent notes (*not visible on front end)"
              defaultValue={''}
            />
          </div>
        </div>
      </div>
      <div className="alert alert-warning d-none" role="alert">
        Please note that the date and time you requested may not be available.
        We will contact you to confirm your actual appointment details.
      </div>
      <div className="btn-wrapper text-center--- mt-30">
        <button
          className="btn theme-btn-1 btn-effect-1 text-uppercase"
          type="submit"
        >
          Submit Property
        </button>
      </div>
    </form>
  )
}

export default CreateProperty
