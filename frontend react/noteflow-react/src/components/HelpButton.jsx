import React, { useState } from 'react';

export default function HelpButton() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button id="helpBtn" onClick={() => setShow(!show)}>?</button>
      <div className={`help-popup ${show ? 'show' : ''}`}>
        Besoin d'aide ? Contactez support@noteflow.com
      </div>
    </>
  );
}
