import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Searcbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';

const App = () => {
  const [imageName, setImageName] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);

  const onSearch = imageName => {
    setImageName(imageName);
    setImages([]);
    setPage(1);
  };

  return (
    <>
      <Searcbar onSubmit={onSearch} />
      <ImageGallery
        imageName={imageName}
        images={images}
        page={page}
        setImages={setImages}
        setPage={setPage}
      />
      <ToastContainer position="top-center" />
    </>
  );
};

export default App;
