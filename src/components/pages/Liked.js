import React, { useState, useRef, useEffect } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from '@mui/material/Slider';

const ImageCropper = () => {
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [text, setText] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [textSize, setTextSize] = useState(20);
  const [textPosition, setTextPosition] = useState({ x: 20, y: 30 });
  const [textRotation, setTextRotation] = useState(0);
  const cropperRef = useRef(null);
  const canvasRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleCrop = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      const croppedCanvas = cropper.getCroppedCanvas();
      setCroppedImage(croppedCanvas.toDataURL());
    }
  };

  useEffect(() => {
    if (croppedImage) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = croppedImage;
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        ctx.font = `${textSize}px Arial`;
        ctx.fillStyle = textColor;
        ctx.save();
        ctx.translate(textPosition.x, textPosition.y);
        ctx.rotate((textRotation * Math.PI) / 180);
        ctx.fillText(text, 0, 0);
        ctx.restore();
      };
    }
  }, [croppedImage, text, textColor, textSize, textPosition, textRotation]);

  return (
    <div className="container my-4">
      <div className="mb-3">
        <input type="file" accept="image/*" onChange={handleImageChange} className="form-control" />
      </div>
      
    {image && (
        <div className="cropper-container mb-4">
          <Cropper
            src={image}
            ref={cropperRef}
            style={{ width: '100%', height: 400 }}
            aspectRatio={1}
            guides={false}
            autoCropArea={1}
          />
          <button onClick={handleCrop} className="btn btn-primary mt-3">Crop Image</button>
        </div>
      )}

      {croppedImage && (
        <div className="canvas-container text-center mb-4">
          <canvas
            ref={canvasRef}
            width={560}
            height={560}
            className="border"
          />
        </div>
      )}

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Text Color</label>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="form-control form-control-color"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Text Size</label>
          <Slider
            value={textSize}
            min={10}
            max={100}
            step={1}
            onChange={(e, newValue) => setTextSize(newValue)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Text Position X</label>
          <Slider
            value={textPosition.x}
            min={0}
            max={canvasRef.current ? canvasRef.current.width : 560}
            step={1}
            onChange={(e, newValue) => setTextPosition({ ...textPosition, x: newValue })}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Text Position Y</label>
          <Slider
            value={textPosition.y}
            min={0}
            max={canvasRef.current ? canvasRef.current.height : 560}
            step={1}
            onChange={(e, newValue) => setTextPosition({ ...textPosition, y: newValue })}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label">Rotation</label>
          <Slider
            value={textRotation}
            min={0}
            max={360}
            step={1}
            onChange={(e, newValue) => setTextRotation(newValue)}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
