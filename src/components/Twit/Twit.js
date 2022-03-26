import { auth, db } from 'fbInstance';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styles from './Twit.module.css';
import { USER_DEFAULT_DISPLAYNAME, USER_DEFAULT_PHOTOURL } from 'userSetting';

const Twit = ({ twit, userUid }) => {
  const [editMode, setEditMode] = useState(false);
  const [editTwit, setEditTwit] = useState('');
  const [writer, setWriter] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  useEffect(() => {
    (async () => {
      const writerDoc = await getDoc(doc(db, 'users', twit.creatorId));
      const writerData = writerDoc.data();

      setWriter(writerData.displayName);
      setPhotoURL(writerData.photoURL);
    })();
  }, []);

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

  return (
    <li className={`${styles.Twit} ${editMode && styles.TwitModify}`}>
      <ul className={styles.twitCreator}>
        <li className={styles.Writer}>
          <img src={photoURL ?? USER_DEFAULT_PHOTOURL} />
          {writer}
        </li>
        <li className={styles.twitDate}>작성일: {twitDateTxt}</li>
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
