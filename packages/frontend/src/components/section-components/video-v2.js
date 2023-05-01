import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class VideoV2 extends Component {

    render() {

        let publicUrl = process.env.PUBLIC_URL+'/'
        let imagealt = 'image'

    return <div className="ltn__about-us-area section-bg-1 bg-image-right-before pt-120 pb-90">
			  <div className="container">
			    <div className="row">
			      <div className="col-lg-6 align-self-center">
			        <div className="about-us-info-wrap">
			          <div className="section-title-area ltn__section-title-2--- mb-20">
			            <h6 className="section-subtitle section-subtitle-2--- ltn__secondary-color">Building Facilities</h6>
			            <h1 className="section-title">Haciendo Espacios de Vivienda
			              Mas Hermosos</h1>
			            <p>Más de 39.000 personas trabajan para nosotros en más de 70 países de todo el mundo.
Esta amplitud de cobertura global, combinada con servicios especializados</p>
			          </div>
			          <ul className="ltn__list-item-half ltn__list-item-half-2 list-item-margin clearfix">
			            <li>
			              <i className="icon-done" />
			              Las salas de estar están pre-cableadas para Surround
			            </li>
			            <li>
			              <i className="icon-done" />
			              Lujoso diseño interior y comodidades
			            </li>
			            <li>
			              <i className="icon-done" />
			              Ubicado en las comunidades de Buckhead Vinings
			            </li>
			            <li>
			              <i className="icon-done" />
			              Balcones privados con impresionantes vistas
			            </li>
			            <li>
			              <i className="icon-done" />
			              Una rara combinación de arquitectura inspirada
			            </li>
			            <li>
			              <i className="icon-done" />
			              Parrilla al aire libre con comedor
			            </li>
			          </ul>
			          <div className="  ltn__animation-pulse2 text-center mt-30">
			            <a className="ltn__video-play-btn bg-white--- ltn__secondary-bg" href="https://www.youtube.com/embed/HnbMYzdjuBs?autoplay=1&showinfo=0" data-rel="lightcase">
			              <i className="icon-play  ltn__secondary-color--- white-color" />
			            </a>
			          </div>
			        </div>
			      </div>
			      <div className="col-lg-6 align-self-center">
			        <div className="about-us-img-wrap about-img-left">
			        </div>
			      </div>
			    </div>
			  </div>
			</div>
        }
}

export default VideoV2