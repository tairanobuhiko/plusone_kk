import React, { useState } from "react";
import classes from "./ContactForm.module.css";
import StatusDialog from "./StatusDialog";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [inputError, setInputError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const onSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setInputError(
        "お名前、メールアドレス、お問い合わせ内容をすべて入力してください。"
      );
      return;
    }
    setInputError("");
    setIsLoading(true);
    setIsModalOpen(true);
    const failedMessage =
      "メッセージの送信に失敗しました。問い合わせ先にご連絡ください。（代表）027-212-8093";

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (response.ok) {
        setModalMessage("メッセージが送信されました。");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setModalMessage(failedMessage);
      }
    } catch (error) {
      console.log("エラーが発生しました", error);
      setModalMessage(failedMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <StatusDialog
        open={isModalOpen}
        onClose={handleClose}
        loading={isLoading}
        message={modalMessage}
      />
      <form className={classes.form} onSubmit={onSendMessage} noValidate>
        <div className={classes.row}>
          <div className={classes.field}>
            <label htmlFor="contact-name">お名前</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={classes.field}>
            <label htmlFor="contact-email">メールアドレス</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className={classes.field}>
          <label htmlFor="contact-message">お問い合わせ内容</label>
          <textarea
            id="contact-message"
            name="message"
            rows={8}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        {inputError && (
          <p className={classes.error} role="alert">
            {inputError}
          </p>
        )}
        <div className={classes.button}>
          <button className="btn btn-primary" type="submit">
            送信
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
