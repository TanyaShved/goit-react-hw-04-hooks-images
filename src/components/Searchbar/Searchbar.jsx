import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './Searcbar.module.css';

const Searcbar = ({ onSubmit }) => {
  const [imageName, setImageName] = useState('');

  const handelNameChange = e => {
    setImageName(e.currentTarget.value.toLowerCase());
  };

  const handelSubmit = e => {
    e.preventDefault();

    // проверяем не пустой ли нам инпут
    if (imageName.trim() === '') {
      toast.warn('Ввидите название!');
      return;
    }

    onSubmit(imageName);
    setImageName('');
  };

  return (
    <header className={s.Searchbar}>
      <form onSubmit={handelSubmit} className={s.SearchForm}>
        <button type="submit" className={s.SearchForm_button}>
          <span className={s.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={s.SearchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={imageName}
          onChange={handelNameChange}
        />
      </form>
    </header>
  );
};

Searcbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searcbar;
