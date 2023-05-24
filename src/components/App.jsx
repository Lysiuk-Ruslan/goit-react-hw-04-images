import { useEffect, useState } from 'react';
import imagesApi from '../services/PixabayApi';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Button from './Button/Button';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState(Status.IDLE);
  const [imageId, setImageId] = useState(null);
  const [page, setPage] = useState(1);
  const [showButton, setShowButton] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    imagesApi
      .fetchImages(searchQuery, page)
      .then(response => setImages(prev => [...prev, ...response.hits]))
      .catch(error => setError(error), setStatus(Status.REJECTED));

    setStatus(Status.RESOLVED);
    setShowButton(true);
  }, [page, searchQuery]);

  const handleFormSubmit = query => {
    if (searchQuery === query) {
      return;
    }

    setImages([]);
    setPage(1);
    setStatus(Status.PENDING);
    setSearchQuery(query);
  };

  // const toggleModal = imageId => {
  //   setImageId(imageId);
  // };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    setStatus(Status.PENDING);
  };

  if (status === Status.IDLE) {
    return <Searchbar onSubmit={handleFormSubmit} />;
  }

  if (status === Status.PENDING) {
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />
        <Loader />;
      </>
    );
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        <div>
          <Searchbar onSubmit={handleFormSubmit} />

          <ImageGallery>
            <ImageGalleryItem
              images={images}
              toggleModal={setImageId}
            ></ImageGalleryItem>
          </ImageGallery>
        </div>

        {showButton && <Button onClick={handleLoadMore} />}

        {imageId && (
          <Modal
            toggleModal={setImageId}
            image={images.find(image => image.id === imageId)}
          />
        )}
      </>
    );
  }

  if (status === Status.REJECTED) {
    return alert(error.message);
  }
}

// export default class App extends Component {
//   state = {
//     images: [],
//     query: '',
//     status: Status.IDLE,
//     imageId: null,
//     page: 1,
//     showButton: false,
//     error: null,
//   };

//   componentDidUpdate = (prevProps, prevState) => {
//     const prevQuery = prevState.query;
//     const nextQuery = this.state.query;

//     const prevPage = prevState.page;
//     const nextPage = this.state.page;

//     if (prevQuery !== nextQuery || prevPage !== nextPage) {
//       this.setState({ status: Status.PENDING });

//       imagesApi
//         .fetchImages(nextQuery, nextPage)
//         .then(response => {
//           this.setState(prevState => ({
//             images: [...prevState.images, ...response.hits],
//             status: Status.RESOLVED,
//             showButton:
//               this.state.page < Math.ceil(response.total / 12) ? true : false,
//           }));
//         })
//         .catch(error => {
//           this.setState({ error, status: Status.REJECTED });
//         });
//     }
//   };

//   handleFormSubmit = query => {
//     if (query === this.state.query) {
//       return;
//     }

//     return this.setState({
//       query,
//       page: 1,
//       images: [],
//       showButton: false,
//       imageId: null,
//       status: Status.IDLE,
//     });
//   };

//   toggleModal = imageId => {
//     this.setState({ imageId });
//   };

//   handleLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     const { images, status, imageId, showButton, error } = this.state;

//     if (status === Status.IDLE) {
//       return <Searchbar onSubmit={this.handleFormSubmit} />;
//     }

//     if (status === Status.PENDING) {
//       return (
//         <>
//           <Searchbar onSubmit={this.handleFormSubmit} />
//           <Loader />;
//         </>
//       );
//     }

//     if (status === Status.RESOLVED) {
//       return (
//         <>
//           <div>
//             <Searchbar onSubmit={this.handleFormSubmit} />

//             <ImageGallery>
//               <ImageGalleryItem
//                 images={images}
//                 toggleModal={this.toggleModal}
//               ></ImageGalleryItem>
//             </ImageGallery>
//           </div>

//           {showButton && <Button onClick={this.handleLoadMore} />}

//           {imageId && (
//             <Modal
//               toggleModal={this.toggleModal}
//               image={images.find(image => image.id === imageId)}
//             />
//           )}
//         </>
//       );
//     }

//     if (status === Status.REJECTED) {
//       return alert(error.message);
//     }
//   }
// }
