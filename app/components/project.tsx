"use client";
import style from "./project.module.css";
import { useI18nContext } from "../context/I18nContext";
import Slider from "../components/sliderProject";

const Project = () => {
  const { t } = useI18nContext();

  return (
    <div
      className={` ${style.content}`}
      id="projects"
    >
      <div className="position-relative d-flex mb-3 mt-3 align-items-center justify-content-center">
        <h1 className="stroke-1 display-3 px-3 mb-3 rounded-5 text-gray-100 bg-[--button]">
          {t("Project.Title")}
        </h1>
      </div>
      <Slider />
    </div>
  );
};

export default Project;
