"use client";

import React, { useEffect } from "react";
import { FaHandshake, FaPencilRuler, FaCog, FaRocket } from "react-icons/fa";
import styles from "./DevelopmentProcess.module.css";
import { useI18nContext } from "../context/I18nContext";
import Aos from "aos";
import "aos/dist/aos.css";

const DevelopmentProcess = () => {
  const { t, language } = useI18nContext();

  useEffect(() => {
    Aos.init();
  }, []);

  const steps = [
    {
      icon: <FaHandshake />,
      title: t("DevelopmentProcess.meetAndPlan.title"),
      description: t("DevelopmentProcess.meetAndPlan.description"),
      style: styles.meetPlan,
      stepNumberStyle: "bg-[--process1]",
      stepNumber: "01",
    },
    {
      icon: <FaPencilRuler />,
      title: t("DevelopmentProcess.design.title"),
      description: t("DevelopmentProcess.design.description"),
      style: styles.design,
      stepNumberStyle: "bg-[--process2]",
      stepNumber: "02",
    },
    {
      icon: <FaCog />,
      title: t("DevelopmentProcess.development.title"),
      description: t("DevelopmentProcess.development.description"),
      style: styles.development,
      stepNumberStyle: "bg-[--process3]",
      stepNumber: "03",
    },
    {
      icon: <FaRocket />,
      title: t("DevelopmentProcess.launch.title"),
      description: t("DevelopmentProcess.launch.description"),
      style: styles.launch,
      stepNumberStyle: "bg-[--process4]",
      stepNumber: "04",
    },
  ];

  return (
    <div className={styles.container} dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="position-relative d-flex align-items-center justify-content-center">
        <h2 className={`text-uppercase text-[--header] mt-5 ${styles.title}`}>
          {t("DevelopmentProcess.title")}
        </h2>
      </div>
      <div className="grid grid-cols-4 gap-5 py-5">
        <span className={`${styles.colorBox} ${styles.color1}`}></span>
        <span className={`${styles.colorBox} ${styles.color2}`}></span>
        <span className={`${styles.colorBox} ${styles.color3}`}></span>
        <span className={`${styles.colorBox} ${styles.color4}`}></span>
      </div>
      <div className={styles.processContainer}>
        {steps.map((step, index) => (
          <div
            data-aos={`${language === "ar" ? "flip-right" : "flip-left"}`}
            data-aos-delay="300"
            key={index}
            className={`rounded-full ${styles.processStep} ${step.style}`}
          >
            <div className={styles.icon}>{step.icon}</div>
            <h3 className={styles.h3}>{step.title}</h3>
            <p className={styles.para}>{step.description}</p>
            <span
              className={`${styles.stepNumber} ${step.stepNumberStyle} z-50`}
            >
              {step.stepNumber}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevelopmentProcess;
