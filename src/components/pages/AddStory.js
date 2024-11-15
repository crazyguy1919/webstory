import React, { useState, useRef, useEffect } from "react";
import { Container, Button, InputGroup, FormControl, Form, Dropdown } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import RectangleButton from "../AddStoryButtons/RectangleButton";
import EllipseButton from "../AddStoryButtons/EllipseButton";
import "../styles/AddStory.css";

import { IoIosClose } from "react-icons/io";
import { FaRegImages } from "react-icons/fa";
import { TbBackground } from "react-icons/tb";
import { SiGoogleanalytics } from "react-icons/si";
import { TbPhotoPlus } from "react-icons/tb";
import { IoText } from "react-icons/io5";
import { TbLayout } from "react-icons/tb";


const AddStory = () => {
  const [images, setImages] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imageWidth, setImageWidth] = useState(500);
  const [imageHeight, setImageHeight] = useState(500);
  const [rotation, setRotation] = useState(0);
  const [text, setText] = useState('');
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [isTextControlsVisible, setIsTextControlsVisible] = useState(false);
  const [isLayoutControlsVisible, setIsLayoutControlsVisible] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("white");
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState(30);
  const [isTextUnderlined, setIsTextUnderlined] = useState(false);
  const [link, setLink] = useState("");
  const [zIndex, setZIndex] = useState(1); 
  const [rectangles, setRectangles] = useState([]);
  const [ellipses, setEllipses] = useState([]);
  const [imageTexts, setImageTexts] = useState([]);
  const [imageTextPositions, setImageTextPositions] = useState([]);
  const [rectanglesPosition, setRectanglesPosition] = useState([]); // Store rectangle positions
  const [imageTextPosition, setImageTextPosition] = useState([]); // Store text position

  
  
  const canvasRef = useRef(null);


  const addRectangle = (rectProps) => {
    setRectangles((prevRectangles) => {
        const newRectangles = [...prevRectangles];
        if (!Array.isArray(newRectangles[activeImageIndex])) {
            newRectangles[activeImageIndex] = [];
        }
        newRectangles[activeImageIndex] = [
            ...newRectangles[activeImageIndex],
            { x: 50, y: 50, width: 100, height: 50, ...rectProps, isSelected: false }
        ];
        return newRectangles;
    });
};
const onRectangleClick = (event, index) => {
  const clickedRectangle = rectangles[activeImageIndex][index];

  const mouseX = event.clientX - canvasRef.current.getBoundingClientRect().left;
  const mouseY = event.clientY - canvasRef.current.getBoundingClientRect().top;

  if (
    mouseX >= clickedRectangle.x &&
    mouseX <= clickedRectangle.x + clickedRectangle.width &&
    mouseY >= clickedRectangle.y &&
    mouseY <= clickedRectangle.y + clickedRectangle.height
  ) {
    clickedRectangle.isSelected = !clickedRectangle.isSelected;
    clickedRectangle.color = clickedRectangle.isSelected ? "blue" : clickedRectangle.color;
    setRectangles([...rectangles]); 
  }
};

const onRectangleDrag = (event, index) => {
  const deltaX = event.movementX;
  const deltaY = event.movementY;
  
  setRectangles((prevRectangles) => {
    const updatedRectangles = [...prevRectangles];
    updatedRectangles[activeImageIndex][index] = {
      ...updatedRectangles[activeImageIndex][index],
      x: updatedRectangles[activeImageIndex][index].x + deltaX,
      y: updatedRectangles[activeImageIndex][index].y + deltaY,
    };
    return updatedRectangles;
  });
};

  
const onTextDrag = (event) => {
  const deltaX = event.movementX;
  const deltaY = event.movementY;
  handleTextMove(deltaX, deltaY);  
};
  

  const handleRectangleMove = (index, deltaX, deltaY) => {
    setRectangles((prevRectangles) => {
      const updatedRectangles = [...prevRectangles];
      updatedRectangles[activeImageIndex][index] = {
        ...updatedRectangles[activeImageIndex][index],
        x: updatedRectangles[activeImageIndex][index].x + deltaX,
        y: updatedRectangles[activeImageIndex][index].y + deltaY,
      };
      return updatedRectangles;
    });
  };
  
  const handleTextMove = (deltaX, deltaY) => {
    setImageTextPosition((prevPosition) => ({
      x: prevPosition.x + deltaX,
      y: prevPosition.y + deltaY,
    }));
  };

  
  const addEllipse = () => {
    setEllipses((prevEllipses) => {
      const newEllipses = [...prevEllipses];
  
      if (!Array.isArray(newEllipses[activeImageIndex])) {
        newEllipses[activeImageIndex] = [];
      }
  
      newEllipses[activeImageIndex] = [
        ...newEllipses[activeImageIndex],
        { x: 100, y: 100, radiusX: 50, radiusY: 25, color: "green" }
      ];
  
      return newEllipses;
    });
  };


  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onload = () => resolve({ src: reader.result, rotation: 0 });
      });
    });

    Promise.all(newImages).then((loadedImages) => {
      setImages((prevImages) => [...prevImages, ...loadedImages]);
    
      setRectangles((prevRectangles) => [
        ...prevRectangles,
        ...Array(loadedImages.length).fill([]) 
      ]);
    
      setEllipses((prevEllipses) => [
        ...prevEllipses,
        ...Array(loadedImages.length).fill([]) 
      ]);
    
      setImageTexts((prevTexts) => [
        ...prevTexts,
        ...Array(loadedImages.length).fill('') 
      ]);
    
      setImageTextPositions((prevPositions) => [
        ...prevPositions,
        ...Array(loadedImages.length).fill({ x: 0, y: 0 }) 
      ]);
    
      if (activeImageIndex === null) setActiveImageIndex(0);
    });
  };
    
  

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  useEffect(() => {
    if (canvasRef.current && images.length > 0 && activeImageIndex !== null) {
      const ctx = canvasRef.current.getContext("2d");
      const activeImage = images[activeImageIndex];
      const img = new Image();
  
      img.onload = () => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  
        ctx.save();
        ctx.translate(canvasRef.current.width / 2, canvasRef.current.height / 2);
        ctx.rotate((activeImage.rotation * Math.PI) / 180);
        ctx.drawImage(img, -imageWidth / 2, -imageHeight / 2, imageWidth, imageHeight);
  
        
        if (Array.isArray(rectangles[activeImageIndex])) {
          rectangles[activeImageIndex].forEach((rect, index) => {
            ctx.globalAlpha = rect.transparency;
  ctx.fillStyle = rect.isSelected ? "blue" : rect.color;  
  ctx.lineJoin = 'round';
  ctx.lineWidth = 3;
  ctx.strokeStyle = rect.isSelected ? "yellow" : rect.border; 
  ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
  ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
          });
        }
        
  
        
        if (isTextVisible && imageTexts[activeImageIndex]) {
          ctx.fillStyle = textColor;
          ctx.font = `${fontSize}px ${fontFamily}`;
          if (isTextUnderlined) {
            ctx.textDecoration = "underline";
          }
          ctx.fillText(imageTexts[activeImageIndex], imageTextPositions[activeImageIndex].x, imageTextPositions[activeImageIndex].y);
        }
        
  
        ctx.restore();
      };
  
      img.src = activeImage.src;
    }
  }, [
    images, activeImageIndex, imageWidth, imageHeight, rotation, text, fontSize, fontFamily,
    isTextVisible, backgroundColor, textColor, isTextUnderlined, link, imageTextPositions, rectangles, ellipses
  ]);
  
  
  
  

  

  const handleRotationChange = (direction) => {
    if (activeImageIndex !== null) {
      setImages((prevImages) =>
        prevImages.map((img, index) =>
          index === activeImageIndex
            ? { ...img, rotation: img.rotation + direction * 10 }
            : img
        )
      );
    }
  };

  const handleResize = (width, height) => {
    setImageWidth(width);
    setImageHeight(height);
  };

  const handleBackgroundColorChange = (color) => {
    if (/^#[0-9A-F]{6}$/i.test(color)) {  
      setBackgroundColor(color);
    } else {
      console.warn("Invalid background color format, please use a hex color (e.g., #FFFFFF).");
    }
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setImageTexts((prevTexts) => {
      const newTexts = [...prevTexts];
      newTexts[activeImageIndex] = newText;  
      return newTexts;
    });
  };
  
  const handleTextVisibility = () => {
    setIsTextVisible((prev) => !prev);
  };

  const handleTextColorChange = (e) => {
    const color = e.target.value;
    if(/^#[0-9A-F]{6}$/i.test(color)) {  
      setTextColor(color);
    } else {
      console.warn("Invalid color format, please use a hex color (e.g., #FF5733).");
    }
};

  const handleFontChange = (e) => {
    setFontFamily(e.target.value);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const handleUnderscoreToggle = () => {
    setIsTextUnderlined(!isTextUnderlined);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleSendBack = (index) => {
    setRectangles((prevRectangles) => {
      const newRectangles = [...prevRectangles];
      const [movedRect] = newRectangles.splice(index, 1);
      newRectangles.unshift(movedRect);  
      return newRectangles;
    });
  };

  const handleBringFront = (index) => {
    setRectangles((prevRectangles) => {
      const newRectangles = [...prevRectangles];
      const [movedRect] = newRectangles.splice(index, 1);
      newRectangles.push(movedRect);  
      return newRectangles;
    });
  };

  const handleDeleteText = () => {
    setText('');
    setIsTextVisible(false);
  };

  const handleApplyText = () => {
    setIsTextVisible(true);
  };

  const handleMouseDown = (e) => {
    if (activeImageIndex === null || !imageTextPositions[activeImageIndex]) {
      console.log("activeImageIndex:", activeImageIndex);
      console.log("imageTextPositions:", imageTextPositions);
      console.log("imageTextPositions[activeImageIndex]:", imageTextPositions[activeImageIndex]);
      return; 
    }
  
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - canvasRect.left;
    const mouseY = e.clientY - canvasRect.top;
  
    const offsetX = mouseX - imageTextPositions[activeImageIndex].x;
    const offsetY = mouseY - imageTextPositions[activeImageIndex].y;
  
    
    const mouseMove = (moveEvent) => {
      const moveX = moveEvent.clientX - canvasRect.left;
      const moveY = moveEvent.clientY - canvasRect.top;
  
      setRectangles((prevRectangles) =>
        prevRectangles.map((rect, index) => {
          if (
            mouseX >= rect.x && 
            mouseX <= rect.x + rect.width &&
            mouseY >= rect.y && 
            mouseY <= rect.y + rect.height
          ) {
            return { ...rect, isSelected: true };
          }
          return { ...rect, isSelected: false };
        })
      );
  
      
      setImageTextPositions((prevPositions) => {
        const newPositions = [...prevPositions];
        newPositions[activeImageIndex] = {
          x: moveX - offsetX,
          y: moveY - offsetY,
        };
        return newPositions;
      });
    };
  
    
    const mouseUp = () => {
      canvasRef.current.removeEventListener("mousemove", mouseMove);
      canvasRef.current.removeEventListener("mouseup", mouseUp);
    };
  
    
    canvasRef.current.addEventListener("mousemove", mouseMove);
    canvasRef.current.addEventListener("mouseup", mouseUp);
  };
  
  

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImageTexts((prevTexts) => prevTexts.filter((_, i) => i !== index));
    if (activeImageIndex === index) {
      setActiveImageIndex(null);
    }
  };

  return (
    <Container className="add-story-container d-flex">
      <div className="story-bts">
        <Button variant="outline-primary" className="txt-icon">
          <FaRegImages size={24}/>
          <span>Images</span>
        </Button>
        <Button variant="outline-primary" className="txt-icon">
          <TbBackground />
          <span>Background</span>
        </Button>
        <Button variant="outline-primary" className="txt-icon">
          <SiGoogleanalytics />
          <span>Analytics</span>
        </Button>

      
      </div>
      <div className="pt-4">
        <h5 className="pt-0 sidebar-addstory">Choose Source to</h5>
        <p className="add-photos">Add Photos</p>
        
        <div {...getRootProps()} className="upload-area">
          <input {...getInputProps()} />
          <button type="button" className="upload-btn1">Upload Images</button>
          
        </div>
        <p className="or-text">Or</p>
        <p className="drag-drop">Drag and Drop</p>

        

        {isTextControlsVisible && (
          <div>
            <Form.Control
              type="text"
              placeholder="Enter text here"
              value={imageTexts[activeImageIndex]}
              onChange={handleTextChange}
            />
            <Button onClick={handleTextVisibility}>
              {isTextVisible ? "Hide Text" : "Add Text"}
            </Button>
            <InputGroup className="mt-3">
              <FormControl
                type="color"
                value={textColor}
                onChange={handleTextColorChange}
              />
            </InputGroup>

       
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {fontFamily}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setFontFamily("Arial")}>Arial</Dropdown.Item>
                <Dropdown.Item onClick={() => setFontFamily("Calibri")}>Calibri</Dropdown.Item>
                <Dropdown.Item onClick={() => setFontFamily("Times New Roman")}>Times New Roman</Dropdown.Item>
                <Dropdown.Item onClick={() => setFontFamily("Courier New")}>Courier New</Dropdown.Item>
                <Dropdown.Item onClick={() => setFontFamily("Reggae one")}>Reggae one</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

        
            <InputGroup>
              <FormControl
                type="number"
                value={fontSize}
                onChange={handleFontSizeChange}
                min="10"
                max="100"
                step="1"
              />
              <InputGroup.Text>{fontSize}px</InputGroup.Text>
            </InputGroup>

           
            <Button onClick={handleUnderscoreToggle}>
              {isTextUnderlined ? "Remove Underline" : "Underline"}
            </Button>

         
            <Form.Control
              type="text"
              placeholder="Add link (optional)"
              value={link}
              onChange={handleLinkChange}
            />

       
            <Button onClick={handleSendBack}>Send Back</Button>
            <Button onClick={handleBringFront}>Bring Front</Button>
            <Button onClick={handleDeleteText}>Delete Text</Button>
            <Button onClick={handleApplyText}>Apply</Button>
          </div>
        )}

        {isLayoutControlsVisible && (
          <div>
            <Button onClick={() => handleRotationChange(1)}>Rotate +</Button>
            <Button onClick={() => handleRotationChange(-1)}>Rotate -</Button>
            <Button onClick={() => handleResize(imageWidth + 20, imageHeight + 20)}>Resize +</Button>
            <Button onClick={() => handleResize(imageWidth - 20, imageHeight - 20)}>Resize -</Button>
            <InputGroup className="mt-3">
              <FormControl
                type="color"
                value={backgroundColor}
                onChange={(e) => handleBackgroundColorChange(e.target.value)}
                placeholder="Background Color"
              />
            </InputGroup>
          </div>
        )}
      </div>
      

      <div className="main-frame d-block pt-4">
        <div className="preview-frame">
          {images.length > 0 ? (
            <canvas
              ref={canvasRef}
              width={500}
              height={500}
              style={{ backgroundColor, zIndex }}
              onMouseDown={handleMouseDown}
            />
          ) : (
            <p>Upload Images to Preview</p>
          )}


        </div>
        <div className="image-thumbnails">
        {images.map((img, index) => (
          <div key={index} style={{ position: "relative" }}>
            <img
              src={img.src}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setActiveImageIndex(index)}
              style={{
                border: activeImageIndex === index ? "1px solid red" : "1px solid #222",
                cursor: "pointer",
                width: 80,
                borderRadius: 5,
                height: 100,
              }}
            />
            <Button
              variant="danger"
              size="sm"
              className="remove"
              onClick={() => handleRemoveImage(index)}
            >
      
              <IoIosClose size={22} />
           
            </Button>
          </div>
        ))}
        
      </div>
      </div>

      

      <div className="toolbar pt-4">
        <Button className="tool-btn txt-icon"><TbPhotoPlus /> Photo</Button>
        <Button className="tool-btn txt-icon" onClick={() => setIsTextControlsVisible(!isTextControlsVisible)}>
          <IoText />
          Text
        </Button>
        
        <Button className="tool-btn txt-icon" onClick={() => setIsLayoutControlsVisible(!isLayoutControlsVisible)}>
          <TbLayout />
          Layout
        </Button>
        <RectangleButton onClick={() => addRectangle({ color: "red", transparency: 0.5 })} />

        <EllipseButton onClick={addEllipse} />
      </div>

      

      
    </Container>
  );
};

export default AddStory;
