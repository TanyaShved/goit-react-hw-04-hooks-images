import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Searcbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';

class App extends Component {
  state = {
    imageName: '',
  };

  hendelFormSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    const { imageName } = this.state;
    return (
      <>
        <Searcbar onSubmit={this.hendelFormSubmit} />
        <ImageGallery
          imageName={imageName}
          onChangeImage={this.hendelFormSubmit}
        />
        <ToastContainer position="top-center" />
      </>
    );
  }
}

export default App;
