import React from "react";
import Feature1 from "./Feature1";
import Feature2 from "./Feature2";
import Feature3 from "./Feature3";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import Pricing from "./Pricing";
import Testimonials from "./Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Feature2 />
      <Testimonials />
      <Feature3 />
      <Pricing />
      <Feature1 />
      <Footer />
    </>
  );
}
