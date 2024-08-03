"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./services.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useMediaQuery } from "react-responsive";
import { useI18nContext } from "../context/I18nContext";
import Link from "next/link";
import Loading from "../Loading";
import Aos from "aos";
import "aos/dist/aos.css";

const Slider = () => {
  const [slides, setSlides] = useState([]);
  const { language } = useI18nContext();
  const [expandedIndex, setExpandedIndex] = useState(null);
  const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const isTabScreen = useMediaQuery({ query: "(min-width: 765px)" });

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  const fetchSlides = useCallback(async () => {
    try {
      const response = await fetch("https://siteapi.dramcode.top/projects", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      const slidesArray = data.data;
      if (Array.isArray(slidesArray)) {
        const formattedSlides = slidesArray.map((slide) => ({
          id: slide._id,
          name:
            language === "ar" ? slide.category.name_ar : slide.category.name_en,
          name2: language === "ar" ? slide.name_ar : slide.name_en,
          cover: slide.cover,
        }));
        setSlides(formattedSlides.slice(0, 20));
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Error fetching slides:", error);
    }
  }, [language]);

  useEffect(() => {
    fetchSlides();
  }, [fetchSlides]);

  const handleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (slides.length === 0) {
    return <Loading />;
  }

  return (
    <div
      className={`${styles.slider} ${styles.slider2}`}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <Swiper
        slidesPerView={isLgScreen ? 3 : isTabScreen ? 2 : 1}
        spaceBetween={30}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        className={styles.swiper}
        data-aos="fade-up"
      >
        {slides.map((slide, index) => (
          <SwiperSlide className={styles.swiperSlide} key={slide.id}>
            <Link href={`/projects/${slide.id}`} passHref>
              <div className={styles.card}>
                <div className={styles.imageContainer}>
                  <Image
                    data-aos="zoom-in"
                    className={`rounded-3 ${styles.image}`}
                    src={slide.cover}
                    alt={slide.name}
                    fill
                    priority={index < 3} 
                   />
                  <div className={styles.overlay}>
                    <p className={styles.text} data-aos="fade-right">
                      {slide.name}
                    </p>
                    <p className={styles.text} data-aos="fade-left">
                      {slide.name2}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
