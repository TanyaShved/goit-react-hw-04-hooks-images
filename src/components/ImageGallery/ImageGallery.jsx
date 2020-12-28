import { useState, useEffect, useCallback, useRef } from 'react';
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

const ImageGallery = ({ imageName, onChangeImage }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);

  const prevPageRef = useRef();

  useEffect(() => {
    prevPageRef.current = page;
  });

  const prevPage = prevPageRef.current;
  console.log(prevPage);
  console.log(page);

  useEffect(() => {
    onChangeImage('');
  }, [onChangeImage]);

  const fetchImageGallery = useCallback(() => {
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
  }, [imageName, page]);

  useEffect(() => {
    if (!imageName) {
      return;
    }
    if (page === 1) {
      fetchImageGallery();
    }
    if (prevPage !== page) {
      fetchImageGallery();
    } else {
      setStatus(Status.PENDING);
      setImages([]);
      setPage(1);
    }
  }, [page, fetchImageGallery, imageName, prevPage]);

  // useEffect(() => {
  //   if (!imageName) {
  //      return;
  //   }
  //   if (prevPage !== page) {
  //     fetchImageGallery();
  //   }
  // }, [page, fetchImageGallery, imageName, prevPage])

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }, [images]);

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
  onChangeImage: PropTypes.func.isRequired,
};

export default ImageGallery;
