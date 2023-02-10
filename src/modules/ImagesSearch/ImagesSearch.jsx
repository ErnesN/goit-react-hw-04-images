import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { useState, useEffect, useCallback } from 'react';

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
          setTotalHits(totalHits);
          if (hits.length <= 0) {
            Notify.warning(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            return;
          }
          Notify.success(`Hooray! We found ${totalHits} images.`);
          setItems(prevItems => [...prevItems, ...hits]);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchImages();
    }
  }, [search, page]);

  const onSearchImages = useCallback(({ search }) => {
    setSearch(search);
    setItems([]);
    setPage(1);
  }, []);

  const showImage = useCallback(data => {
    setImageDetails(data);
    setShowModal(true);
  }, []);

  const loadMore = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setImageDetails(null);
  }, []);

  return (
    <>
      <ImagesSearchForm onSubmit={onSearchImages} />

      <ImagesList items={items} showImage={showImage} />
      {error && <p>{error.message}</p>}
      {loading && <Loader />}
      {items.length > 0 && items.length < totalHits && (
        <button className={styles.button} onClick={loadMore}>
          Load more
        </button>
      )}
      {showModal && (
        <Modal closeModal={closeModal}>
          <LargeImage {...imageDetails} />
        </Modal>
      )}
    </>
  );
};
export default ImagesSearch;
