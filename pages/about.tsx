import React from "react";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import classes from "@/styles/About.module.css";
import { LOGO, SITE } from "@/lib/site";

export default function About() {
  return (
    <Layout title="会社概要">
      <div className={classes.head}>
        <div className="container">
          <img
            src={LOGO.mark.src}
            alt={SITE.name}
            width={LOGO.mark.width}
            height={LOGO.mark.height}
            className={classes.logo}
          />
          <h1 className={classes.page_title}>会社案内</h1>
        </div>
      </div>

      <div className={`container ${classes.body}`}>
        <Reveal>
          <section className={classes.block}>
            <h2 className={classes.title}>代表挨拶</h2>
            <div className={classes.message}>
              現在、建築・内装工事全般を軸に一般リフォーム請負工事や住宅、店舗建築、現場管理やメンテナンス業務など様々な分野で活動を行っております。
              <br />
              培った技術で創意工夫を追求し、安心・安全に基づいた価値を提供できるよう日々精進しております。
              <br />
              ひとと人との出会いから、心の通うコミュニケーションを大切に末永いお付き合いを心がけております。
              <span className={classes.signature}>
                Plus One株式会社　代表取締役 平 博隆
              </span>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className={classes.block}>
            <h2 className={classes.title}>会社概要</h2>
            <table className={classes.table}>
              <tbody>
                <tr>
                  <th>会社名</th>
                  <td>Plus One株式会社</td>
                </tr>
                <tr>
                  <th>住所</th>
                  <td>
                    〒371-0224
                    <br />
                    群馬県前橋市河原浜町705-9
                  </td>
                </tr>
                <tr>
                  <th>TEL</th>
                  <td>027-212-8093</td>
                </tr>
                <tr>
                  <th>FAX</th>
                  <td>027-212-8049</td>
                </tr>
                <tr>
                  <th>MOBILE</th>
                  <td>070-4128-6043</td>
                </tr>
                <tr>
                  <th>MAIL</th>
                  <td>t.plus-one@outlook.com</td>
                </tr>
                <tr>
                  <th>代表取締役</th>
                  <td>平 博隆</td>
                </tr>
                <tr>
                  <th>資本金</th>
                  <td>3,000,000円</td>
                </tr>
                <tr>
                  <th>設立</th>
                  <td>2016年7月</td>
                </tr>
                <tr>
                  <th>主な事業内容</th>
                  <td>
                    建築工事業
                    <br />
                    内装仕上工事業
                    <ul>
                      <li>一般リフォーム請負工事</li>
                      <li>住宅・店舗建築全般</li>
                      <li>現場管理</li>
                      <li>メンテナンス業務</li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <th>免許登録</th>
                  <td>
                    二級建築士
                    <br />
                    2級建築施工管理技士
                    <br />
                    一般建設業 / 群馬県知事 許可 (般-1) 第25281号
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </Reveal>
      </div>
    </Layout>
  );
}
