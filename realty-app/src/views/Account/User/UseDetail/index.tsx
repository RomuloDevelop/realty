import React from 'react'
import PhoneInput from '../../../../components/PhoneInput'
import Input from '../../../../components/Input'
import useUserDetail from './useUserDetail'
import Button from '../../../../components/Button'
import { Link } from 'react-router-dom'

const UserDetail = () => {
  const {
    handleSubmit,
    send,
    data,
    errors,
    register,
    control,
    isLoadingRequest,
  } = useUserDetail()

  return (
    <div id="ltn_tab_1_2">
      <div className="ltn__myaccount-tab-content-inner">
        {/* comment-area */}
        <div className="ltn__comment-area mb-50">
          <div className="mb-20">
            <Link to="../users">
              <i className="fas fa-chevron-left"></i>
              <span style={{ display: 'inline-block', marginLeft: '0.2rem' }}>
                Atrás
              </span>
            </Link>
          </div>
          <div className="ltn-author-introducing clearfix">
            {/* <div className="author-img">
              <img
                src={publicUrl + 'assets/img/blog/author.jpg'}
                alt="Author Image"
              />
            </div> */}
            <div className="author-info">
              <h6>{data?.role}</h6>
              <h2>
                {data?.first_name +
                  ' ' +
                  (data?.last_name ? data?.last_name : '')}
              </h2>
              <div className="footer-address">
                <ul>
                  <li>
                    <div className="footer-address-icon">
                      <i className="icon-placeholder" />
                    </div>
                    <div className="footer-address-info">
                      <p>{data?.address}</p>
                    </div>
                  </li>
                  <li>
                    <div className="footer-address-icon">
                      <i className="icon-call" />
                    </div>
                    <div className="footer-address-info">
                      <p>
                        <a href={`tel:${data?.phone}`}>{data?.phone}</a>
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="footer-address-icon">
                      <i className="icon-mail" />
                    </div>
                    <div className="footer-address-info">
                      <p>
                        <a href={`mailto:${data?.email}`}>{data?.email}</a>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="ltn__form-box contact-form-box box-shadow white-bg">
            <h4 className="title-2">Editar datos</h4>
            <form
              onSubmit={handleSubmit(send)}
              id="contact-form"
              action="mail.php"
              method="post"
            >
              <div className="row">
                <div className="col-md-6">
                  <Input
                    type="text"
                    placeholder="Nombre"
                    register={register('first_name')}
                    error={errors.first_name?.message}
                    containerClass={
                      'input-item input-item-name ltn__custom-icon'
                    }
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    type="text"
                    placeholder="Apellido"
                    register={register('last_name')}
                    error={errors.last_name?.message}
                    containerClass={
                      'input-item input-item-name ltn__custom-icon'
                    }
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    type="email"
                    placeholder="Correo"
                    register={register('email')}
                    error={errors.email?.message}
                    containerClass={
                      'input-item input-item-email ltn__custom-icon'
                    }
                  />
                </div>
                <div className="col-md-6">
                  <PhoneInput
                    control={control}
                    placeholder="Teléfono celular"
                    inputClass="input-item input-item-phone ltn__custom-icon"
                  />
                </div>
                <div className="col-md-6">
                  <Input
                    type="text"
                    placeholder="Dirección"
                    register={register('address')}
                    error={errors.address?.message}
                    containerClass={'input-item ltn__custom-icon'}
                  />
                </div>
              </div>
              <div className="btn-wrapper mt-0">
                <Button
                  loading={isLoadingRequest}
                  className="btn theme-btn-1 btn-effect-1 text-uppercase"
                  type="submit"
                >
                  Actualizar datos
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetail
