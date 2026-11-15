import React from "react";
import Link from "next/link";
import classes from "./Home.module.css";

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={`container ${classes.hero_inner}`}>
        {/* 社名にちなんだ飾りの記号。読み上げの対象にしない */}
        <div className={classes.plus} aria-hidden="true">
          <span className={classes.plus_sign}>+</span>
          <span className={classes.plus_one}>1</span>
        </div>
        <div className={classes.hero_copy}>
          <h1 className={classes.hero_title}>
            <span>暮らしに、</span>
            <span>プラスワン。</span>
          </h1>
          <p className={classes.hero_text}>
            内装も、水廻りも、外構も。
            <br />
            前橋の住まいと店舗に、もうひとつの良さを足します。
          </p>
          <div className={classes.hero_buttons}>
            <Link href="/contact" className="btn btn-primary">
              お問い合わせ
            </Link>
            <Link href="/#services" className="btn btn-ghost">
              事業内容を見る
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
