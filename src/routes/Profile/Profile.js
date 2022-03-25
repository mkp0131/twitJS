import { auth } from 'fbInstance';
import { signOut } from 'firebase/auth';

const onClickLogout = () => {
  signOut(auth);
};

const Profile = () => {
  return (
    <>
      <button onClick={onClickLogout}>LOGOUT</button>
    </>
  );
};

export default Profile;
