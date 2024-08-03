"use client";
import { useEffect, useState } from "react";
import styles from "./style.module.css";
import style from "../homeService/styles.module.css";
import Image from "next/image";
import Link from "next/link";
import { useI18nContext } from "../../context/I18nContext";

const AboutService = () => {
  const [services, setServices] = useState([]);
  const { t, language } = useI18nContext();
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch(
          "https://siteapi.dramcode.top/services/?sort=createdAt", { credentials: 'include' }
        );
        const data = await response.json();
        setServices(data.data);
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };

    fetchSlides();
  }, []);

  return (
    <div>
      <h2 className="font-bold py-3  mt-10 z-50 text-center max-md:px-10">
        {t('Services.servicesTitle')}
      </h2>
      <div className={styles.line}></div>
      <div className="flex justify-between align-center mx-4 max-lg:flex-wrap max-lg:justify-center">
        <div
          className={`flex justify-content-evenly align-center  ${styles.wavy}`}
        >
          <div className={styles.card}>
            <h5>{t('Services.About')}</h5>
            <h1 className="font-bolder my-2 ">
              DRAM CODE <br /> Company
            </h1>
            <h5 className="leading-7">
              {t('Services.description')}
            </h5>
          </div>
        </div>
        <div className={`flex justify-between align-center flex-wrap  max-lg:justify-center`}>
          {services.map((service, index) => (
            <div key={index} className={`w-52 ${styles.serviceH} flex justify-center align-center`}>
              <Link
                href={`/service/${service._id}`}
                className="no-underline flex flex-col justify-center align-center text-center "
                passHref
              >
                <div
                  className={`flex justify-center align-center  ${styles.circularImage}`}
                >
                  <Image
                    width={120}
                    height={120}
                    objectFit="contain"
                    src={service.image}
                    alt="service-name"
                    className="p-4 "
                  />
                </div>
                <p className="py-4	text-[#000] max-w-52 text-l">
                  {language === "ar" ? service.name_ar : service.name_en}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutService;
