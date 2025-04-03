import { useEffect, useState } from "react";
import axios from "axios";

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/images").then(res => setImages(res.data));
  }, []);

  return (
    <div className="gallery">
      {images.map(img => (
        <div key={img._id} className="image-card">
          <img src={img.imageUrl} alt={img.title} />
          <h3>{img.title}</h3>
          <p>{img.tags.join(", ")}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
