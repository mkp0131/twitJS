import { auth } from 'fbInstance';
import {
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faGoogle,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faAt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styles from './Auth.module.css';
import Logo from 'components/Logo';
import { async } from '@firebase/util';

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
      setAuthErr('🤣');
      return;
    }

    try {
      if (authMode === 'login') {
        // 로그인
        await signInWithEmailAndPassword(auth, email, password);
      } else if (authMode === 'join') {
        // 회원가입
        await createUserWithEmailAndPassword(auth, email, password);
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
    // 공급자 선택
    let provider;
    if (social === 'github') {
      provider = new GithubAuthProvider();
    } else if (social === 'google') {
      provider = new GoogleAuthProvider();
    } else {
      return;
    }

    // 회원가입 처리
    try {
      const signResult = await signInWithPopup(auth, provider);
    } catch (error) {
      setAuthErr(error.message);
    }
  };

  return (
    <div className="ct-container">
      <form onSubmit={onSubmit} className={styles.Form}>
        <Logo className={styles.Logo} />
        <label>
          <h3>이메일</h3>
          <input type="text" name="email" value={email} onChange={onChange} />
        </label>
        <label>
          <h3>비밀번호</h3>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </label>
        {authMode === 'login' ? (
          <button type="submit">로그인</button>
        ) : (
          <button type="submit" className={styles.BtnJoin}>
            회원가입
          </button>
        )}
        {authErr && (
          <p className={styles.AuthErr}>
            이메일, 비밀번호를 확인해주세요!
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
              E-Mail 회원가입
            </button>
            <button type="button" onClick={() => onClickSocialJoin('github')}>
              <div className={styles.BtnIcon}>
                <FontAwesomeIcon icon={faGithub} />
              </div>
              Github 로그인
            </button>
            <button type="button" onClick={() => onClickSocialJoin('google')}>
              <div className={styles.BtnIcon}>
                <FontAwesomeIcon icon={faGoogle} />
              </div>
              Google 로그인
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Auth;
