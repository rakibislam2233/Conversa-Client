import axios from "axios";

const uploadToCloudinary = async (files) => {
  const CLOUD_NAME = "dwddmg323";
  const UPLOAD_PRESET = "my_preset";
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const uploadedUrls = [];

  for (let i = 0; i < files.length; i++) {
    const formData = new FormData();
    const file = files[i];
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await axios.post(url, formData);
      uploadedUrls.push(response.data.secure_url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  return uploadedUrls;
};

export default uploadToCloudinary;
