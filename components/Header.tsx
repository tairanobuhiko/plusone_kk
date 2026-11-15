import React, { useState } from "react";
import Link from "next/link";
import classes from "./Header.module.css";
import { LOGO, NAV, SITE } from "@/lib/site";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Link href="/" className={classes.logo} onClick={() => setOpen(false)}>
          <img
            src={LOGO.mark.src}
            alt={SITE.name}
            width={LOGO.mark.width}
            height={LOGO.mark.height}
          />
        </Link>
        <button
          type="button"
          className={classes.toggle}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav id="site-nav" className={classes.nav} data-open={open}>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={item.href === "/contact" ? classes.contact : classes.link}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
