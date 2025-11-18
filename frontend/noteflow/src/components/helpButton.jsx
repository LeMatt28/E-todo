import { useState } from "react";

// bouton aide popup
export default function HelpButton() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button id="helpBtn" onClick={() => setShow(!show)}>?</button>
      <div className={`help-popup ${show ? "show" : ""}`}>
        Besoin d'aide ? Contactez support@noteflow.com
      </div>
    </>
  );
}