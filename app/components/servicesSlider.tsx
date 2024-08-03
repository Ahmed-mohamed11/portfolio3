"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./services.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useI18nContext } from "../context/I18nContext";
import { useMediaQuery } from "react-responsive";
import Loading from "../Loading";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

const Slider = () => {
  const { t, language } = useI18nContext();
  const [slides, setSlides] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const isTabScreen = useMediaQuery({ query: "(min-width: 765px)" });

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch("https://siteapi.dramcode.top/services/?sort=createdAt", { credentials: 'include' });
        const data = await response.json();

        const slidesArray = data.data;
        if (Array.isArray(slidesArray)) {
          const formattedSlides = slidesArray.map((slide) => ({
            name: language === "ar" ? slide.name_ar : slide.name_en,
            intro: language === "ar" ? slide.intro_ar : slide.intro_en,
            image: slide.image,
          }));
          setSlides(formattedSlides.slice(0, 7));
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };

    fetchSlides();
  }, [language]);

  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  const handleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (slides.length === 0) {
    return <Loading />;
  }

  return (
    <div className={styles.slider} dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="position-relative d-flex mb-3 mt-3 align-items-center justify-content-center">
        <h1 className="stroke-1 display-3 px-3 mb-3 rounded-5  text-gray-100 bg-[--button]">
          {t("Services.ourServices")}
        </h1>
      </div>
      <Swiper
        slidesPerView={isLgScreen ? 3 : isTabScreen ? 2 : 1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        className={styles.swiper}
        data-aos="fade-up"
      >
        {slides.map((slide, index) => (
          <SwiperSlide className={styles.swiperSlide} key={index}>
            <div className={styles.contImages} data-aos="zoom-in">
              <Image
                className={styles.slideImage}
                src={slide.image}
                alt="slideName"
                width={500}
                height={500}
                loading="lazy"
              />
            </div>
            <h3 className={styles.slideName} data-aos="fade-right">
              {slide.name}
            </h3>
            <p className={styles.slidePara} data-aos="fade-left">
              {expandedIndex === index
                ? slide.intro
                : slide.intro.length > 50
                ? `${slide.intro.substring(0, 100)}... `
                : slide.intro}
              {slide.intro.length > 50 && (
                <button className="text-[--button]">
                  <Link href={`/service`} className="no-underline">
                    {t("Services.readMore")}
                  </Link>
                </button>
              )}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
