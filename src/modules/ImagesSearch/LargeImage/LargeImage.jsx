import PropTypes from 'prop-types';

const LargeImage = ({ largeImageURL, tags }) => {
  return <img src={largeImageURL} alt={tags} />;
};

export default LargeImage;

LargeImage.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
