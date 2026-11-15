import React from "react";
import Link from "next/link";
import classes from "./Home.module.css";
import Reveal from "../Reveal";
import { SITE } from "@/lib/site";

const ContactCta = () => {
  return (
    <section className={classes.cta}>
      <div className="container">
        <Reveal className={classes.cta_inner}>
          <h2 className={classes.cta_title}>
            前橋近郊のリフォームは、
            <br />
            お気軽にご相談ください。
          </h2>
          <div className={classes.cta_actions}>
            <a
              href={`tel:${SITE.tel.replace(/-/g, "")}`}
              className={classes.cta_tel}
            >
              <span>お電話</span>
              {SITE.tel}
            </a>
            <Link href="/contact" className="btn btn-primary">
              フォームで問い合わせる
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactCta;
