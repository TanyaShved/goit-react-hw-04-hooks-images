import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './Searcbar.module.css';

class Searcbar extends Component {
  state = {
    imageName: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  hendelNameChange = e => {
    this.setState({ imageName: e.currentTarget.value.toLowerCase() });
  };

  hendelSubmit = e => {
    const { imageName } = this.state;

    e.preventDefault();

    // проверяем не пустой ли нам инпут
    if (imageName.trim() === '') {
      toast.warn('Ввидите название!');
      return;
    }

    this.props.onSubmit(imageName);
    this.setState({ imageName: '' });
  };

  render() {
    const { imageName } = this.state;
    return (
      <header className={s.Searchbar}>
        <form onSubmit={this.hendelSubmit} className={s.SearchForm}>
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
            onChange={this.hendelNameChange}
          />
        </form>
      </header>
    );
  }
}

export default Searcbar;
