import React from 'react'
import PhoneInput from '../../../components/PhoneInput'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import useAccountDetail from './useAccountDetail'

const AccountDetail = () => {
  const { handleSubmit, send, isLoading, register, errors, control } =
    useAccountDetail()
  return (
    <div id="ltn_tab_1_4">
      <div className="ltn__myaccount-tab-content-inner">
        <p>
          The following addresses will be used on the checkout page by default.
        </p>
        <div className="ltn__form-box">
          <form onSubmit={handleSubmit(send)}>
            <div className="row mb-50">
              <div className="col-md-6">
                <label>Nombre:</label>
                <Input
                  register={register('first_name')}
                  type="text"
                  error={errors.first_name?.message}
                />
              </div>
              <div className="col-md-6">
                <label>Apellido:</label>
                <Input
                  register={register('last_name')}
                  type="text"
                  error={errors.last_name?.message}
                />
              </div>
              <div className="col-md-6">
                <label>Correo:</label>
                <Input
                  register={register('email')}
                  type="email"
                  error={errors.email?.message}
                />
              </div>
              <div className="col-md-6">
                <label>Dirección:</label>
                <Input
                  register={register('address')}
                  type="text"
                  error={errors.address?.message}
                />
              </div>
              <div className="col-md-6">
                <label>Teléfono:</label>
                <PhoneInput control={control} />
              </div>
            </div>
            <fieldset>
              <legend>Cambiar Contraseña</legend>
              <div className="row">
                <div className="col-md-12">
                  <label>
                    Contraseña actual (dejarla en blanco no generará cambios):
                  </label>
                  <Input
                    register={register('actualPassword')}
                    type="password"
                    error={errors.actualPassword?.message}
                  />
                  <label>
                    Nueva Contraseña (dejarla en blanco no generará cambios):
                  </label>
                  <Input
                    type="password"
                    register={register('password')}
                    error={errors.password?.message}
                  />
                  <label>Confirmar nueva contraseña:</label>
                  <Input
                    type="password"
                    register={register('confirmPassword')}
                    error={errors.confirmPassword?.message}
                  />
                </div>
              </div>
            </fieldset>
            <div className="btn-wrapper">
              <Button
                type="submit"
                className="btn theme-btn-1 btn-effect-1 text-uppercase"
                loading={isLoading}
              >
                Guardar Cambios
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AccountDetail
