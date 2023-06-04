import classes from './ProfileForm.module.css';
import { useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router';

const ProfileForm = () => {
  const newPasswordRef = useRef()
  const AuthCtx= useContext(AuthContext)
  const navigate = useNavigate()
  const submitHandler = (event)=>{
    event.preventDefault();
    const enteredNewPassword = newPasswordRef.current.value

fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDi9WstSBmbs3f6YcPzcvzqdIf7sGrtA24',{
  method: 'POST',
  body: JSON.stringify({
    idToken: AuthCtx.token,
    password: enteredNewPassword,
    returnSecureToken: false
  }),
  headers: { 'content-type': 'application/json' },
}).then(res =>{
navigate('/auth')

})
    
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
