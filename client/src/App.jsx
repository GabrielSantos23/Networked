import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './../theme';
import GlobalStyles from './GlobalStyles';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { Auth } from './pages/Auth';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import authReducer from './reducers/authReducer';
import Sidebar from './components/Sidebar';
import ErrorPage from './pages/ErrorPage';
import { Header } from './components/Header';
import { FriendsList } from './components/FriendsList';
import Chat from './pages/Chat';
import SidebarMobile from './components/SidebarMobile';
import MyComunity from './pages/MyComunity';
import Notifications from './pages/Notifications';
import Explore from './pages/Explore';
import Settings from './pages/Settings';
const AppDiv = styled.div`
  overflow: hidden;
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.body};

  .blur {
    position: absolute;
    width: 22rem;
    height: 14rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.bol};
    filter: blur(72px);
    top: -18%;
    right: 0;
  }
`;

function App() {
  const [theme, setTheme] = useState('dark');
  const user = useSelector((state) => state.authReducer.authData);
  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme);
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      window.localStorage.setItem('theme', 'light');
      setTheme('light');
    } else {
      window.localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />

      <AppDiv className='App'>
        <Router>
          {user ? (
            <>
              <Header toggleTheme={toggleTheme} theme={theme} />
              <Sidebar />
              <SidebarMobile />
              <FriendsList />
            </>
          ) : (
            ''
          )}

          <Routes>
            <Route
              path='/'
              element={user ? <Navigate to='home' /> : <navigate to='auth' />}
            />
            <Route
              path='/home'
              element={user ? <Home /> : <Navigate to='../auth' />}
            />
            <Route
              path='/auth'
              element={user ? <Navigate to='../home' /> : <Auth />}
            />
            <Route
              path='/profile/:id'
              element={user ? <Profile /> : <Navigate to='../auth' />}
            />
            <Route
              path='/chat'
              element={user ? <Chat /> : <Navigate to='../auth' />}
            />
            <Route
              path='/myCommunity'
              element={user ? <MyComunity /> : <Navigate to='../auth' />}
            />
            <Route
              path='/notifications'
              element={user ? <Notifications /> : <Navigate to='../auth' />}
            />
            <Route
              path='/explore'
              element={user ? <Explore /> : <Navigate to='../auth' />}
            />
            <Route
              path='/settings'
              element={user ? <Settings /> : <Navigate to='../auth' />}
            />
            <Route path='/error' element={<ErrorPage />} />
          </Routes>
        </Router>
      </AppDiv>
    </ThemeProvider>
  );
}

export default App;
