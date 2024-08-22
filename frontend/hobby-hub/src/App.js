
import logo from './logo.svg';
import './App.css';
import{Link,Route,Routes} from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import UserRegComponent from './components/UserRegComponent';
import AdminHomeComponent from './components/AdminHomeComponent';
import UserListComponent from './components/UserListComponent';
import GroupListComponent from './components/GroupListComponent';
import AddGroupComponent from './components/AddGroupComponent';
import LogoutComponent from './components/LogoutComponent'; 
import NotificationComponent from './components/NotificationComponent';
import UserHomeComponent from './components/UserHomeComponent';
import ProfileComponent from './components/ProfileComponent';
import UpdateProfileComponent from './components/UpdateProfileComponent';
import GroupJoinComponent from './components/GroupJoinComponent';
import EventComponent from './components/EventComponent';
import AdminProfileComponent from './components/AdminProfileComponent';
import UpdateAdminProfileComponent from './components/UpdateAdminProfileComponent';
import AddHobbyComponent from './components/AddHobbyComponent';
import HobbyListComponent from './components/HobbyListComponent';
import ForgotPasswordComponent from './components/ForgotPasswordComponent';

function App() {
  try {
    let isloggedin=localStorage.getItem("loggedstatus")
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<HomeComponent/>}></Route>
          <Route path="/login" element={<LoginComponent/>}></Route>
          <Route path="registration" element={<UserRegComponent/>}></Route>
      </Routes>

      <Routes>
                <Route path="admin_home" element={<AdminHomeComponent/>}></Route>
                <Route path="userlist" element={<UserListComponent/>}></Route>
                <Route path="grouplist" element={<GroupListComponent/>}></Route>
                <Route path="addgroup" element={<AddGroupComponent/>}></Route>
                <Route path="event" element={<EventComponent/>}></Route>
                <Route path="notification" element={<NotificationComponent/>}></Route>
                <Route path="logout" element={<LogoutComponent/>}></Route>
                <Route path="/admin_profile" element={<AdminProfileComponent/>}></Route>
                <Route path="/admin_update_profile" element={<UpdateAdminProfileComponent/>}></Route>
      </Routes>

      <Routes>
                <Route path="/user_home" element={<UserHomeComponent/>}></Route>
                <Route path="/forgot-password" element={<ForgotPasswordComponent />} />
                <Route path="/addhobby" element={<AddHobbyComponent/>}></Route>
                <Route path="/hobbylist" element={<HobbyListComponent/>}></Route>
                <Route path="/profile" element={<ProfileComponent/>}></Route>
                <Route path="update" element={<UpdateProfileComponent/>}></Route>
                <Route path="groupjoin" element={<GroupJoinComponent/>}></Route>
                <Route path="logout" element={<LogoutComponent/>}></Route>
      </Routes>

    </div>
  );
    
  } catch (error) {
    console.log(error)
  }
  
}

export default App;
