import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { useState } from 'react';
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
export default ImagesSearchForm;

ImagesSearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// class ImagesSearchForm extends Component {
//   state = {
//     search: '',
//   };

//   handleChange = ({ target }) => {
//     const { name, value } = target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = e => {
//     const { search } = this.state;
//     e.preventDefault();
//     if (search.trim() === '') {
//       Notify.info('Please enter what to search for!');
//       return;
//     }
//     const { onSubmit } = this.props;
//     onSubmit({ ...this.state });
//     this.reset();
//   };

//   reset() {
//     this.setState({
//       search: '',
//     });
//   }

//   render() {
//     const { search } = this.state;
//     const { handleChange, handleSubmit } = this;
// return (
//   <header className={styles.searchbar}>
//     <form className={styles.form} onSubmit={handleSubmit}>
//       <button
//         type="submit"
//         className={styles.button}
//         onSubmit={handleSubmit}
//       >
//         <span className={styles.button__label}>Search</span>
//       </button>

//       <input
//         className={styles.input}
//         value={search}
//         onChange={handleChange}
//         name="search"
//         placeholder="Search images and photos"
//         required
//       />
//     </form>
//   </header>
// );
//   }
// }
