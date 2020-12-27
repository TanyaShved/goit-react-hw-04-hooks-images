const API_KEY = '19013398-a980467a71ce13bd0d53bc132';
const BASE_URL = 'https://pixabay.com/api/';

function fetchImages(imageName, page) {
  return fetch(
    `${BASE_URL}?q=${imageName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Нет галлереи с таким названием ${imageName}`),
    );
  });
}

const api = { fetchImages };

export default api;
