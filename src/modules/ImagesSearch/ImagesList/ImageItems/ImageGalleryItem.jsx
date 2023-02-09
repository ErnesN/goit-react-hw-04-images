import PropTypes from 'prop-types';

import styles from './image-gallery-item.module.scss';

const ImageGalleryItem = ({ items, showImage }) => {
  return items.map(({ id, webformatURL, largeImageURL, tags }) => (
    <li
      onClick={() => showImage({ largeImageURL, tags })}
      key={id}
      className={styles.gallery__item}
    >
      <img className={styles.image} src={webformatURL} alt={tags} />
    </li>
  ));
};

export default ImageGalleryItem;
ImageGalleryItem.defaultProps = {
  items: [],
};

ImageGalleryItem.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  showImage: PropTypes.func,
};
