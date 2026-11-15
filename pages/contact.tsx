import React from "react";
import Layout from "@/components/Layout";
import ContactForm from "@/components/ContactForm";
import classes from "@/styles/About.module.css";
import { SITE } from "@/lib/site";

export default function Contact() {
  return (
    <Layout title="お問い合わせ">
      <div className={classes.head}>
        <div className="container">
          <h1 className={classes.page_title}>お問い合わせ</h1>
          <p className={classes.lead}>
            下のフォームか、お電話（{SITE.tel}）でご連絡ください。
          </p>
        </div>
      </div>
      <div className={`container ${classes.body}`}>
        <ContactForm />
      </div>
    </Layout>
  );
}
