import { auth } from 'fbInstance';
import AppRouter from 'components/Router';
import 'style.css';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Loading from './Loading/Loading';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [appInit, setAppInit] = useState(false); // firebase 유저상태 온전히 업데이트될 로딩시간
  const [userObj, setUserObj] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
      setUserObj(user); // 유저정보 업데이트
      setAppInit(true); // 유저상태 업데이트 완료.
    });
  }, []);

  const refleshUser = () => {
    setUserObj({ ...auth.currentUser });
  };

  return (
    <>
      {appInit ? (
        <>
          <div className="main-container">
            <AppRouter
              isLogin={isLogin}
              userObj={userObj}
              refleshUser={refleshUser}
            />
          </div>
          <footer>&copy; {new Date().getFullYear()} twitJS</footer>
        </>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
}

export default App;
