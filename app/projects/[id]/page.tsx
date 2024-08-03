"use client";
import React from "react";
import NavScrollExample from "../../components/header";
import styles from "../styles.module.css";
 import ProjectPage from "./project";
import Footer from "../../components/footer";

const page = ({ params }) => {
  const id = params.id;

  return (
    <div>
      <div className={`${styles.gradientBackground} h-44 `}>
        <NavScrollExample />
      </div>
      <ProjectPage id={id} />
      <Footer />
    </div>
  );
};

export default page;
