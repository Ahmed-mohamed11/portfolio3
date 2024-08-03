"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import contactImage from "../../public/cute-freelance-girl-using-laptop-sitting-floor-smiling.png";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useI18nContext } from "../context/I18nContext";
import Aos from "aos";
import "aos/dist/aos.css";

const ContactForm = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  const { t, language } = useI18nContext();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    title: "",
    description: "",
  });

  const [showPhoneMessage, setShowPhoneMessage] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("_coo_123");
    console.log(`Token: ${token}`);
    try {
      const response = await fetch("https://siteapi.dramcode.top/contact", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": token,
        },
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          title: t("ContactForm.SuccessTitle"),
          text: t("ContactForm.SuccessMessage"),
          icon: "success",
          confirmButtonText: t("ContactForm.OkButton"),
        });
        setFormData({
          name: "",
          phone: "",
          title: "",
          description: "",
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          title: t("ContactForm.ErrorTitle"),
          text: t("ContactForm.ErrorMessage"),
          icon: "error",
          confirmButtonText: t("ContactForm.OkButton"),
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: t("ContactForm.ErrorTitle"),
        text: t("ContactForm.ErrorMessage"),
        icon: "error",
        confirmButtonText: t("ContactForm.OkButton"),
      });
    }
  };

  return (
    <div
      id="contact"
      className="contact my-12 ms-32 max-lg:ms-0 grid grid-cols-2 gap-8 max-lg:grid-cols-1"
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <form
        onSubmit={handleSubmit}
        className="w-[42vw] max-lg:w-[80vw] mx-auto p-6 border border-gray-300 rounded-lg shadow-md"
        data-aos={`${language === "ar" ? "fade-left" : "fade-right"}`}
        data-aos-delay="300"
        aria-labelledby="contact-form-title"
      >
        <div>
          <h3
            id="contact-form-title"
            className="border-x-0 border-t-0 border-dotted inline border-gray-300 p-2 text-xl font-semibold"
          >
            {t("ContactForm.ContactUs")}
          </h3>
          <p className="my-4 text-gray-600">{t("ContactForm.Description")}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3 max-md:grid-cols-1 relative">
          <input
            placeholder={t("ContactForm.NamePlaceholder")}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mb-2 p-2 border border-gray-300 rounded-md w-full"
            aria-label={t("ContactForm.NamePlaceholder")}
          />
          <div className="relative">
            <input
              placeholder={t("ContactForm.PhonePlaceholder")}
              type="tel"
              className={`${
                language === "ar" ? "text-right" : ""
              } mb-2 p-2 border border-gray-300 rounded-md w-full`}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onFocus={() => setShowPhoneMessage(true)}
              onBlur={() => setShowPhoneMessage(false)}
              aria-label={t("ContactForm.PhonePlaceholder")}
            />
            {showPhoneMessage && (
              <div className="absolute top-full left-0 mt-1 p-2 bg-blue-100 border border-blue-200 rounded-md text-sm">
                <div className="absolute top-[-8px] left-[-8px] w-0 h-0 border-t-8 border-t-blue-100 border-l-8 border-l-transparent border-r-8 border-r-transparent"></div>
                {t("ContactForm.PhoneMessage")}
              </div>
            )}
          </div>
        </div>
        <div className="mb-4">
          <input
            placeholder={t("ContactForm.TitlePlaceholder")}
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mb-2 p-2 border border-gray-300 rounded-md w-full"
            aria-label={t("ContactForm.TitlePlaceholder")}
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder={t("ContactForm.DescriptionPlaceholder")}
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md w-full resize-y"
            aria-label={t("ContactForm.DescriptionPlaceholder")}
          />
        </div>
        <button
          type="submit"
          className={`w-24 px-4 py-2 hover:border-2 border-gray-300 border-dotted text-icon font-bold rounded-md cursor-pointer ${
            language === "ar" ? "ml-auto" : ""
          }`}
        >
          {t("ContactForm.SendButton")}
        </button>
      </form>
      <Image
        data-aos={`${language === "ar" ? "fade-right" : "fade-left"}`}
        data-aos-delay="300"
        src={contactImage}
        alt="Contact Image"
        width={700}
        height={700}
        priority
      />
    </div>
  );
};

export default ContactForm;
