"use client";

import { useState, useEffect, useReducer } from "react";
import Image from "next/image";
import styles from "./team.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { useI18nContext } from "../context/I18nContext";
import { useMediaQuery } from "react-responsive";
import Loading from "../Loading";
import Aos from "aos";
import "aos/dist/aos.css";

const initialState = {
  slides: [],
  loading: true,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SLIDES":
      return { ...state, slides: action.payload, loading: false };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: true };
    default:
      return state;
  }
};

const Slider2 = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { t, language } = useI18nContext();
  const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const isTabScreen = useMediaQuery({ query: "(min-width: 765px)" });

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const fetchSlides = async () => {
      dispatch({ type: "SET_LOADING" });
      try {
        const response = await fetch(
          "https://siteapi.dramcode.top/users?sort=job name_en&limit=50",
          { credentials: "include" }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const slidesArray = data.data;
        if (Array.isArray(slidesArray)) {
          const formattedSlides = slidesArray.map((slide) => ({
            name: language === "ar" ? slide.name_ar : slide.name_en,
            job: language === "ar" ? slide.job.name_ar : slide.job.name_en,
            image: slide.image,
          }));
          dispatch({
            type: "SET_SLIDES",
            payload: formattedSlides.slice(0, 13),
          });
        } else {
          console.error("Unexpected data format:", data);
          dispatch({ type: "SET_ERROR", payload: "Unexpected data format" });
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
        dispatch({ type: "SET_ERROR", payload: "Failed to load slides" });
      }
    };

    fetchSlides();
  }, [language]);

  const { slides, loading, error } = state;

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.slider} dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="relative flex mb-3 mt-3 items-center justify-center">
        <h1 className="stroke-1 display-3 px-3 mb-3 rounded-5 text-gray-100 bg-[--button]">
          {t("Team.Title")}
        </h1>
      </div>
      <Swiper
        slidesPerView={isLgScreen ? 3 : isTabScreen ? 2 : 1}
        spaceBetween={30}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Pagination, Autoplay]}
        className={styles.swiper}
        data-aos="fade-up"
      >
        {slides.map((slide) => (
          <SwiperSlide className={styles.swiperSlide} key={slide.name}>
            <div className={styles.slide}>
              <div className={styles.contImages}>
                <Image
                  data-aos="zoom-in"
                  className={styles.slideImage}
                  src={slide.image}
                  alt={slide.name}
                  width={100}
                  height={100}
                  style={{ borderRadius: "50%" }}
                  loading="lazy"
                />
              </div>
              <h3 className={styles.slideName} data-aos="fade-right">
                {slide.name}
              </h3>
              <p className={styles.slideJob} data-aos="fade-left">
                {slide.job}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider2;
