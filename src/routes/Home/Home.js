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
import { async } from '@firebase/util';

const Home = () => {
  const [twit, setTwit] = useState('');
  const [twitList, setTwitList] = useState([]);

  // userUid
  const userUid = auth.currentUser?.uid;
  // db collection
  const cl = collection(db, 'twits');

  useEffect(() => {
    getTwitList();

    console.log('------');
    const unsub = onSnapshot(cl, (data) => {
      data.forEach((doc) => {
        console.log(doc.data().twit);
      });
    });
  }, []);

  const getTwitList = async () => {
    let result = [];
    try {
      const qr = query(
        cl,
        where('delete', '==', 'N'),
        orderBy('createdAt', 'desc'),
        limit(10)
      );
      const data = await getDocs(qr);
      data.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    } catch (error) {
      console.log(error);
    }
    setTwitList(result);
    return result;
  };

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
      getTwitList();
    } catch (error) {
      console.log(error);
    }
  };
  const onClickDelete = async (event, twit) => {
    event.preventDefault();

    console.log(twit);
    // await setDoc(doc(db, 'twits', id), {
    //   delete: 'Y',
    // });
  };
  const onClickModify = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" name="twit" value={twit} onChange={onChange} />
        <button type="submit">보내기</button>
      </form>
      <ul>
        {twitList.map((twit) => (
          <li key={twit.id}>
            {twit.twit}
            {twit.creatorId === userUid && (
              <div>
                <button onClick={(event) => onClickModify(event, twit)}>
                  수정
                </button>
                <button onClick={(event) => onClickDelete(event, twit)}>
                  삭제
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
