import React, { useState, useRef } from "react";

const InstagramStyleUploader = () => {
  const [image, setImage] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [text, setText] = useState("Add your text");
  const [textColor, setTextColor] = useState("#ffffff");
  const canvasRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRotation = () => {
    setRotation((prevRotation) => prevRotation + 90);
  };

  const handleDownloadImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = image;

    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(
        img,
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
      );
      ctx.restore();

      // Draw text
      ctx.fillStyle = textColor;
      ctx.font = "24px Arial";
      ctx.textAlign = "center";
      ctx.fillText(text, canvas.width / 2, canvas.height - 30);

      // Download canvas image
      const link = document.createElement("a");
      link.download = "instagram-style-image.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
  };

  return (
    <div style={styles.container}>
      <h2>Instagram-Style Image Uploader</h2>

      <input type="file" onChange={handleImageUpload} accept="image/*" />
      <button onClick={handleRotation}>Rotate</button>

      <input
        type="text"
        placeholder="Add your text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={styles.textInput}
      />
      <input
        type="color"
        value={textColor}
        onChange={(e) => setTextColor(e.target.value)}
      />

      <div style={styles.preview}>
        {image && (
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            style={{ transform: `rotate(${rotation}deg)` }}
          ></canvas>
        )}
      </div>

      <button onClick={handleDownloadImage}>Download Image</button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
  },
  textInput: {
    marginTop: "10px",
    padding: "8px",
    fontSize: "16px",
    width: "100%",
  },
  preview: {
    marginTop: "20px",
    border: "1px solid #ccc",
    width: "300px",
    height: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default InstagramStyleUploader;
