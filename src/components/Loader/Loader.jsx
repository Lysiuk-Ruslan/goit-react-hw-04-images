import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.Loader}>
      <RotatingLines
        strokeColor="rgba(63, 81, 181, 0.8"
        strokeWidth="5"
        animationDuration="0.75"
        width="180"
        visible={true}
      />
      ;
    </div>
  );
}
