import React, { useState } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { MdOutlineRectangle } from "react-icons/md";


const RectangleButton = () => {
    const [rectangles, setRectangles] = useState([]); // State for storing rectangles
    const [showControls, setShowControls] = useState(false);
    const [color, setColor] = useState("blue");
    const [transparency, setTransparency] = useState(1);
    const [border, setBorder] = useState("none");
    const [cornerRadius, setCornerRadius] = useState(0);

    // Function to handle adding a new rectangle
    const handleAddRectangle = () => {
        const newRectangle = {
            color,
            transparency,
            border,
            cornerRadius,
        };
        setRectangles((prevRectangles) => [...prevRectangles, newRectangle]);
    };

    return (
        <>
            {/* Rectangle Button to show controls */}
            <Button className="tool-btn txt-icon" onClick={() => setShowControls(!showControls)}>
                <MdOutlineRectangle size={24} />
                <span>Rectangle</span>
            </Button>

            {/* Rectangle customization controls */}
            {showControls && (
                <div className="rectangle-controls">
                    <InputGroup className="mb-2">
                        <FormControl type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                    </InputGroup>

                    <InputGroup className="mb-2">
                        <FormControl
                            type="number"
                            min="0"
                            max="1"
                            step="0.1"
                            value={transparency}
                            onChange={(e) => setTransparency(parseFloat(e.target.value))}
                            placeholder="Transparency"
                        />
                    </InputGroup>

                    <InputGroup className="mb-2">
                        <FormControl
                            type="text"
                            value={border}
                            onChange={(e) => setBorder(e.target.value)}
                            placeholder="Border Style (e.g., solid)"
                        />
                    </InputGroup>

                    <InputGroup className="mb-2">
                        <FormControl
                            type="number"
                            value={cornerRadius}
                            onChange={(e) => setCornerRadius(parseFloat(e.target.value))}
                            placeholder="Corner Radius"
                        />
                    </InputGroup>

                    <Button onClick={handleAddRectangle} variant="outline-success">
                        Add Rectangle
                    </Button>
                </div>
            )}

            {/* Canvas to render rectangles */}
            <div className="canvas">
                {rectangles.map((rect, index) => (
                    <div
                        key={index}
                        style={{
                            width: 100,
                            height: 50,
                            backgroundColor: rect.color,
                            opacity: rect.transparency,
                            border: `2px ${rect.border} black`,
                            borderRadius: rect.cornerRadius,
                            margin: "10px",
                        }}
                    />
                ))}
            </div>
        </>
    );
};

export default RectangleButton;
