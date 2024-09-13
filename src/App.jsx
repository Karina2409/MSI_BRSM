import "./styles/header.css"
import React from 'react';
import RegisterAuthorization from "./RegisterAuthorization";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/student/main-page/MainPage';
import UserProfile from './pages/student/student-profile/UserProfile';
import SidebarStudent from './SidebarStudent';
import UserEventsPage from './pages/student/events/UserEventsPage';
import MyEventsPage from './pages/student/my-event/UserMyEventsPage';
import SecretariesPage from './pages/student/secretaries-page/SecretariesPage';
import StudentsPage from './pages/secretary/students-page/StudentsPage';
import StudentDetails from './pages/secretary/students-page/StudentDetails';
import SidebarSecretary from './SidebarSecretary';
import EventsPage from './pages/secretary/event-page/EventsPage';
import EditEvent from './pages/secretary/event-page/EditEvent';
import CreateEvent from './pages/secretary/event-page/CreateEvent';
import EventStudents from './pages/secretary/event-page/EventStudents';
import ExemptionsPage from "./pages/secretary/exemptions-page/ExemptionsPage";
import ReportsPage from "./pages/secretary/reports-page/ReportsPage";
import PetitionsPage from "./pages/secretary/petitions-page/PetitionsPage";
import StatisticsPage from "./pages/secretary/statistics-page/StatisticsPage";
import UsersPage from "./pages/secretary/users-page/UsersPage";
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';




function App() {

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<RegisterAuthorization />} />
          <Route path="/student/*" element={<ProtectedRoutesStudent />} />
          <Route path="/secretary/*" element={<ProtectedRoutesSecretary />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

const ProtectedRoutesStudent = () => (
  <>
    <SidebarStudent/>
    <Routes>
      <Route path="main" element={<ProtectedRoute element={<MainPage />} roles={['student']} />} />
      <Route path="profile" element={<ProtectedRoute element={<UserProfile />} roles={['student']} />} />
      <Route path="events" element={<ProtectedRoute element={<UserEventsPage />} roles={['student']} />} />
      <Route path="my-events" element={<ProtectedRoute element={<MyEventsPage />} roles={['student']} />} />
      <Route path="secretaries" element={<ProtectedRoute element={<SecretariesPage />} roles={['student']} />} />
    </Routes>
  </>
);

const ProtectedRoutesSecretary = () => (
  <>
    <SidebarSecretary/>
    <Routes>
      <Route path="students" element={<ProtectedRoute element={<StudentsPage />} roles={['secretary', 'chief_secretary']} />} />
      <Route path="students/student-details/:studentId" element={<ProtectedRoute element={<StudentDetails />} roles={['secretary', 'chief_secretary']}/>} />
      <Route path="events" element={<ProtectedRoute element={<EventsPage />} roles={['secretary', 'chief_secretary']} />} />
      <Route path="events/edit/:eventId" element={<ProtectedRoute element={<EditEvent />} roles={['secretary', 'chief_secretary']} />} />
      <Route path="events/create" element={<ProtectedRoute element={<CreateEvent />} roles={['secretary', 'chief_secretary']} />} />
      <Route path="events/:eventId/students" element={<ProtectedRoute element={<EventStudents />} roles={['secretary', 'chief_secretary']} />} />
      <Route path="exemptions" element={<ProtectedRoute element={<ExemptionsPage />} roles={['secretary', 'chief_secretary']} />} />
      <Route path="reports" element={<ProtectedRoute element={<ReportsPage />} roles={['secretary', 'chief_secretary']} />} />
      <Route path="petitions" element={<ProtectedRoute element={<PetitionsPage />} roles={['secretary', 'chief_secretary']} />} />
      <Route path="statistics" element={<ProtectedRoute element={<StatisticsPage />} roles={['secretary', 'chief_secretary']} />} />
      <Route path="users" element={<ProtectedRoute element={<UsersPage />} roles={['chief_secretary']} />} />
      
    </Routes>
  </>
);

export default App;
