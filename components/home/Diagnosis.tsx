import React from "react";
import Link from "next/link";
import classes from "./Home.module.css";
import Reveal from "../Reveal";

const Diagnosis = () => {
  return (
    <section className={classes.diagnosis}>
      <div className={`container ${classes.diagnosis_inner}`}>
        <Reveal>
          <h2 className={classes.diagnosis_title}>
            大切な住まいの点検・管理
            <br />
            <em>〝住宅診断〟</em>承ります
          </h2>
          <p className={classes.diagnosis_text}>
            住まいの状態が気になるときは、工事の前にまずご相談ください。
          </p>
          <Link href="/contact" className="btn btn-yellow">
            住宅診断を相談する
          </Link>
        </Reveal>
        <Reveal delay={150} className={classes.diagnosis_photo}>
          <img
            src="/hero_image.jpg"
            alt="図面を見ながら打ち合わせをする様子"
            loading="lazy"
          />
        </Reveal>
      </div>
    </section>
  );
};

export default Diagnosis;
