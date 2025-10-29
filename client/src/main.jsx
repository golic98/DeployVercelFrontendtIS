import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import AdminLayout from './pages/admin/AdminLayout.jsx'
import AdminHome from './pages/admin/AdminHome.jsx'
import AdminUserView from './pages/admin/AdminUserView.jsx'
import AdminTaskView from './pages/admin/AdminTaskView.jsx'
import AdminReportView from './pages/admin/AdminReportView.jsx'
import AdminProfile from './pages/admin/AdminProfile.jsx'
import Register from "./pages/register/Register.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Login from "./pages/login/Login.jsx";
import Home from "./pages/home/Home.jsx";
import LoginAccess from "./pages/login-access/LoginAccess.jsx";
import ProtectedRoute from "./protected/ProtectedRoute.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";
import Vigilant from "./pages/vigilant/Vigilant.jsx";
import Visits from "./pages/vigilant/Visits.jsx";
import Schedules from "./pages/vigilant/Schedules.jsx";
import PayVigilance from "./pages/login-access/PayVigilance.jsx";
import Profile from "./pages/login-access/Profile.jsx";
import ProtectedRouteVigilant from "./protected/ProtectedRouteVigilant.jsx";
import ProtectedRouteUser from "./protected/ProtectedRouteUser.jsx";
import ProfileUpdate from "./pages/login-access/ProfileUpdate.jsx";
import ProfileVigilant from "./pages/vigilant/ProfileVigilant.jsx";
import VigilantUpdate from "./pages/vigilant/VigilantUpdate.jsx";
import UserReport from "./pages/login-access/UserReport.jsx";
import UserAnuncios from "./pages/login-access/UserAnuncios.jsx";
import Users from "./pages/login-access/Users.jsx";
import ProtectedRouteAdmin from './protected/ProtectedRouteAdmin.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path="/login" element={<Login />}> /</Route>
            <Route path="/register" element={<Register />}> /</Route>

            <Route element={<ProtectedRoute />} >

              <Route element={<ProtectedRouteUser />}>
                <Route path="/user" element={<LoginAccess />}> /</Route>
                <Route path="/userReport" element={<UserReport />} />
                <Route path="/userAnuncios" element={<UserAnuncios />} />
                <Route path="/profile/:id" element={<ProfileUpdate />} />
                <Route path="/payVigilance" element={<PayVigilance />}> /</Route>
                <Route path="/profile" element={<Profile />}> /</Route>
                <Route path="/allUsers" element={<Users />}> /</Route>
                <Route path="/userAnuncios" element={<UserAnuncios />}> /</Route>
                <Route path="/userReport" element={<UserReport />}> /</Route>
              </Route>

              <Route element={<ProtectedRouteVigilant />}>
                <Route path="/vigilant" element={<Vigilant />}> /</Route>
                <Route path="/visits" element={<Visits />}> /</Route>
                <Route path="/profileVigilant" element={<ProfileVigilant />} />
                <Route path="/editVigilant/:id" element={<VigilantUpdate />} />
                <Route path="/schedules" element={<Schedules />}> /</Route>
              </Route>

              <Route element={<ProtectedRouteAdmin />}>
                <Route element={<AdminLayout />}>
                  <Route path='/admin' element={<AdminHome />} />
                  <Route path="/admin/users" element={<AdminUserView />} />
                  <Route path="/admin/tasks" element={<AdminTaskView />} />
                  <Route path="/admin/reports" element={<AdminReportView />} />
                  <Route path="/admin/profile" element={<AdminProfile />} />
                </Route>
              </Route>

            </Route>

          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  </StrictMode>,
)
