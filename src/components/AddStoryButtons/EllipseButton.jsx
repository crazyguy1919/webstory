import React from "react";
import { Button } from 'react-bootstrap';
import { IoEllipseOutline } from "react-icons/io5";

const EllipseButton = () =>{

    const handleEllipseClick = () =>{
        console.log('Ellipse')
    }

    return(
        <>
        <Button className="tool-btn txt-icon" onClick={handleEllipseClick}>
            <IoEllipseOutline />
            Ellipse
        </Button>
        </>
    );
};

export default EllipseButton;