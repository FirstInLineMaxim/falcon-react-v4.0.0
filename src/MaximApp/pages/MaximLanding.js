import Cta from 'components/pages/landing/Cta';
import FooterStandard from 'components/pages/landing/FooterStandard';
import Hero from 'components/pages/landing/Hero';
import NavbarStandard from 'components/pages/landing/NavbarStandard';
import Partners from 'components/pages/landing/Partners';
import Processes from 'components/pages/landing/Processes';
import Services from 'components/pages/landing/Services';
import Testimonial from 'components/pages/landing/Testimonial';
import React from 'react';

export default function MaximLanding() {
  return (
    <>
      <NavbarStandard />
      <Hero />
      <Partners />
      <Processes />
      <Services />
      <Testimonial />
      <Cta />
      <FooterStandard />
    </>
  );
}
