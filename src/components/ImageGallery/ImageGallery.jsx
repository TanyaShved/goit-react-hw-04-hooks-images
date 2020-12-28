import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import imagesAPI from '../../services/image-api';
import ImageGalleryItem from '../../components/ImageGalleryItem/ImageGalleryItem';
import Button from '../../components/Button/Button';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './ImageGallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const ImageGallery = ({ imageName, page, images, setImages, setPage }) => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (imageName === '') {
      return;
    }

    setStatus(Status.PENDING);

    const fetchImageGallery = () => {
      imagesAPI
        .fetchImages(imageName, page)
        .then(images => {
          if (images.hits.length !== 0) {
            setImages(prevImages => [...prevImages, ...images.hits]);
            setStatus(Status.RESOLVED);
            return;
          }
          return Promise.reject(
            new Error(`Нет галлереи с таким названием ${imageName}`),
          );
        })
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        });
    };
    if (imageName) {
      fetchImageGallery();
    }
  }, [page, setImages, imageName]);

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  });

  if (status === Status.IDLE) {
    return <h1>Ввидите название</h1>;
  }

  if (status === Status.PENDING) {
    return (
      <Loader
        type="Bars"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000}
      />
    );
  }

  if (status === Status.IDLE) {
    return <h1>Ввидите название</h1>;
  }

  if (status === Status.PENDING) {
    return (
      <Loader
        type="Bars"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000}
      />
    );
  }

  if (status === Status.REJECTED) {
    return <h1>{error.message}</h1>;
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        <ul className={s.ImageGallery}>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
            />
          ))}
        </ul>
        <Button onClick={() => setPage(page + 1)} />
      </>
    );
  }
};

ImageGallery.propTypes = {
  imageName: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  setImages: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default ImageGallery;
