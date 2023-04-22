import React from 'react'
import { Controller } from 'react-hook-form'
import AutoComplete from '../../../components/Autocomplete'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import InputError from '../../../components/InputError'
import Map from '../../../components/Map'
import PriceInput from '../../../components/PriceInput'
import Select from '../../../components/Select'
import useCreateProperty from './useCreateProperty'

const CreateProperty = () => {
  const {
    handleSubmit,
    send,
    control,
    errors,
    isLoadingData,
    isLoadingCounties,
    isLoadingCities,
    isLoadingNeighborhoods,
    provinces,
    counties,
    cities,
    neighborhoods,
    searchCounties,
    searchCity,
    searchNeighborhood,
    categories,
    coordinates,
    types,
    register,
    province,
    county,
    city,
    getMapLocation,
    onLoadMap,
    isLoadingCreate,
  } = useCreateProperty()

  return (
    <div id="ltn_tab_1_7">
      <form
        onSubmit={handleSubmit(send)}
        className="ltn__myaccount-tab-content-inner"
      >
        <h6>Descripción de propiedad</h6>
        <div className="row">
          <div className="col-md-12">
            <Input
              register={register('title')}
              type="text"
              placeholder="Título"
              error={errors.title?.message}
              containerClass={'input-item input-item-textarea ltn__custom-icon'}
            />
            <Controller
              control={control}
              name="description"
              render={({ field, fieldState }) => (
                <div className="relative input-item input-item-textarea ltn__custom-icon">
                  <textarea
                    {...field}
                    className={fieldState.error ? 'error' : ''}
                    name="ltn__message"
                    placeholder="Description"
                    defaultValue={''}
                  />
                  {fieldState.error && (
                    <InputError error={fieldState.error?.message} />
                  )}
                </div>
              )}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h6>Precio</h6>
            <PriceInput control={control} prefix="$" placeholder="$(USD)" />
          </div>
          <div className="col-md-6">
            <h6>Categoría</h6>
            <Select
              control={control}
              name="category"
              defaultLabel="Selecciona categoría"
              loading={isLoadingData}
              options={
                categories
                  ? categories.map((item) => ({
                      name: item.description,
                      ...item,
                    }))
                  : []
              }
            />
          </div>
        </div>
        <h6>Archivos</h6>
        <Input
          register={register('files')}
          type="file"
          multiple={true}
          accept="image/*"
          inputClass="btn theme-btn-3 mb-10"
          error={errors.files?.message}
        />
        <br />
        <p>
          <small>* Al menos una foto es requerida.</small>
        </p>
        <h6>Dirección de propiedad</h6>
        <div className="row">
          <div className="col-md-6">
            <Input
              register={register('address')}
              type="text"
              placeholder="*Address"
              error={errors.address?.message}
              containerClass={'input-item input-item-textarea ltn__custom-icon'}
            />
          </div>
          <div className="col-md-6">
            <Select
              control={control}
              name="province"
              defaultLabel="Estado"
              loading={isLoadingData}
              options={
                provinces
                  ? provinces.map((item) => ({
                      id: item.abbreviation,
                      name: item.name,
                    }))
                  : []
              }
            />
          </div>
          <div className="col-md-6">
            <AutoComplete
              loading={isLoadingCounties}
              control={control}
              options={
                counties
                  ? counties.map((item) => ({
                      id: item.fipscode,
                      name: item.name,
                    }))
                  : []
              }
              onSearch={searchCounties}
              type="text"
              name="county"
              placeholder="Condado"
              disabled={!province}
              containerClassName="input-item input-item-textarea ltn__custom-icon"
            />
          </div>
          <div className="col-md-6">
            <AutoComplete
              loading={isLoadingCities}
              control={control}
              options={cities ? cities : []}
              onSearch={searchCity}
              type="text"
              name="city"
              placeholder="Ciudad"
              disabled={!county}
              containerClassName="input-item input-item-textarea ltn__custom-icon"
            />
          </div>
          <div className="col-md-6">
            <AutoComplete
              loading={isLoadingNeighborhoods}
              control={control}
              options={neighborhoods ? neighborhoods : []}
              onSearch={searchNeighborhood}
              type="text"
              name="neighborhood"
              placeholder="Vecindario"
              disabled={!city}
              containerClassName="input-item input-item-textarea ltn__custom-icon"
            />
          </div>
          <div className="col-md-6">
            <Input
              register={register('zipCode')}
              type="text"
              placeholder="Zip"
              error={errors.zipCode?.message}
              containerClass={'input-item input-item-textarea ltn__custom-icon'}
            />
          </div>

          <div className="col-lg-12">
            <div className="property-details-google-map mb-60">
              <Map onLoad={onLoadMap} />
            </div>
          </div>
          <div className="col-md-4 pb-5">
            <button
              type="button"
              className="btn theme-btn-1 btn-effect-1 btn-small text-uppercase"
              disabled={!coordinates}
              onClick={getMapLocation}
            >
              Buscar en mapa
            </button>
          </div>
          <div className="col-md-8">
            <Input
              register={register('coordinates')}
              type="text"
              placeholder="Coordinates"
              error={errors.coordinates?.message}
              containerClass={'input-item input-item-textarea ltn__custom-icon'}
            />
          </div>
        </div>
        <h6>Detalles de propiedad</h6>
        <div className="row">
          <div className="col-md-6">
            <Select
              control={control}
              name="type"
              defaultLabel="Tipo de propiedad"
              options={
                types
                  ? types.map((item) => ({
                      id: item.id,
                      name: item.description,
                    }))
                  : []
              }
            />
          </div>
          <div className="col-md-6">
            <div className="input-item input-item-textarea ltn__custom-icon">
              <Input
                register={register('area')}
                placeholder="Tamaño en m2 (*solo números)"
                type="text"
                error={errors.area?.message}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-item input-item-textarea ltn__custom-icon">
              <Input
                register={register('bedrooms')}
                placeholder="Cuartos (*solo números)"
                type="text"
                error={errors.bedrooms?.message}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-item input-item-textarea ltn__custom-icon">
              <Input
                register={register('baths')}
                placeholder="Baños (*solo números)"
                type="text"
                error={errors.baths?.message}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-item input-item-textarea ltn__custom-icon">
              <Input
                register={register('mis_number')}
                placeholder="MSI ID"
                type="text"
                error={errors.mis_number?.message}
              />
            </div>
          </div>
          <div className="col-md-6">
            <Select
              control={control}
              name="floors"
              defaultLabel="Pisos"
              options={[
                { id: 1, name: '1' },
                { id: 2, name: '2' },
                { id: 3, name: '3' },
                { id: 4, name: '4' },
                { id: 5, name: '5' },
              ]}
            />
          </div>
        </div>
        <div className="alert alert-warning d-none" role="alert">
          Please note that the date and time you requested may not be available.
          We will contact you to confirm your actual appointment details.
        </div>
        <div className="btn-wrapper text-center--- mt-30">
          <Button
            type="submit"
            className="btn theme-btn-1 btn-effect-1 text-uppercase"
            loading={isLoadingCreate}
          >
            Crear Propiedad
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateProperty
