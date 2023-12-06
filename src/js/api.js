import axios from 'axios';

const API_KEY = '23308675-3bdf2416796cf281a4ef874ab';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(value, page = 1) {
  const params = {
    key: API_KEY,
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 40,
  };

  const resp = await axios.get(`${BASE_URL}?key=${API_KEY}`, { params });
  return resp.data;
}
