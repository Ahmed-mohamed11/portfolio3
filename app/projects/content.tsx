import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { useI18nContext } from "../context/I18nContext";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import Link from "next/link";
import Loading from "../Loading";

const Content = () => {
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { t, language } = useI18nContext();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch("https://siteapi.dramcode.top/categories", { credentials: 'include' });
      const result = await response.json();
      if (result && result.data) {
        setCategories(result.data);
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError(error.message);
    }
  }, []);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const typeFilter = selectedCategory ? `category=${selectedCategory}` : "";
      const query = `page=${pagination.currentPage}&limit=10${typeFilter ? `&${typeFilter}` : ""
        }`;
      const response = await fetch(
        `https://siteapi.dramcode.top/projects?${query}`, { credentials: 'include' }
      );
      const result = await response.json();
      if (result && result.data) {
        setProjects(result.data);
        setPagination((prev) => ({
          ...prev,
          totalPages: result.pagination.numberOfPages || 1,
        }));
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, pagination.currentPage]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleCategoryChange = (id) => {
    setSelectedCategory(id);
    setPagination((prev) => ({
      ...prev,
      currentPage: 1,
    }));
  };

  const handlePageChange = (newPage) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      currentPage: newPage,
    }));
  };

  const pageButtons = Array.from(
    { length: pagination.totalPages },
    (_, index) => index + 1
  );

  return (
    <div dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="m-4">
        <div className="font-bold text-xl my-5 max-lg:text-center">
          {t("Projects.ProjectsWeDeveloped")}
        </div>
        <form className="flex max-lg:justify-center">
          {categories.length > 0 && (
            <div
              className={`mb-2 ${selectedCategory === null ? "text-blue-500" : ""
                }`}
            >
              <input
                type="radio"
                id="all"
                name="category"
                checked={selectedCategory === null}
                value="all"
                onChange={() => handleCategoryChange(null)}
                className={`${language === "ar" ? "ml-2" : "mr-2"}`}
                aria-label="All categories"
              />
              <label htmlFor="all">{t("Projects.All")}</label>
            </div>
          )}
          {categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category._id}
                className={`mb-2 ${language === "ar" ? "mr-3" : "ml-3"} ${selectedCategory === category._id ? "text-blue-500" : ""
                  }`}
              >
                <input
                  type="radio"
                  id={`category-${category._id}`}
                  name="category"
                  value={category._id}
                  checked={selectedCategory === category._id}
                  onChange={() => handleCategoryChange(category._id)}
                  className={`${language === "ar" ? "ml-2" : "mr-2"}`}
                  aria-label={category.name_en}
                />
                <label htmlFor={`category-${category._id}`}>
                  {language === "ar" ? category.name_ar : category.name_en}
                </label>
              </div>
            ))
          ) : (
            <p>{t("Projects.NoCategories")}</p>
          )}
        </form>
        {loading ? (
          <div className="flex justify-center items-center">
            <Loading />
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-lg:flex max-lg:items-center max-lg:justify-center max-lg:my-3">
            {projects.map((project) => (
              <div key={project._id} className={styles.card}>
                <Link href={`/projects/${project._id}`} passHref>
                  <div className={styles.imageContainer}>
                    <Image
                      className={`rounded-3 ${styles.image}`}
                      src={project.cover}
                      alt="projectName"
                      layout="fill"
                    />
                    <div className={styles.overlay}>
                      <p className={styles.text}>
                        {language === "ar" ? project.name_ar : project.name_en}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : error ? (
          <p>{t("Projects.Error", { error })}</p>
        ) : (
          <p>{t("Projects.NoProjects")}</p>
        )}

        <nav className="flex flex-col md:flex-row  justify-center p-4 gap-8 max-md:items-center max-md:gap-0">
          <ul
            className="inline-flex items-stretch w-fit rounded-full max-md:ml-0 max-md:pl-0"
            dir="ltr"
          >
            <li className="bg-slate-300 opacity-2 rounded-l-full">
              <button
                className="flex items-center justify-center h-full py-1 px-1 text-blue-600 rounded-l-full border border-gray-300 hover:bg-gray-100 hover:text-blue-700"
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
              >
                <CaretLeft size={20} weight="bold" />
              </button>
            </li>
            {pageButtons.map((page) => (
              <li key={page} className="bg-slate-300 opacity-2">
                <button
                  className={`flex items-center justify-center text-sm py-1 mx-2 my-1 px-2 leading-tight ${pagination.currentPage === page
                    ? "bg-blue-500 rounded-full text-white"
                    : "text-white hover:bg-gray-200 hover:text-blue-500 hover:rounded-full"
                    }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              </li>
            ))}
            <li className="bg-slate-300 opacity-2 rounded-r-full">
              <button
                className="flex items-center justify-center h-full py-1 px-1 ml-0 text-blue-600 rounded-r-full border border-gray-300 hover:bg-gray-100 hover:text-blue-700-700"
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
              >
                <CaretRight size={20} weight="bold" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Content;
