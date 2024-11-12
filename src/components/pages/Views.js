import React, { useState, useCallback, useRef } from 'react';
import Cropper from 'react-easy-crop';
import ImageFilter from 'react-image-filter';
import Slider from '@mui/material/Slider';
import { ChromePicker } from 'react-color';
import { Button, Container, Grid, Box, Typography, Paper, TextField } from '@mui/material';

function PhotoEditor() {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [filter, setFilter] = useState(0);
  const [text, setText] = useState('');
  const [textColor, setTextColor] = useState('#ffffff');
  const [textSize, setTextSize] = useState(24);
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const [rotation, setRotation] = useState(0);
  const [draggingText, setDraggingText] = useState(false); // For text dragging
  const [draggingImage, setDraggingImage] = useState(false); // For image dragging
  const [dragStart, setDragStart] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [newImage, setNewImage] = useState(null); // New state for the 120px image
  const [imagePosition, setImagePosition] = useState({ x: 50, y: 50 }); // Position of the new image

  const canvasRef = useRef(null);
  const imageContainerRef = useRef(null); // Ref for the image container

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleNewImageUpload = (event) => { // Handle upload for new image (120px)
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setNewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const filterOptions = [
    [],
    ['grayscale'],
    ['sepia'],
    ['invert'],
    ['hue-rotate', 180],
    ['brightness', 1.5],
  ];

  // Text dragging functions
  const startDraggingText = (e) => {
    setDraggingText(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const stopDraggingText = () => {
    setDraggingText(false);
  };

  const onDragText = (e) => {
    if (draggingText && dragStart && imageContainerRef.current) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;

      // Get container dimensions
      const containerRect = imageContainerRef.current.getBoundingClientRect();

      setTextPosition((prevPosition) => {
        // Calculate new position for text dragging
        const newX = prevPosition.x + dx;
        const newY = prevPosition.y + dy;

        // Restrict text to the container bounds
        const boundedX = Math.min(
          Math.max(newX, 0),
          imageContainerRef.current.offsetWidth - textSize
        );
        const boundedY = Math.min(
          Math.max(newY, 0),
          imageContainerRef.current.offsetHeight - textSize
        );

        return { x: boundedX, y: boundedY };
      });

      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  // Image dragging functions
  const startDraggingImage = (e) => {
    setDraggingImage(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const stopDraggingImage = () => {
    setDraggingImage(false);
  };

  const onDragImage = (e) => {
    if (draggingImage && dragStart && imageContainerRef.current) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;

      // Get container dimensions
      const containerRect = imageContainerRef.current.getBoundingClientRect();

      setImagePosition((prevPosition) => {
        // Calculate new position
        const newX = prevPosition.x + dx;
        const newY = prevPosition.y + dy;

        // Restrict to container bounds
        const boundedX = Math.min(
          Math.max(newX, 0),
          containerRect.width - 120 // Ensure image stays inside container width
        );
        const boundedY = Math.min(
          Math.max(newY, 0),
          containerRect.height - 120 // Ensure image stays inside container height
        );

        return { x: boundedX, y: boundedY };
      });

      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createCroppedImage = useCallback(async () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = image;

    img.onload = () => {
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        img,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      setCroppedImage(canvas.toDataURL());
    };
  }, [croppedAreaPixels, image]);

  return (
    <Container maxWidth="lg" style={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Photo Editor
      </Typography>

      <Button
        variant="contained"
        color="primary"
        component="label"
        style={{ marginBottom: '20px' }}
      >
        Upload Image for Cropping
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageUpload}
        />
      </Button>

      <Button
        variant="contained"
        color="secondary"
        component="label"
        style={{ marginBottom: '20px' }}
      >
        Upload 120px Image
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleNewImageUpload}
        />
      </Button>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div className="d-flex justify-content-center gap-4">
          <Paper sx={{ padding: 2 }} style={{ width: '45%' }}>
            <div style={{ position: 'relative', width: '100%', height: 400 }}>
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <Button onClick={createCroppedImage} variant="contained" color="secondary" style={{ marginTop: '20px' }}>
              Apply Crop
            </Button>
          </Paper>

          <Paper sx={{ padding: 2 }} style={{ width: '50%' }}>
            <Typography variant="h6">Adjustments</Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3}>
                <Typography variant="body2">Brightness</Typography>
              </Grid>
              <Grid item xs={9}>
                <Slider
                  value={brightness}
                  min={0.5}
                  max={2}
                  step={0.1}
                  onChange={(e, value) => setBrightness(value)}
                  style={{ width: '100%' }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3}>
                <Typography variant="body2">Contrast</Typography>
              </Grid>
              <Grid item xs={9}>
                <Slider
                  value={contrast}
                  min={0.5}
                  max={2}
                  step={0.1}
                  onChange={(e, value) => setContrast(value)}
                  style={{ width: '100%' }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3}>
                <Typography variant="body2">Filter</Typography>
              </Grid>
              <Grid item xs={9}>
                <select
                  onChange={(e) => setFilter(e.target.value)}
                  style={{ width: '100%', padding: '8px' }}
                >
                  <option value={0}>None</option>
                  <option value={1}>Grayscale</option>
                  <option value={2}>Sepia</option>
                  <option value={3}>Invert</option>
                  <option value={4}>Hue Rotate</option>
                  <option value={5}>High Brightness</option>
                </select>
              </Grid>
            </Grid>
          </Paper>
        </div>

        <div className="d-flex justify-content-center gap-4" style={{ width: '100%' }}>
          <Paper sx={{ padding: 2, position: 'relative' }} style={{ width: '45%' }} ref={imageContainerRef}>
            {croppedImage ? (
              <ImageFilter
                image={croppedImage}
                filters={filterOptions[filter]}
                brightness={brightness}
                contrast={contrast}
                style={{ width: '100%', height: 'auto' }}
              />
            ) : (
              <Typography variant="body1" color="textSecondary">
                Apply crop to preview here
              </Typography>
            )}
            {text && (
              <div
                style={{
                  position: 'absolute',
                  top: textPosition.y,
                  left: textPosition.x,
                  color: textColor,
                  fontSize: `${textSize}px`,
                  fontWeight: 'bold',
                  cursor: 'move',
                  userSelect: 'none',
                  transform: `rotate(${rotation}deg)`,
                }}
                onMouseDown={startDraggingText}
                onMouseUp={stopDraggingText}
                onMouseMove={onDragText}
              >
                {text}
              </div>
            )}
            {newImage && (
              <img
                src={newImage}
                alt="New 120px Image"
                style={{
                  position: 'absolute',
                  top: imagePosition.y,
                  left: imagePosition.x,
                  width: '120px',
                  height: '120px',
                  cursor: 'move', // Show drag cursor
                }}
                onMouseDown={startDraggingImage}
                onMouseUp={stopDraggingImage}
                onMouseMove={onDragImage}
              />
            )}
          </Paper>

          <Paper sx={{ padding: 2 }} style={{ width: '50%' }}>
            <Typography variant="h6">Edit Text</Typography>
            <TextField
              label="Enter Text"
              variant="outlined"
              fullWidth
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{ marginBottom: '20px' }}
            />
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3}>
                <Typography variant="body2">Text Size</Typography>
              </Grid>
              <Grid item xs={9}>
                <Slider
                  value={textSize}
                  min={10}
                  max={100}
                  step={1}
                  onChange={(e, value) => setTextSize(value)}
                  style={{ width: '100%' }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3}>
                <Typography variant="body2">Rotation</Typography>
              </Grid>
              <Grid item xs={9}>
                <Slider
                  value={rotation}
                  min={0}
                  max={360}
                  step={1}
                  onChange={(e, value) => setRotation(value)}
                  style={{ width: '100%' }}
                />
              </Grid>
            </Grid>
            <Typography variant="body2" style={{ marginBottom: '10px' }}>
              Text Color
            </Typography>
            <ChromePicker color={textColor} onChange={(color) => setTextColor(color.hex)} />
          </Paper>
        </div>

        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </Box>
    </Container>
  );
}

export default PhotoEditor;
