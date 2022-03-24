import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.Loading}>
      <div className={styles.SkBounce}>
        <div className={styles.SkBounceDot}></div>
        <div className={styles.SkBounceDot}></div>
      </div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
