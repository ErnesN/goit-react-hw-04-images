import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import styles from './images-search-form.module.scss';
import initialState from './initialState';

const ImagesSearchForm = ({ onSubmit }) => {
  const [state, setState] = useState({ ...initialState });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (search.trim() === '') {
      Notify.info('Please enter what to search for!');
      return;
    }
    onSubmit({ ...state });
    setState({ ...initialState });
  };

  const { search } = state;

  return (
    <header className={styles.searchbar}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button type="submit" className={styles.button} onSubmit={handleSubmit}>
          <span className={styles.button__label}>Search</span>
        </button>

        <input
          className={styles.input}
          value={search}
          onChange={handleChange}
          name="search"
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
};
export default memo(ImagesSearchForm);

ImagesSearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
