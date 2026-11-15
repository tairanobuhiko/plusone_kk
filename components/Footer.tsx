import React from "react";
import Link from "next/link";
import classes from "./Footer.module.css";
import { LOGO, NAV, SITE } from "@/lib/site";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.inner}>
        <div className={classes.company}>
          <img
            src={LOGO.text.src}
            alt="Plus One Co., Ltd."
            width={LOGO.text.width}
            height={LOGO.text.height}
            className={classes.logo}
          />
          <p>
            {SITE.zip} {SITE.address}
          </p>
          <p>
            TEL {SITE.tel} / FAX {SITE.fax}
          </p>
        </div>
        <ul className={classes.links}>
          {NAV.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <p className={classes.copyright}>© Plus One Co., Ltd.</p>
    </footer>
  );
};

export default Footer;
