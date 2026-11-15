import React from "react";
import classes from "./Home.module.css";
import { SERVICES } from "@/lib/site";

const items = SERVICES.map((service) => service.title);

// 同じ並びを置く回数。Home.module.css の slide（1 回分 = 100% ÷ 8）と揃える
const COPIES = 8;

const BeltItems = ({ hidden }: { hidden?: boolean }) => (
  <ul className={classes.belt_items} aria-hidden={hidden}>
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

// 事業名が横に流れ続ける帯。広い画面でも途切れないように同じ並びを続けて置く
const Belt = () => {
  return (
    <div className={classes.belt}>
      <div className={classes.belt_track}>
        {Array.from({ length: COPIES }, (_, index) => (
          <BeltItems key={index} hidden={index > 0 || undefined} />
        ))}
      </div>
    </div>
  );
};

export default Belt;
