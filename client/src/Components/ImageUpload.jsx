import { useState } from "react";
import axios from "axios";

const ImageUpload = ({ onUpload }) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("tags", tags);
    formData.append("image", image);

    const res = await axios.post("http://localhost:5000/api/images", formData);
    onUpload(res.data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Tags (comma-separated)" onChange={(e) => setTags(e.target.value)} required />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
      <button type="submit">Upload</button>
    </form>
  );
};

export default ImageUpload;
