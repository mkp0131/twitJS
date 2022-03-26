import { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { db } from 'fbInstance';
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore';
import Twit from 'components/Twit/Twit';

const Home = ({ userObj }) => {
  const [twit, setTwit] = useState('');
  const [twitList, setTwitList] = useState([]);

  // userUid
  const userUid = userObj?.uid;
  // db collection
  const cl = collection(db, 'twits');

  const qr = query(
    cl,
    where('delete', '==', 'N'),
    orderBy('createdAt', 'desc'),
    limit(20)
  );

  useEffect(() => {
    onSnapshot(qr, (data) => {
      let result = [];
      data.forEach(async (ad) => {
        const adData = ad.data();

        result.push({
          id: ad.id,
          // displayName: userData.displayName,
          // photoURL: userData.photoURL,
          ...adData,
        });
      });

      setTwitList(result);
    });

    return () => setTwitList([]);
  }, []);

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setTwit(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(cl, {
        twit,
        creatorId: userUid,
        createdAt: Date.now(),
        delete: 'N',
      });
      setTwit('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="in-container">
      <div className={styles.NewTwitContainer}>
        <h2>새글 작성</h2>
        <form onSubmit={onSubmit} className={styles.Form}>
          <textarea name="twit" value={twit} onChange={onChange} />
          <button type="submit">글 작성</button>
        </form>
      </div>
      <div className={styles.TwitList}>
        <h2>글 목록</h2>
        <ul>
          {twitList.map((twit) => (
            <Twit key={twit.id} twit={twit} userUid={userUid} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
