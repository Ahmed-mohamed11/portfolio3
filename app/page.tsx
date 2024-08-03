"use client";

import NavScrollExample from "./components/header";
import DevelopmentProcess from "./components/develop";
import HeroSection from "./components/hero-section";
import Service from "./components/services";
import style from "./components/header.module.css";

 import ContactForm from "./contact/page";
import Footer from "./components/footer";
import Project from "./components/project";
import Team from "./components/team";

export default function Home() {
  return (
    <main>
      <div className={style.content}>
        <NavScrollExample />
        <HeroSection />
      </div>
      <DevelopmentProcess />
      <Service />
      <Project />
      <Team />
      <ContactForm />
      <Footer />
    </main>
  );
}
