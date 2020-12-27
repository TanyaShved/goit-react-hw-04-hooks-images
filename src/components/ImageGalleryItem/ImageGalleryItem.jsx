import { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../components/Modal/Modal';
import s from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  static propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    const { webformatURL, largeImageURL, tags } = this.props;

    return (
      <>
        <li className={s.ImageGalleryItem}>
          <img
            onClick={this.toggleModal}
            src={webformatURL}
            alt={tags}
            className={s.ImageGalleryItem_image}
          />
          {showModal && (
            <Modal
              onClick={this.toggleModal}
              largeImageURL={largeImageURL}
              alt={tags}
            />
          )}
        </li>
      </>
    );
  }
}

export default ImageGalleryItem;
