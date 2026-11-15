import React from "react";
import classes from "./Home.module.css";
import Reveal from "../Reveal";
import { SERVICES } from "@/lib/site";

const Services = () => {
  return (
    <section id="services" className={classes.section}>
      <div className="container">
        <Reveal>
          <h2 className={classes.section_title}>事業内容</h2>
          <p className={classes.section_lead}>
            建築・内装工事を軸に、住まいと店舗の工事を承ります。
          </p>
        </Reveal>
        <div className={classes.services}>
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={index * 100}>
              <article className={classes.service}>
                <div className={classes.service_image}>
                  <img src={service.image} alt="" loading="lazy" />
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
