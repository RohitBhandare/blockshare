
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/auth/Login';
import Dashboard from './components/User/Dashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Welcome from './components/User/Welcome';
import Files from './components/User/Files';
import Photos from './components/User/Photos';
import MySharedFiles from './components/User/MySharedFile';
import SharedWithMe from './components/User/SharedWithMe';
import Upload from './components/User/Upload';
import Home from './components/User/Home';
import RecentActivities from './components/User/RecentActivities';
import BlochainTransactionRecord from './components/User/BlochainTransactionRecord';
import Setting from './components/User/Setting';
import Profile from './components/User/Profile';




function App() {
 

  return (
    <div>
      <Router>
        <Routes>
          
          <Route path='/' element={<Login />} />

          <Route path='/app' element={<ProtectedRoute/>} >

              <Route path='dashboard' element={<Dashboard />}>

                <Route path='welcome' element={<Welcome />} />
                <Route index='home' element={<Home />} />
                <Route path='home' element={<Home />} />
                <Route path='upload' element={<Upload />} />
                <Route path='files' element={<Files />} />
                <Route path='photos' element={<Photos />} />
                <Route path='my-shared-files' element={<MySharedFiles />} />
                <Route path='shared-with-me' element={<SharedWithMe />} />
                <Route path='recent' element={<RecentActivities />} />
                <Route path='transaction' element={<BlochainTransactionRecord />} />
                <Route path='settings' element={<Setting />} />
                <Route path='profile' element={<Profile />} />


              </Route>



          </Route>

          <Route path='*' element={<Login />} />
        </Routes>

      </Router>
  

    </div>
  )
}

export default App
