"use client";
import Image from "next/image";
 import FooterLogo from "../../public/footer.png";
import { FiMail } from "react-icons/fi";
import { FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
 import twitter from "../../public/download (3).png";
import Link from "next/link";
import { useI18nContext } from "../context/I18nContext";
import { Link as ScrollLink } from "react-scroll";

function Footer() {
  const { t } = useI18nContext();
  return (
    <footer className="z-50 bg-[#011b3d] p-4 w-[100%] m-auto flex items-center justify-center">
      <div className=" w-[90%] py-6 pb-0 lg:py-8 max-lg:ms-0 max-lg:mx-4 max-md:mx-6 max-md:pt-0">
        <div className="flex justify-between max-lg:flex-wrap max-lg:gap-4  ">
          <div className="w-1/4 max-lg:w-40 max-md:w-64">
            <Link href="/#contact" className="flex items-center">
              <Image
                src={FooterLogo}
                className="w-full h-auto max-w-max"
                alt="FlowBite Logo"
              />
            </Link>
          </div>

          <div className="w-1/4 text-gray-400 font-medium max-lg:w-max">
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <ScrollLink
                  to="services"
                  smooth={true}
                  duration={800}
                  className="hover:underline text-xl cursor-pointer"
                >
                  {t("Footer.services")}
                </ScrollLink>
              </li>
              <li className="mb-4">
                <ScrollLink
                  smooth={true}
                  duration={800}
                  to="projects"
                  className="hover:underline text-xl cursor-pointer"
                >
                  {t("Footer.projects")}
                </ScrollLink>
              </li>
              <li className="mb-4">
                <ScrollLink
                  smooth={true}
                  duration={800}
                  to="team"
                  className="hover:underline text-xl cursor-pointer"
                >
                  {t("Footer.team")}
                </ScrollLink>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="hover:underline text-xl cursor-pointer"
                >
                  {t("Footer.contactUs")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-1/4 text-gray-400 max-lg:w-max">
            <h2 className="mb-6 text-2xl text-gray-900 font-medium capitalize dark:text-white">
              {t("Footer.services")}
            </h2>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <Link href="#services" className="hover:underline text-xl">
                  {t("Footer.businessAnalysis")}
                </Link>
              </li>
              <li className="mb-4">
                <Link href="#services" className="hover:underline text-xl">
                  {t("Footer.webDevelopment")}
                </Link>
              </li>
              <li className="mb-4">
                <Link href="#services" className="hover:underline text-xl">
                  {t("Footer.mobileDevelopment")}
                </Link>
              </li>
              <li className="mb-4">
                <Link href="#services" className="hover:underline text-xl">
                  {t("Footer.ai")}
                </Link>
              </li>
              <li className="mb-4">
                <Link href="#services" className="hover:underline text-xl">
                  {t("Footer.uiUxDesign")}
                </Link>
              </li>
              <li className="mb-4">
                <Link href="#services" className="hover:underline text-xl">
                  {t("Footer.graphicDesign")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-1/4 text-gray-400 max-lg:w-max">
            <h2 className="mb-6 text-2xl text-gray-900 font-medium capitalize dark:text-white">
              {t("Footer.contactTitle")}
            </h2>
            <ul className="text-gray-500 dark:text-gray-400">
              <li className="mb-4">
                <div className="flex flex-col">
                  <div className="flex items-center mb-4 min-w-max" title="What's">
                    <FaWhatsapp className="w-5 h-5 me-2" />
                    <Link
                      href="https://wa.me/201091548180"
                      target="_blank"
                      className="pointer"
                      dir="ltr"
                    >
                      {t("Footer.phone")}
                    </Link>
                  </div>
                  <div className="flex items-center mb-4 min-w-max" title="Email">
                    <FiMail className="w-5 h-5 me-2" />
                    <Link
                      href="mailto:info@dramcode.top"
                      target="_blank"
                      className="pointer"
                    >
                      {t("Footer.email")}
                    </Link>
                  </div>
                  <div className="flex items-center text-white gap-3 text-3xl">
                    <Link
                      href="https://www.facebook.com/profile.php?id=61552302150847"
                      target="_blank"
                    >
                      <FiFacebook />
                    </Link>
                    <Link href="https://www.facebook.com/profile.php?id=61552302150847" target="_blank">
                      <FaInstagram />
                    </Link>
                    <Link href="https://www.facebook.com/profile.php?id=61552302150847" target="_blank">
                      <Image
                        src={twitter}
                        alt="twitter"
                        width={24}
                        height={24}
                      />
                    </Link>
                    <Link href="https://www.facebook.com/profile.php?id=61552302150847" target="_blank">
                      <FaLinkedinIn />
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full h-0.5 bg-gray-200 my-4 "></div>

        <div className="text-center text-white">
          <h4 className="mb-0 pb-0">© DRAM Code 2024</h4>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
