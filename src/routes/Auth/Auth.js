import { auth } from 'fbInstance';
import Logo from 'components/Logo';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import styles from './Auth.module.css';

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
            <button onClick={onClickEmailJoin}>E-Mail 회원가입</button>
            <button>Github 회원가입</button>
            <button>Google 회원가입</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Auth;
