import React, { useState } from "react";

const ImageToBinary = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("Base64 Image URL:", reader.result);
        setImage(reader.result); // Optional: Store the Base64 string in state
      };
      reader.readAsDataURL(file); // Convert file to Base64
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (image) {
      console.log("Submitted Base64 Image URL:", image);
    } else {
      console.log("No image selected.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ImageToBinary;
