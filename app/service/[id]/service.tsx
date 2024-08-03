"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useI18nContext } from "../../context/I18nContext";
import styles from "./style.module.css";
import Image from "next/image";
import logoImage from "../../../public/logo side transparent.svg";
import Loading from "../../Loading";

const ServicesComponent = ({ id }) => {
  const [service, setService] = useState(null);
  const { t, language } = useI18nContext();

  const fetchServiceData = async () => {
    try {
      const response = await axios.get(
        `https://siteapi.dramcode.top/services/${id}`, { withCredentials: true }
      );
      setService(response.data.data);
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  };

  useEffect(() => {
    fetchServiceData();
  }, [id]);

  if (!service) {
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div
      dir={language === "ar" ? "rtl" : "ltr"}
      className={` flex align-center justify-between max-md:justify-center ${styles.mm}`}
    >
      <div key={service.id} className={` h-75 mt-3 ${styles.mbb} max-md:w-96`}>
        <h1 className={`text-blue-500 font-bold  ${styles.mbb}`}>
          {language === "ar" ? service.name_ar : service.name_en}
          <div className={styles.line2}></div>
        </h1>
        <h3 className="text-justify text-lg">
          {language === "ar" ? service.intro_ar : service.intro_en}
        </h3>
        <h5 className="text-justify text-lg">
          {language === "ar" ? service.description_ar : service.description_en}
        </h5>
      </div>
      <div>
        <div className={`${styles.wave} max-md:hidden z-0`}>
          <Image
            src={logoImage}
            alt="logo Image"
            className={styles.Image2}
            width={1200}
            height={1200}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesComponent;
