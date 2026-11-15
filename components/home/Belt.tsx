import React from "react";
import classes from "./Home.module.css";
import { SERVICES } from "@/lib/site";

const items = [...SERVICES.map((service) => service.title), "住宅診断"];

const BeltItems = ({ hidden }: { hidden?: boolean }) => (
  <ul className={classes.belt_items} aria-hidden={hidden}>
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

// 事業名が横に流れ続ける帯。途切れないように同じ並びを 2 回続けて置く
const Belt = () => {
  return (
    <div className={classes.belt}>
      <div className={classes.belt_track}>
        <BeltItems />
        <BeltItems hidden />
      </div>
    </div>
  );
};

export default Belt;
