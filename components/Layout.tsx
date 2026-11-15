import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import OGP from "./OGP";
import classes from "./Layout.module.css";
import { bodyFont, impactFont } from "@/lib/fonts";
import { SITE } from "@/lib/site";

type Props = {
  title?: string;
  children: React.ReactNode;
};

// 全ページ共通の枠（Head、ヘッダー、本文、フッター）
const Layout = ({ title, children }: Props) => {
  const pageTitle = title
    ? `${title} | ${SITE.name}`
    : `${SITE.name} | 前橋のリフォーム・内装工事`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={SITE.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <OGP />
      </Head>
      <div
        className={`${bodyFont.className} ${impactFont.variable} ${classes.page}`}
      >
        <Header />
        <main className={classes.main}>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
