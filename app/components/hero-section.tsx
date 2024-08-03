"use client";
import React from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link as ScrollLink } from "react-scroll";
 import { useI18nContext } from "../context/I18nContext";
import SocialIcons from "./account";

const HeroSection = () => {
  const { t, language } = useI18nContext();
 
  return (
    <section
      className={`z-10 section  absolute top-36  max-lg:top-32   ${
        language === "ar"
          ? "right-5  max-md:right-0 max-sm:right-7"
          : "left-5 max-md:left-0 max-sm:left-7"
      }`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <div className=" grid grid-cols-4 sm:grid-cols-12 text-white z-10">
        {<SocialIcons />}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="col-span-8 content place-self-center text-start sm:text-left"
        >
          <h1
            className={`lineAround  relative block text-white text-5xl${
              language === "ar"
                ? " text-right right-32 max-lg:right-16 max-md:right-10"
                : "text-left left-32 max-lg:left-16 max-md:left-10"
            } text-white text-2xl sm:text-5xl lg:text-3xl lg:leading-normal font-extrabold`}
          >
            <div className=" lineAround1   lg:text-6xl lg:leading-normal font-extrabold">
              {t("HeroSection.title.we")}
            </div>
            <div className="implement lg:text-6xl lg:leading-normal font-extrabold">
              {t("HeroSection.title.implement")}
            </div>
            <span className="lineAround2  lg:text-5xl  lg:leading-normal font-extrabold">
              {t("HeroSection.title.corporateSoftware")}
            </span>
          </h1>
          <p
            className={`relative w-80 ms-5 max-md:mt-5 ${
              language === "ar"
                ? "text-right right-60 max-lg:right-32 max-md:right-0 max-sm:-right-7"
                : "text-left left-60 max-lg:left-32 max-md:left-0 max-sm:-left-7"
            }  text-[#fff] text-base sm:text-lg mb-6 lg:text-xl`}
          >
            {t("HeroSection.description")}
          </p>
          <div className=" inline-block">
            <ScrollLink
              to="contact"
              smooth={true}
              duration={800}
              className={`text-decoration-none cursor-pointer d-flex relative mx-5 z-10 px-8 py-3 sm:w-fit rounded-full bg-blue-500 text-white hover:tracking-widest 
              ${
                language === "ar"
                  ? "right-96 max-lg:right-32 max-md:right-0 max-sm:-right-7"
                  : "left-96 max-lg:left-32 max-md:left-0 max-sm:-left-7"
              }`}
            >
              <span className="text-white ">{t("HeroSection.contactUs")}</span>
              {language === "ar" ? (
                <FiChevronLeft className="h-6 w-10" aria-hidden="true" />
              ) : (
                <FiChevronRight className="h-6 w-10" aria-hidden="true" />
              )}
            </ScrollLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
