import axios from 'axios';
import FormData from 'form-data';

export const uploadImage = async (req, res) => {
  try {
    const formData = new FormData();
    formData.append('image', req.file.buffer.toString('base64'));

    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      formData,
      { headers: formData.getHeaders() }
    );

    res.status(200).json({ imageUrl: response.data.data.url });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
};
