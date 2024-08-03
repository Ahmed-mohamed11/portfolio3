"use client";
import React from "react";
import NavScrollExample from "../../components/header";
import styles from "./style.module.css";
 import ServicesComponent from "./service";
import Footer from "../../components/footer";

const page = ({ params }) => {
  const id = params.id;

  return (
    <div>
      <div className={`${styles.gradientBackground} h-44 `}>
        <NavScrollExample />
      </div>
      <ServicesComponent id={id} />
      <Footer />
    </div>
  );
};

export default page;
