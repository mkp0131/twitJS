import { auth, db } from 'fbInstance';
import {
  collection,
  addDoc,
  setDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import { getAuth, getAdditionalUserInfo } from 'firebase/auth';
import { useState } from 'react';
import styles from './Twit.module.css';
import { async } from '@firebase/util';

const Twit = ({ twit, userUid }) => {
  const [editMode, setEditMode] = useState(false);
  const [editTwit, setEditTwit] = useState('');

  const onClickDelete = async (event, twit) => {
    event.preventDefault();
    await updateDoc(doc(db, 'twits', twit.id), {
      delete: 'Y',
    });
  };
  const onClickModify = (event) => {
    event.preventDefault();
    if (editMode) {
      setEditMode(false);
      setEditTwit('');
    } else {
      setEditMode(true);
      setEditTwit(twit.twit);
    }
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setEditTwit(value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    updateDoc(doc(db, 'twits', twit.id), {
      twit: editTwit,
    });
    setEditMode(false);
    setEditTwit('');
  };

  const twitDate = new Date(twit.createdAt);
  const twitDateTxt = `${twitDate.getFullYear()}.${(
    '00' +
    (twitDate.getMonth() + 1)
  ).slice(-2)}.${('00' + twitDate.getDate()).slice(-2)}`;

  const getProfile = async (uid) => {
    // const result = await getAuth().getUser(uid);
    // console.log(result);
  };

  getProfile(twit.creatorId);
  return (
    <li className={`${styles.Twit} ${editMode && styles.TwitModify}`}>
      <ul className={styles.twitCreator}>
        <li>작성자: {twit.creatorId}</li>
        <li>작성일: {twitDateTxt}</li>
      </ul>
      <div className={styles.TwitTxt}>{twit.twit}</div>
      <div className={styles.ModifyContainer}>
        <h3>글 수정</h3>
        <form onSubmit={onSubmit}>
          <textarea
            name="editTwit"
            type="text"
            value={editTwit}
            onChange={onChange}
          />
          <button type="submit">글 수정</button>
        </form>
      </div>
      {twit.creatorId === userUid && (
        <div className={styles.TwitBtnContainer}>
          <button onClick={(event) => onClickModify(event, twit)}>수정</button>
          <button onClick={(event) => onClickDelete(event, twit)}>삭제</button>
        </div>
      )}
    </li>
  );
};

export default Twit;
