import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ScrollTrigger } from '../gsapClient';
import PageMeta from '../components/PageMeta';
import { getRestaurantJsonLd } from '../seo/siteConfig';
import HomeHero from '../components/HomeHero';
import HomeToorStory from '../components/HomeToorStory';
import HomeInternationalBroths from '../components/HomeInternationalBroths';
import HomeSpecialDishes from '../components/HomeSpecialDishes';
import HomeSpaceSection from '../components/HomeSpaceSection';

const Home = () => {
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, []);

  const restaurantLd = getRestaurantJsonLd();

  return (
    <>
      <PageMeta
        title="TOOR Hotpot | Lẩu cao cấp Crescent Mall TP.HCM"
        description="TOOR Hotpot — trải nghiệm lẩu cao cấp, nước dùng đa dạng và không gian ấm cúng tại Crescent Mall, TP.HCM. Xem thực đơn, đặt bàn và đặt món trực tuyến."
        path="/"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(restaurantLd)}</script>
      </Helmet>
      <HomeHero />
      <HomeToorStory />
      <HomeInternationalBroths />
      <HomeSpecialDishes />
      <HomeSpaceSection />
    </>
  );
};

export default Home;
