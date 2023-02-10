import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { useState, useEffect } from 'react';

import ImagesSearchForm from './ImagesSearchForm/ImagesSearchForm';
import ImagesList from './ImagesList/ImagesList';
import Modal from 'shared/components/Modal/Modal';
import LargeImage from './LargeImage/LargeImage';
import Loader from 'shared/components/Loader/Loader';

import { searchImages } from 'shared/services/images-api';
import styles from './images-search.module.scss';

const ImagesSearch = () => {
  const [search, setSearch] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [imageDetails, setImageDetails] = useState(null);

  useEffect(() => {
    if (search) {
      const fetchImages = async () => {
        try {
          setLoading(true);
          const data = await searchImages(search, page);
          const { hits, totalHits } = data;
          if (hits.length <= 0) {
            Notify.warning(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            return;
          }
          Notify.success(`Hooray! We found ${totalHits} images.`);
          setItems(prevItems => ({ ...prevItems, ...hits, totalHits }));
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchImages();
    }
  }, [search, page]);

  const searchImages = ({ search }) => {
    setSearch(search);
    setItems([]);
    setPage(1);
  };

  return (
    <>
      <ImagesSearchForm onSubmit={searchImages} />

      <ImagesList items={items} showImage={showImage} />
      {error && <p>{error.message}</p>}
      {loading && <Loader />}
      {items.length > 0 && items.length < totalHits && (
        <button className={styles.button} onClick={loadMore}>
          Load more
        </button>
      )}
      {showModal && (
        <Modal close={closeModal}>
          <LargeImage {...imageDetails} />
        </Modal>
      )}
    </>
  );
};
export default ImagesSearch;

// class ImagesSearch extends Component {
//   state = {
//     search: '',
//     items: [],
//     loading: false,
//     error: null,
//     page: 1,
//     totalHits: 0,
//     showModal: false,
//     imageDetails: null,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const { search, page } = this.state;
//     if (prevState.search !== search || prevState.page !== page) {
//       this.fetchImages();
//     }
//   }
//   async fetchImages() {
//     try {
//       this.setState({ loading: true });
//       const { search, page } = this.state;
//       const data = await searchImages(search, page);
//       const { hits, totalHits } = data;
//       if (hits.length <= 0) {
//         Notify.warning(
//           'Sorry, there are no images matching your search query. Please try again.'
//         );
//         return;
//       }
//       Notify.success(`Hooray! We found ${totalHits} images.`);
//       this.setState(({ items }) => ({
//         items: [...items, ...hits],
//         totalHits,
//       }));
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ loading: false });
//     }
//   }

//   searchImages = ({ search }) => {
//     this.setState({ search, items: [], page: 1 });
//   };

//   loadMore = () => {
//     this.setState(({ page }) => ({ page: page + 1 }));
//   };

//   showImage = ({ largeImageURL, tags }) => {
//     this.setState({
//       imageDetails: {
//         largeImageURL,
//         tags,
//       },
//       showModal: true,
//     });
//   };

//   closeModal = () => {
//     this.setState({
//       showModal: false,
//       imageDetails: null,
//     });
//   };

//   render() {
// const { items, loading, error, showModal, imageDetails, totalHits } =
//   this.state;
// const { searchImages, loadMore, showImage, closeModal } = this;

// return (
//   <>
//     <ImagesSearchForm onSubmit={searchImages} />

//     <ImagesList items={items} showImage={showImage} />
//     {error && <p>{error.message}</p>}
//     {loading && <Loader />}
//     {items.length > 0 && items.length < totalHits && (
//       <button className={styles.button} onClick={loadMore}>
//         Load more
//       </button>
//     )}
//     {showModal && (
//       <Modal close={closeModal}>
//         <LargeImage {...imageDetails} />
//       </Modal>
//     )}
//   </>
// );
//   }
// }
