import React, { useState } from "react";

export const App = () => {
  const [img, setImg] = useState("");
  const [qr, setQr] = useState("");
  const [size, setSize] = useState(150);

async function generateQR() {
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qr)}`;
      setImg(url);
    } catch (error) {
      console.error("Error generating QR code", error);
    }
  }

  function qrdownload() {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  }

  return (
    <div className="appcontainer">
      <h1>QR Code Generator</h1>
      {img && <img src={img} className="qr" alt="QR Code" />}
      <br></br>
      <div>
        <label htmlFor="datainput" className="inputlabel">
          Data for QR code:
        </label>
        <input
          type="text"
          id="datainput"
          placeholder="Enter data for QR code"
          onChange={(e) => setQr(e.target.value)}
        />
        <br />
        <label htmlFor="imageinput" className="inputlabel">
          Image size:
        </label>
        <input
          type="text"
          id="imageinput"
          placeholder="Enter image size"
          onChange={(e) => setSize(e.target.value)}
        />
        <button className="generate" onClick={generateQR}>🚀 Generate QR Code
        </button>
        <button className="download" onClick={qrdownload} disabled={!img}>📥 Download QR Code</button>
         
      </div>
    </div>
  );
};

export default App;
