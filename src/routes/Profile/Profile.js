import app, { auth, storage } from 'fbInstance';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import styles from './Profile.module.css';
import { getAuth, updateProfile, updateCurrentUser } from 'firebase/auth';
import { async } from '@firebase/util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

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

    await updateProfile(auth.currentUser, {
      displayName,
    });

    refleshUser();
  };

  const onChangeFile = (event) => {
    const {
      target: { files },
    } = event;

    if (!files) return;

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

      setProfileImg(attachmentUrl);
      refleshUser();
    };
  };

  return (
    <div className="ct-container">
      <div className={styles.MyPhoto}>
        <img src={profileImg || '/logo192.png'} />
        <label className={styles.BtnPhotoEdit}>
          <input type="file" accept="image/*" onChange={onChangeFile} />
          <FontAwesomeIcon icon={faPen} />
        </label>
      </div>
      <form className={styles.MyName} onSubmit={onSubmit}>
        <input
          type="text"
          value={displayName || '별명을 정해주세요.'}
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
