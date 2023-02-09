import ImageGalleryItem from './ImageItems/ImageGalleryItem';
import PropTypes from 'prop-types';
import styles from './images-list.module.scss';

const ImagesSearchList = ({ items, showImage }) => {
  return (
    <ul className={styles.gallery}>
      <ImageGalleryItem items={items} showImage={showImage} />
    </ul>
  );
};

export default ImagesSearchList;

ImagesSearchList.deaultProps = {
  items: [],
};

ImagesSearchList.propTypes = {
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
