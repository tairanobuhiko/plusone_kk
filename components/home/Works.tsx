import React from "react";
import classes from "./Home.module.css";
import Reveal from "../Reveal";
import { Work, WORKS } from "@/data/works";

type Props = {
  works?: Work[];
};

// 写真つきの事例だけを並べる。1 件も無い間はブロックごと表示しない
const Works = ({ works = WORKS }: Props) => {
  const shown = works.filter((work) => work.image !== "");
  if (shown.length === 0) return null;

  return (
    <section id="works" className={classes.section}>
      <div className="container">
        <Reveal>
          <h2 className={classes.section_title}>施工事例</h2>
        </Reveal>
        <ul className={classes.works}>
          {shown.map((work, index) => (
            <li key={`${work.title}-${index}`}>
              <Reveal delay={index * 100}>
                <img
                  className={classes.work_photo}
                  src={`/works/${work.image}`}
                  alt={work.title}
                  loading="lazy"
                />
                <p className={classes.work_title}>{work.title}</p>
                {work.text && <p className={classes.work_text}>{work.text}</p>}
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Works;
