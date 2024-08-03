import React from "react";
 import AboutService from "./aboutService/page";
import NavScrollExample from "../components/header";
import styles from "./homeService/styles.module.css";
import Footer from "../components/footer";
 
const page = ({ params }) => {
  const id = params.id;

  return (
    <div>
      <div className={styles.gradientBackground}>
        <NavScrollExample />
      </div>
      <AboutService />
      <Footer />
    </div>
  );
};

export default page;
