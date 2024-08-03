"use client";
import React from "react";
import NavScrollExample from "../components/header";
import styles from "./styles.module.css";
import Content from "./content";
import Footer from "../components/footer";
 const Page = () => {
  return (
    <div>
      <div className={`${styles.gradientBackground} h-44 `} id="projects">
        <NavScrollExample />
      </div>
      <Content />
      <Footer />
    </div>
  );
};

export default Page;
