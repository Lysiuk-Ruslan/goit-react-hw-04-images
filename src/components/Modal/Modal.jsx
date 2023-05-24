import { useEffect } from 'react';
import css from './Modal.module.css';

import { createPortal } from 'react-dom';

const modalRef = document.getElementById('modal');

export default function Modal({ toggleModal, image }) {
  const { largeImageURL, tags } = image;

  // eslint-disable-next-line
  const handleKeyDownEsc = e => {
    if (e.code === 'Escape') {
      toggleModal(null);
    }
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      return toggleModal(null);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDownEsc);
    return () => window.removeEventListener('keydown', handleKeyDownEsc);
  }, [handleKeyDownEsc]);

  return createPortal(
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>,
    modalRef
  );
}

// export default class Modal extends Component {

//   componentDidMount = () => {
//     window.addEventListener('keydown', this.handleKeyDownEsc);
//   };

//   componentWillUnmount = () => {
//     window.removeEventListener('keydown', this.handleKeyDownEsc);
//   };

//   handleKeyDownEsc = e => {
//     if (e.code === 'Escape') {
//       return this.props.toggleModal(null);
//     }
//   };

//   handleBackdropClick = e => {
//     if (e.target === e.currentTarget) {
//       return this.props.toggleModal(null);
//     }
//   };

//   render() {
//     const { largeImageURL, tags } = this.props.image;
//     // console.log(this.props.image);
//     return createPortal(
//       <div className={css.Overlay} onClick={this.handleBackdropClick}>
//         <div className={css.Modal}>
//           <img src={largeImageURL} alt={tags} />
//         </div>
//       </div>,
//       modalRef
//     );
//   }
// }
//
