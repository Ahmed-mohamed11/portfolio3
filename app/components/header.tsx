"use client";

import { useState, useEffect } from "react";
import { Container, Form, Navbar, Nav, Dropdown } from "react-bootstrap";
import { Globe } from "@phosphor-icons/react";
import { FiChevronDown } from "react-icons/fi";
import Image from "next/image";
import style from "./header.module.css";
import logoImage from "../../public/logo side transparent.svg";
import { useI18nContext } from "../context/I18nContext";
import Link from "next/link";

function NavScrollExample({}) {
  const [activeLink, setActiveLink] = useState("");
  const [showNavbar, setShowNavbar] = useState(true);
  const { t, changeLanguage, language } = useI18nContext();
  const handleNavClick = (hash) => setActiveLink(hash);

  return (
    <Navbar
      dir={language === "ar" ? "rtl" : "ltr"}
      expand="lg"
      className={` ${style.nav} ${showNavbar ? "d-flex" : "d-none"}`}
      style={{
        display: showNavbar ? "flex" : "none",
        transition: "opacity 0.5s",
      }}
    >
      <Container fluid className="d-flex justify-content-around ">
        <div
          className="flex justify-between items-center max-lg:w-full max-lg:h-20 max-lg:px-0 max-lg:mt-28 max-lg:pb-4"
          dir={language === "ar" ? "rtl" : "ltr"}
        >
          <Image
            src={logoImage}
            alt="logo Image"
            className={`me-0 ${style.responsiveLogo}`}
            // width={300}
            priority
          />
          <Form
            className={`z-50 d-flex absolute  ${
              language === "ar"
                ? "left-10 max-lg:left-20 max-md:left-20"
                : "right-40 max-lg:right-20 max-md:right-20 max-sm:right-20 "
            }`}
          >
            <Dropdown>
              <Dropdown.Toggle
                className={`${style.noAfter} w-40 max-lg:w-fit`}
                variant=""
                id=""
              >
                <span className="d-flex text-gray-100 capitalize ">
                  <Globe className="h-6 w-10 max-lg:w-fit" aria-hidden="true" />{" "}
                  {language}
                  <FiChevronDown
                    className={`h-6 w-10 max-lg:w-fit `}
                    aria-hidden="true"
                  />
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu className={` ${style.bgT}`}>
                <Dropdown.Item
                  className="text-center hover:text-black "
                  onClick={() => changeLanguage("en")}
                >
                  {t("Header.English")}
                </Dropdown.Item>
                <Dropdown.Item
                  className="text-center hover:text-black"
                  onClick={() => changeLanguage("ar")}
                >
                  {t("Header.Arabic")}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form>
          <Navbar.Toggle aria-controls="navbarScroll" className="h-10" />
        </div>
        <Navbar.Collapse
          id="navbarScroll"
          className={` py-4 px-6 z-40 ${style.bgBl}`}
        >
          <Nav className="  me-auto my-lg-0 text-lg" navbarScroll>
            <Link
              href="/"
              className={`nav-link ${style.toggleLink}  ${
                activeLink === "/" ? style.activeLink : ""
              }`}
              onClick={() => handleNavClick("/")}
            >
              {t(`Header.Home`)}
            </Link>
            <Link
              href="/service"
              className={`nav-link ${style.toggleLink}  ${
                activeLink === "/service" ? style.activeLink : ""
              }`}
              onClick={() => handleNavClick("/service")}
            >
              {t("Header.Services")}
            </Link>
            <Link
              href="/projects"
              className={`nav-link ${style.toggleLink}  ${
                activeLink === "/projects" ? style.activeLink : ""
              }`}
              onClick={() => handleNavClick("/projects")}
            >
              {t("Header.Projects")}
            </Link>
            <Link
              href="/#contact"
              className={`nav-link ${style.toggleLink}  ${
                activeLink === "#contact" ? style.activeLink : ""
              }`}
              onClick={() => handleNavClick("#contact")}
            >
              {t("Header.ContactUs")}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
