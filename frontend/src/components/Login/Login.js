import React, {useState} from "react";
import classes from "./Login.module.css";

function Login(props) {

 const [formState, setFormState] = useState({});

  return (
    <div className={classes.container}>
      <p>LOGIN FORM</p>
      <div className={classes.formElement}>
        <label htmlFor="USERNAME">USERNAME</label>
        <input type="text" id="USERNAME" className="text-box"/>
      </div>
      <div className={classes.formElement}>
        <label htmlFor="PHONE_NUMBER">PHONE NUMBER</label>
        <input type="text" id="PHONE_NUMBER" className="text-box"/>
      </div>
      <button className="add-btn">GET CODE</button>
    </div>
  );
}

export default Login;
