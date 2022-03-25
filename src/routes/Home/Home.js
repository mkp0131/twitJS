import { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { auth, db } from 'fbInstance';
import {
  collection,
  addDoc,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import Twit from 'components/Twit/Twit';

const Home = () => {
  const [twit, setTwit] = useState('');
  const [twitList, setTwitList] = useState([]);

  // userUid
  const userUid = auth.currentUser?.uid;
  // db collection
  const cl = collection(db, 'twits');

  const qr = query(
    cl,
    where('delete', '==', 'N'),
    orderBy('createdAt', 'desc'),
    limit(10)
  );

  useEffect(() => {
    const unsub = onSnapshot(qr, (data) => {
      let result = [];
      data.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setTwitList(result);
    });
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
