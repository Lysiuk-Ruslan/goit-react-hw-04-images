import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ images, toggleModal }) {
  // console.log(images);
  return images.map(({ id, webformatURL, tags }) => {
    return (
      <li className={css.ImageGalleryItem} key={id}>
        <img
          src={webformatURL}
          alt={tags}
          className={css.ImageGalleryItemImage}
          onClick={() => toggleModal(id)}
        />
      </li>
    );
  });
}

ImageGalleryItem.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
