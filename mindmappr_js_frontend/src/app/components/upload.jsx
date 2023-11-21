'use client'
import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  
  data.append("file", file);
  
  data.append("upload_preset", "avatar");

  try {
    const res = await axios.post("https://api.cloudinary.com/v1_1/duamefd9c/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    if (res.status === 200) {
      
      return res.data.url;
    } else {
      console.error("Upload failed. Response:", res);
      throw new Error("Upload failed");
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
    throw error;
  }
  
  
};

export default upload;