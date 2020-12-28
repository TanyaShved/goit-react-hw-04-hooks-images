import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../components/Modal/Modal';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  return (
    <>
      <li className={s.ImageGalleryItem}>
        <img
          onClick={toggleModal}
          src={webformatURL}
          alt={tags}
          className={s.ImageGalleryItem_image}
        />
        {showModal && (
          <Modal
            onClick={toggleModal}
            largeImageURL={largeImageURL}
            alt={tags}
          />
        )}
      </li>
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
