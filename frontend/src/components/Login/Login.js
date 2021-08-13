import React, { useState } from "react";
import classes from "./Login.module.css";
import axios from "./../../utils/axios";

function Login(props) {
  const [formState, setFormState] = useState({
    username: "",
    phoneNumber: "",
    code: "",
  });

  const [codeRecieved, setCodeRecieved] = useState(false);

  const onChangeHandler = (event) => {
    const formStateClone = { ...formState };
    formStateClone[event.target.name] = event.target.value;
    setFormState(formStateClone);
  };

  const buttonClickHandler = async () => {
    if (!codeRecieved) {
      await axios.post("/login", {
        to: formState.phoneNumber,
        channel: "sms",
      });
      setCodeRecieved(true);
    } else {
      await axios.post("/verify", {
        to: formState.phoneNumber,
        code: formState.code,
      });
    }
  };

  return (
    <div className={classes.container}>
      <p>LOGIN FORM</p>
      <div className={classes.formElement}>
        <label htmlFor="USERNAME">USERNAME</label>
        <input
          type="text"
          id="USERNAME"
          className="text-box"
          name="username"
          onChange={onChangeHandler}
          value={formState.username}
        />
      </div>
      <div className={classes.formElement}>
        <label htmlFor="PHONE_NUMBER">PHONE NUMBER</label>
        <input
          type="text"
          id="PHONE_NUMBER"
          className="text-box"
          name="phoneNumber"
          onChange={onChangeHandler}
          value={formState.phoneNumber}
        />
      </div>
      {codeRecieved && (
        <div className={classes.formElement}>
          <label htmlFor="ENTER_CODE">ENTER CODE</label>
          <input
            type="text"
            id="ENTER_CODE"
            className="text-box"
            name="code"
            onChange={onChangeHandler}
            value={formState.code}
          />
        </div>
      )}
      <button className="add-btn" onClick={buttonClickHandler}>
        {codeRecieved ? "VERIFY THE CODE" : "GET CODE"}
      </button>
    </div>
  );
}

export default Login;
