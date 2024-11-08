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
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const canvasRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
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
  const startDragging = (e) => {
    setDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const stopDragging = () => {
    setDragging(false);
  };

  const onDrag = (e) => {
    if (dragging && dragStart) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;

      setTextPosition((prevPosition) => ({
        x: prevPosition.x + dx,
        y: prevPosition.y + dy,
      }));

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
      // Set canvas size to match the cropped area size
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      // Draw the cropped image onto the canvas
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
        React Photo Editor with Real-Time Text Editing
      </Typography>

      {/* Image Upload */}
      <Button
        variant="contained"
        color="primary"
        component="label"
        style={{ marginBottom: '20px' }}
      >
        Upload Image
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageUpload}
        />
      </Button>

      {/* Show editor if image is uploaded */}
      {image && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

          <div className='d-flex justify-content-center gap-4'>
            <Paper sx={{ padding: 2 }} style={{ width: '45%' }}>
              {/* Cropper */}
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

            {/* Display Image with Adjustments and Text */}
            <Paper sx={{ padding: 2, position: 'relative' }} style={{ width: '45%' }}>
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
                }}
                onMouseDown={startDragging}
                onMouseUp={stopDragging}
                onMouseMove={onDrag}
              >
                {text}
              </div>
            </Paper>
          </div>

          <div className='d-flex justify-content-center gap-4' style={{ width: '100%' }}>
            {/* Adjustments Section */}
            <Paper sx={{ padding: 2 }} style={{ width: '50%' }}>
              <Typography variant="h6">Adjustments</Typography>

              {/* Brightness Slider */}
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

              {/* Contrast Slider */}
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

              {/* Filter Select */}
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

            {/* Text Editor */}
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

              {/* Text Size */}
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

              {/* Text Color */}
              <Typography variant="body2" style={{ marginBottom: '10px' }}>
                Text Color
              </Typography>
              <ChromePicker
                color={textColor}
                onChange={(color) => setTextColor(color.hex)}
              />
            </Paper>
          </div>

          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </Box>
      )}
    </Container>
  );
}

export default PhotoEditor;
