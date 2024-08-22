import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/login.css'; // Assuming you have a CSS file to hold your styles

export default function LoginComponent() {
  const navigate = useNavigate();

  const init = {
    uid: '',
    pwd: '',
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'update':
        return { ...state, [action.fld]: action.val };
      case 'reset':
        return init;
      default:
        return state;
    }
  };

  const [info, dispatch] = useReducer(reducer, init);
  const [msg, setMsg] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [passwordType, setPasswordType] = useState('password');

  const sendData = async (e) => {
    e.preventDefault();

    if (!info.uid || !info.pwd) {
      setMsg('Enter UID and password first');
      return;
    }

    const reqOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info),
    };

    try {
      const resp = await fetch('http://localhost:8080/login/checklogin', reqOptions);
      if (!resp.ok) {
        throw new Error('Server error');
      }
      const obj = await resp.json();

      if (obj.message) {
        setMsg(obj.message);
      } else {
        localStorage.setItem('loggedstatus', 1);
        localStorage.setItem('loggedinfo', JSON.stringify(obj));

        if (obj.login.role_id.role_id === 1) {
          localStorage.setItem('user_id', obj.login.login_id);
          navigate('/admin_home');
        } else if (obj.login.role_id.role_id === 2) {
          localStorage.setItem('user_id', obj.login.login_id);
          navigate('/user_home');
        }
        setLoginSuccess(true);
      }
    } catch (error) {
      alert('Server error. Please try again later.');
      console.error("Error:", error);
    }
  };

  return (
    <div className="login">
      <div className="form">
        <h2 style={{fontSize:'25px', fontWeight:'bold'}}>Welcome Back</h2>

        <form onSubmit={sendData}>
          <div className="form-field">
            <label htmlFor="uid"><i className="fa fa-user"></i></label>
            <input
              id="uid"
              type="text"
              name="uid"
              placeholder="Username"
              value={info.uid}
              onChange={(e) => {
                dispatch({ type: 'update', fld: 'uid', val: e.target.value });
                setMsg('');
              }}
              required
            />
            <svg>
              <use href="#svg-check" />
            </svg>
          </div>

          <div className="form-field">
            <label htmlFor="pwd"><i className="fa fa-lock"></i></label>
            <input
              id="pwd"
              type={passwordType}
              name="pwd"
              placeholder="Password"
              value={info.pwd}
              onChange={(e) => {
                dispatch({ type: 'update', fld: 'pwd', val: e.target.value });
                setMsg('');
              }}
              required
            />
            <svg>
              <use href="#svg-check" />
            </svg>
          </div>

          <button type="submit" className="button">
            <div className="arrow-wrapper">
              <span className="arrow"></span>
            </div>
            <p className="button-text">SIGN IN</p>
          </button>
        </form>  
      </div>

      <p className="forgot-password" onClick={() => navigate('/forgot-password')}>
          Forgot Password?
        </p>

      <div className="finished">
        <svg>
          <use href="#svg-check" />
        </svg>
      </div>

      <p className="msg">{msg}</p>
    </div>
  );
}

// SVG Symbols
export const SVGSymbols = () => (
  <svg style={{ display: 'none' }}>
    <symbol id="svg-check" viewBox="0 0 130.2 130.2">
      <polyline points="100.2,40.2 51.5,88.8 29.8,67.5" />
    </symbol>
  </svg>
);
