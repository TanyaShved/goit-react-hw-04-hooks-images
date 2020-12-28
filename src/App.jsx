import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Searcbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';

const App = () => {
  const [imageName, setImageName] = useState('');

  return (
    <>
      <Searcbar onSubmit={setImageName} />
      <ImageGallery imageName={imageName} onChangeImage={setImageName} />
      <ToastContainer position="top-center" />
    </>
  );
};

export default App;
