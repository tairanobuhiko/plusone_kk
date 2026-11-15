import React from "react";
import Link from "next/link";
import classes from "./Home.module.css";
import Reveal from "../Reveal";

const Greeting = () => {
  return (
    <section className={classes.greeting}>
      <div className={`container ${classes.greeting_inner}`}>
        <Reveal>
          <h2 className={classes.section_title}>代表挨拶</h2>
        </Reveal>
        <Reveal delay={100}>
          <p className={classes.greeting_quote}>
            ひとと人との出会いから、心の通うコミュニケーションを大切に末永いお付き合いを心がけております。
          </p>
          <p className={classes.greeting_text}>
            培った技術で創意工夫を追求し、安心・安全に基づいた価値を提供できるよう日々精進しております。
          </p>
          <p className={classes.greeting_sign}>
            Plus One株式会社　代表取締役 平 博隆
          </p>
          <Link href="/about" className="btn btn-ghost">
            会社概要を見る
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default Greeting;
