import React from "react";
import classes from "./StatusDialog.module.css";

type Props = {
  open: boolean;
  loading: boolean;
  message: string;
  onClose: () => void;
};

// 送信中と送信結果を知らせる小さな窓
const StatusDialog = ({ open, loading, message, onClose }: Props) => {
  if (!open) return null;

  return (
    <div className={classes.backdrop}>
      <div
        className={classes.dialog}
        role="dialog"
        aria-modal="true"
        aria-live="polite"
      >
        {loading ? (
          <>
            <div className={classes.spinner} aria-hidden="true" />
            <p>送信しています</p>
          </>
        ) : (
          <>
            <p>{message}</p>
            <button type="button" className="btn btn-primary" onClick={onClose}>
              閉じる
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default StatusDialog;
