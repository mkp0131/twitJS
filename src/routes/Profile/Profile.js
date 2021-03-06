import { auth, storage, db } from 'fbInstance';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import styles from './Profile.module.css';
import { updateProfile } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { USER_DEFAULT_DISPLAYNAME, USER_DEFAULT_PHOTOURL } from 'userSetting';

const onClickLogout = () => {
  signOut(auth);
};

const Profile = ({ userObj, refleshUser }) => {
  const [displayName, setDisplayName] = useState(userObj.displayName);
  const [profileImg, setProfileImg] = useState(userObj.photoURL);

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    event.target.querySelector('input').blur();

    if (displayName === userObj.displayName) return;

    await updateProfile(auth.currentUser, {
      displayName,
    });

    await updateDoc(doc(db, 'users', userObj.uid), {
      displayName,
    });

    refleshUser();
  };

  const onChangeFile = (event) => {
    const {
      target: { files },
    } = event;

    if (!files) return;

    const maxSize = 7340032; //파일 맥스 사이즈 7MB
    if (files[0].size >= maxSize) {
      alert('7메가 이상의 파일은 업로드가 불가합니다.');
      return;
    }

    var fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.onload = async (event) => {
      const file = event.target.result;

      // 파이어베이스 파일 업로드 처리
      const storageRef = ref(storage, `users/${userObj.uid}/profile`);

      const uploadFile = await uploadString(storageRef, file, 'data_url');

      const attachmentUrl = await getDownloadURL(uploadFile.ref);

      await updateProfile(auth.currentUser, {
        photoURL: attachmentUrl,
      });
      await updateDoc(doc(db, 'users', userObj.uid), {
        photoURL: attachmentUrl,
      });
      setProfileImg(attachmentUrl);
      refleshUser();
    };
  };

  return (
    <div className="ct-container">
      <div className={styles.MyPhoto}>
        <img src={profileImg || USER_DEFAULT_PHOTOURL} />
        <label className={styles.BtnPhotoEdit}>
          <input type="file" accept="image/*" onChange={onChangeFile} />
          <FontAwesomeIcon icon={faPen} />
        </label>
      </div>
      <form className={styles.MyName} onSubmit={onSubmit}>
        <input
          type="text"
          value={displayName ?? USER_DEFAULT_DISPLAYNAME}
          onChange={onChange}
        />
      </form>
      <button className={styles.BtnLogout} onClick={onClickLogout}>
        LOGOUT
      </button>
    </div>
  );
};

export default Profile;
