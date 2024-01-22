import React from "react";

import styles from "./styles.module.scss";

const StyledCheckbox = ({
  input,
  label,
  type,
  meta: { touched, error },
  half,
}) => (
  <div
    style={{
      width: half ? "50%" : "100%",
      display: "inline-block",
      padding: "0 0.3rem",
    }}
  >
    <label className={styles.clickable}>
      <input {...input} type={type} className={styles.fieldInput} />
      <span className={styles.fieldLabel}>{label}</span>
      {touched && error && <span className={styles.fieldError}>{error}</span>}
    </label>
  </div>
);

export default StyledCheckbox;
