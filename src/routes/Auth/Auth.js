import { auth, db } from 'fbInstance';
import {
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faAt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styles from './Auth.module.css';
import Logo from 'components/Logo';
import { setDoc, doc } from 'firebase/firestore';
import { USER_DEFAULT_DISPLAYNAME, USER_DEFAULT_PHOTOURL } from 'userSetting';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authMode, setAuthMode] = useState('login');
  const [authErr, setAuthErr] = useState('');

  useEffect(() => {
    setAuthErr('');
  }, [authMode]);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!email && !password) {
      setAuthErr('π€£');
      return;
    }

    try {
      if (authMode === 'login') {
        // λ‘κ·ΈμΈ
        await signInWithEmailAndPassword(auth, email, password);
      } else if (authMode === 'join') {
        // νμκ°μ
        const createUser = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // μ μ  λ°μ΄ν° μμ±
        await setDoc(doc(db, 'users', createUser.user.uid), {
          uid: createUser.user.uid,
          email: createUser.user.email,
          displayName: createUser.user.displayName || USER_DEFAULT_DISPLAYNAME,
          photoURL: createUser.user.photoURL || USER_DEFAULT_PHOTOURL,
          createdAt: createUser.user.metadata.createdAt,
          delete: 'N',
        });
      }
    } catch (error) {
      setAuthErr(error.message);
    }
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onClickEmailJoin = () => {
    setAuthMode('join');
  };

  const onClickSocialJoin = async (social) => {
    // κ³΅κΈμ μ ν
    let provider;
    if (social === 'github') {
      provider = new GithubAuthProvider();
    } else if (social === 'google') {
      provider = new GoogleAuthProvider();
    } else {
      return;
    }

    // νμκ°μ μ²λ¦¬
    try {
      const createUser = await signInWithPopup(auth, provider);
      // μ μ  λ°μ΄ν° μμ±
      await setDoc(doc(db, 'users', createUser.user.uid), {
        uid: createUser.user.uid,
        email: createUser.user.email,
        displayName: createUser.user.displayName || USER_DEFAULT_DISPLAYNAME,
        photoURL: createUser.user.photoURL || USER_DEFAULT_PHOTOURL,
        createdAt: createUser.user.metadata.createdAt,
        delete: 'N',
      });
    } catch (error) {
      setAuthErr(error.message);
    }
  };

  return (
    <div className="ct-container">
      <form onSubmit={onSubmit} className={styles.Form}>
        <Logo className={styles.Logo} />
        <label>
          <h3>μ΄λ©μΌ</h3>
          <input type="text" name="email" value={email} onChange={onChange} />
        </label>
        <label>
          <h3>λΉλ°λ²νΈ</h3>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </label>
        {authMode === 'login' ? (
          <button type="submit">λ‘κ·ΈμΈ</button>
        ) : (
          <button type="submit" className={styles.BtnJoin}>
            νμκ°μ
          </button>
        )}
        {authErr && (
          <p className={styles.AuthErr}>
            μ΄λ©μΌ, λΉλ°λ²νΈλ₯Ό νμΈν΄μ£ΌμΈμ!
            <br />
            {authErr}
          </p>
        )}
        {authMode === 'login' && (
          <div className={styles.SignInContainer}>
            <button type="button" onClick={onClickEmailJoin}>
              <div className={styles.BtnIcon}>
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              E-Mail νμκ°μ
            </button>
            <button type="button" onClick={() => onClickSocialJoin('github')}>
              <div className={styles.BtnIcon}>
                <FontAwesomeIcon icon={faGithub} />
              </div>
              Github λ‘κ·ΈμΈ
            </button>
            <button type="button" onClick={() => onClickSocialJoin('google')}>
              <div className={styles.BtnIcon}>
                <FontAwesomeIcon icon={faGoogle} />
              </div>
              Google λ‘κ·ΈμΈ
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Auth;
