import PropTypes from 'prop-types';
import css from './Button.module.css';

export default function Button({ onClick }) {
  return (
    <div className={css.Wrap}>
      <button className={css.Button} type="button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
