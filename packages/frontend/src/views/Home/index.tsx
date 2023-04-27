import React from 'react'
import Banner from '../../components/section-components/banner-v2'
import Aboutv3 from '../../components/section-components/about-v3'
import Video from '../../components/section-components/video-v2'
import Featuresv1 from '../../components/section-components/features-v1'
import UpComingProduct from '../../components/section-components/upcoming-product-v1'
import ApartmentV2 from '../../components/section-components/apartment-v2'
import ProductSlider from '../../components/section-components/product-slider-v2'
import Availability from '../../components/section-components/availability'
import Neighbour from '../../components/section-components/neighbour'
import Cateogory from '../../components/section-components/category-v2'
import Testimonial from '../../components/section-components/testimonial-v2'
import BlogSlider from '../../components/blog-components/blog-slider-v1'
import CallToActionV1 from '../../components/section-components/call-to-action-v1'
import DefaultLayout from '../../layouts/DefaultLayout'
import useScrollToTopOnMount from '../../hooks/useSrollToTopOnMount'
import InstagramFeed from './InstagramFeed'

const Home = () => {
  useScrollToTopOnMount()
  return (
    <DefaultLayout>
      <Banner />
      <Aboutv3 />
      <Video />
      <Featuresv1 customClass="ltn__feature-area section-bg-1--- pt-115 pb-90 mb-120---" />
      <UpComingProduct />
      <ApartmentV2 />
      <ProductSlider />
      <Availability />
      <Neighbour />
      <Cateogory />
      <Testimonial />
      <BlogSlider customClass="section-subtitle-2" />
      <InstagramFeed />
    </DefaultLayout>
  )
}

export default Home
