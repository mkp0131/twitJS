import fbInstance, { auth } from 'fbInstance';
import AppRouter from 'components/Router';
import 'style.css';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Loading from './Loading/Loading';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [appInit, setAppInit] = useState(false); // firebase 유저상태 온전히 업데이트될 로딩시간

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
      setAppInit(true); // 유저상태 업데이트 완료.
    });
  }, []);

  return (
    <>
      {appInit ? (
        <>
          <div className="main-container">
            <AppRouter isLogin={isLogin} />
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
