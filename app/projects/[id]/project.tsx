"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import styles from "../../components/services.module.css";
import { Pagination, Autoplay } from "swiper/modules";
import { useMediaQuery } from "react-responsive";
import Loading from "../../Loading";
import { useI18nContext } from "../../context/I18nContext";

const ProjectPage = ({ id }) => {
  const [project, setProject] = useState({
    images: [],
    name_ar: "",
    name_en: "",
    category: { name_en: "", name_ar: "" },
    description_en: "",
    description_ar: "",
    cover: "",
  });
  const { t, language } = useI18nContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [slides, setSlides] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const isLgScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const isTabScreen = useMediaQuery({ query: "(min-width: 765px)" });

  const fetchProject = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const response = await fetch(
        `https://siteapi.dramcode.top/projects/${id}`,
        { credentials: "include" }
      );
      const result = await response.json();

      if (result && result.data) {
        setProject(result.data);

        const slidesArray = result.data.images;
        if (Array.isArray(slidesArray)) {
          setSlides(
            slidesArray.map((image) => ({
              name:
                language === "ar" ? result.data.name_ar : result.data.name_en,
              cover: image,
            }))
          );
        } else {
          console.error("Unexpected data format:", result);
        }
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("Error fetching project:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const handleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="m-10 p-4">
        <h3 className="text-center flex justify-center items-center">
          <Loading />
        </h3>
      </div>
    );
  }

  if (error) {
    return <p>{t("Projects.Error", { error })}</p>;
  }

  return (
    <div dir={language === "ar" ? "rtl" : "ltr"} className="m-5">
      <div>
        <h1>
          <span className="text-blue-500 font-bold">
            {language === "ar" ? project.name_ar : project.name_en}
          </span>
          {" - "}{" "}
          {language === "ar"
            ? project.category.name_ar
            : project.category.name_en}
        </h1>
        <p className=" text-xl">
          {language === "ar" ? project.description_ar : project.description_en}
        </p>
        <div className="w-1/2 h-1/2  my-5 mx-auto ">
          <Image
            src={project?.cover}
            alt={project?.name_en}
            layout="responsive"
            width={300}
            height={300}
            objectFit="contain"
            className="rounded-lg"
            crossOrigin="anonymous"
            loading="lazy"
          />
        </div>
        <div className={`${styles.slider} ${styles.slider2}`}>
          <Swiper
            slidesPerView={isLgScreen ? 3 : isTabScreen ? 2 : 1}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[Pagination, Autoplay]}
            className={styles.swiper}
          >
            {slides.map((slide, index) => (
              <SwiperSlide className={styles.swiperSlide} key={index}>
                <div className={styles.card}>
                  <div className={styles.imageContainer}>
                    <Image
                      className={`rounded-3 ${styles.image}`}
                      src={slide.cover}
                      alt={slide.name}
                      layout="fill"
                       loading="lazy"
                     />
                    <div className={styles.overlay}>
                      <p className={styles.text}>{slide.name}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
