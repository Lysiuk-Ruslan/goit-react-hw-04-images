import { useState } from 'react';
import css from './Searchbar.module.css';
import { FaSistrix } from 'react-icons/fa';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    return setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim().toLowerCase() === '') {
      return alert('Enter your request');
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <FaSistrix size={25} />
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

// export default class Searchbar extends Component {
//   state = {
//     query: '',
//   };

//   handleChange = e => {
//     // console.log(e.target);
//     // console.log(e.currentTarget);
//     return this.setState({ query: e.target.value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     const query = this.state.query.trim().toLowerCase();

//     if (query === '') {
//       return alert('Enter search-text');
//     }

//     this.props.onSubmit(query);
//     this.setState({ query: '' });
//   };

//   render() {
//     return (
//       <header className={css.Searchbar} onSubmit={this.handleSubmit}>
//         <form className={css.SearchForm}>
//           <button type="submit" className={css.SearchFormButton}>
//             <FaSistrix size={25} />
//             <span className={css.SearchFormButtonLabel}>Search</span>
//           </button>

//           <input
//             className={css.SearchFormInput}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.query}
//             onChange={this.handleChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }
//
