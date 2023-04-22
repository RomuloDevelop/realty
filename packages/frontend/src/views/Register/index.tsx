import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Input from '../../components/Input'
import PhoneInput from '../../components/PhoneInput'
import ScreenLayout from '../../layouts/ScreenLayout'
import useRegister from './useRegister'

const Register = () => {
  const { isLoading, control, register, errors, handleSubmit, send } =
    useRegister()
  return (
    <ScreenLayout title="Sesión" subheader="Registro">
      <div className="ltn__login-area pb-110">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title-area text-center">
                <h1 className="section-title">Registra tu Cuenta</h1>
                <p>
                  Registra tus datos para poder generar citas <br />
                  con nuestros agentes.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="account-login-inner">
                <form
                  onSubmit={handleSubmit(send)}
                  className="ltn__form-box contact-form-box"
                >
                  <Input
                    type="text"
                    error={errors.firstName?.message}
                    register={register('firstName')}
                    placeholder="Nombre"
                  />
                  <Input
                    error={errors.lastName?.message}
                    register={register('lastName')}
                    type="text"
                    placeholder="Apellido"
                  />
                  <PhoneInput
                    control={control}
                    placeholder="Teléfono celular"
                  />
                  <Input
                    error={errors.email?.message}
                    register={register('email')}
                    type="text"
                    placeholder="Correo*"
                  />
                  <Input
                    error={errors.password?.message}
                    register={register('password')}
                    type="password"
                    placeholder="Contraseña*"
                  />
                  <Input
                    error={errors.confirmPassword?.message}
                    register={register('confirmPassword')}
                    type="password"
                    placeholder="Confirma Contraseña*"
                  />
                  <Input
                    error={errors.address?.message}
                    register={register('address')}
                    type="text"
                    placeholder="Dirección"
                  />
                  {/* <label className="checkbox-inline">
                    <input type="checkbox" defaultValue="" />
                    &nbsp; I consent to Herboil processing my personal data in
                    order to send personalized marketing material in accordance
                    with the consent form and the privacy policy.
                  </label>
                  <label className="checkbox-inline">
                    <input type="checkbox" defaultValue="" /> &nbsp; By clicking
                    "create account", I consent to the privacy policy.
                  </label> */}
                  <div className="btn-wrapper">
                    <Button
                      className="reverse-color"
                      type="submit"
                      loading={isLoading}
                    >
                      CREAR CUENTA
                    </Button>
                  </div>
                </form>
                <div className="by-agree text-center">
                  {/* <p>By creating an account, you agree to our:</p>
                  <p>
                    <a href="#">
                      TERMS OF CONDITIONS &nbsp; &nbsp; | &nbsp; &nbsp; PRIVACY
                      POLICY
                    </a>
                  </p> */}
                  <div className="go-to-btn mt-50 go-top">
                    <Link to="/login">YA TIENES UNA CUENTA ?</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScreenLayout>
  )
}

export default Register
