"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./account.module.css";
import facebook from "../../public/facebook.svg";
import instagram from "../../public/instagram.svg";
import twitter from "../../public/images.png";
import { useI18nContext } from "../context/I18nContext";

const socialLinks = [
  {
    href: "https://www.facebook.com/profile.php?id=61552302150847",
    imgSrc: facebook,
    alt: "facebook",
    style: styles.facebook,
  },
  {
    href: "https://www.facebook.com/profile.php?id=61552302150847",
    imgSrc: instagram,
    alt: "instagram",
    style: styles.instagram,
  },
  {
    href: "https://www.facebook.com/profile.php?id=61552302150847",
    imgSrc: twitter,
    alt: "twitter",
    style: styles.twitter,
  },
];

const SocialIcons = () => {
  const { t, language } = useI18nContext();

  return (
    <div className={`${styles.flex} ${styles.socialIcons}`}>
      <div className={`${styles.flex} ${styles.followUs}`}>
        {Array.from(t("SocialIcons.followUs") as string).map(
          (letter, index) => (
            <span key={index}>{letter}</span>
          )
        )}
      </div>
      <div className={styles.iconContainer}>
        {socialLinks.map(({ href, imgSrc, alt, style }, index) => (
          <Link
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={`${styles.icon} ${style}`}>
              <Image src={imgSrc} alt={alt} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SocialIcons;
