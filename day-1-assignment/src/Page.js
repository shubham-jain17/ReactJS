import Text from "./Text.js";
import Button from "./Button.js";
import InputText from "./InputText.js";
import { useState } from "react";


export default function Page() {
  const [msg, setmsg] = useState("");
  const [text, settext] = useState("");

  const name = "";

  function buttonClick() {
    settext(msg);
    setmsg("");
  }

  function inputChange(e) {
    setmsg(e.target.value);
  }

  return (
    <>
      <Text message={text}></Text>
      <Button label="Click here" handlClick={buttonClick}></Button>
      <InputText
        placeHolder="Your name"
        inputChange={inputChange}
        inputValue={msg}
      ></InputText>
    </>
  );
}
