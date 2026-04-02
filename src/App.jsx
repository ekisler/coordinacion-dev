import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import ScrollToTop from "./ScrollToTop.js"

const Home = lazy(() => import('./Pages/HomePage.jsx'));
const Login = lazy(() => import('./Pages/LoginPage.jsx'));
const Register = lazy(() => import('./Pages/RegisterPage.jsx'));
const CreateRepresentative = lazy(() => import('./Pages/CreateRepresentativePage.jsx'));
const Representatives = lazy(() => import('./Pages/RepresentativePage.jsx'));
const RepresentativeDetails = lazy(() => import('./Pages/RepresentativeDetailsPage.jsx'));
const UpdateRepresentativePage = lazy(() => import('./Pages/UpdateRepresentativePage.jsx'));
const Students = lazy(() => import('./Pages/StudentPage.jsx'));
const StudentDetails = lazy(() => import('./Pages/StudentDetailPage.jsx'));
const CreateOnlyStudentPage = lazy(() => import('./Pages/CreateOnlyStudentPage.jsx'));
const CreateStudentPage = lazy(() => import('./Pages/CreateStudentPage.jsx'));
const UpdateStudentPage = lazy(() => import('./Pages/UpdateStudentPage.jsx'));
const TeacherPage = lazy(() => import('./Pages/TeacherPage.jsx'));
const TeacherDetailsPage = lazy(() => import('./Pages/TeacherDetailsPage.jsx'));
const TeacherDashboardPage = lazy(() => import('./Pages/TeacherDashboardPage.jsx'));
const AssignedAttendancesListPage = lazy(() => import('./Pages/AssignedAttendancesListPage.jsx'));
const CreateTeacherPage = lazy(() => import('./Pages/CreateTeacherPage.jsx'));
const UpdateTeacherPage = lazy(() => import('./Pages/UpdateTeacherPage.jsx'));
const PlanningManagementPage = lazy(() => import('./Pages/PlanningManagementPage.jsx'));
const AttendancesPage = lazy(() => import('./Pages/AttendancesPage.jsx'));
const ExitsPage = lazy(() => import('./Pages/ExitsPage.jsx'));
const ForgotPassword = lazy(() => import('./Pages/ForgotPasswordPage.jsx'));
const ChangePassword = lazy(() => import('./Pages/ChangePasswordPage.jsx'));
const ContactPage = lazy(() => import('./Pages/ContactPage.jsx'));
const HomeDashboard = lazy(() => import('./components/Dashboard/Home.jsx'))
const CookiePolicy = lazy(() => import('./Pages/CookiePolicy.jsx'));
const PrivacyPolicy = lazy(() => import('./Pages/PrivacyPolicy.jsx'));
const AboutUs = lazy(() => import('./Pages/AboutUs.jsx'));
const TermOfService = lazy(() => import('./Pages/TermsOfService.jsx'));
const HelpCenter = lazy(() => import('./Pages/HelpCenter.jsx'));
const SecurityCenter = lazy(() => import('./Pages/SecurityCenter.jsx'));
const ComunityGuidelines = lazy(() => import('./Pages/ComunityGuidelines.jsx'));
const LawEnforcement = lazy(() => import('./Pages/LawEnforcement.jsx'));
const FooterFAQ = lazy(() => import('./Pages/FooterFaq.jsx'));
const ChatsN8N = lazy(() => import('./components/ChatsN8N/ChatsN8N.jsx'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<div></div>}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/postRepresentative" element={<CreateRepresentative />} />
          <Route path="/representatives" element={<Representatives />} />
          <Route path="/representatives/:id" element={<RepresentativeDetails />} />
          <Route path="/updateRepresentative/:id" element={<UpdateRepresentativePage />} />
          <Route path="/students" element={<Students />} />
          <Route path="/student/:id" element={<StudentDetails />} />
          <Route path="/postStudentOnly" element={<CreateOnlyStudentPage />} />
          <Route path="/postStudent/:representativeId" element={<CreateStudentPage />} />
          <Route path="/updateStudent/:id" element={<UpdateStudentPage />} />
          <Route path="/teachers" element={<TeacherPage />} />
          <Route path="/teacher/:id" element={<TeacherDetailsPage />} />
          <Route path="/dashboard/teacher" element={<TeacherDashboardPage />} />
          <Route path="/lists" element={<AssignedAttendancesListPage />} />
          <Route path="/postTeacher" element={<CreateTeacherPage />} />
          <Route path="/updateTeacher/:id" element={<UpdateTeacherPage />} />
          <Route path="/planning-management" element={<PlanningManagementPage />} />
          <Route path="/attendances" element={<AttendancesPage />} />
          <Route path="/exits" element={<ExitsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dashboard/*" element={<HomeDashboard />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/terms-of-service" element={<TermOfService />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/security-center" element={<SecurityCenter />} />
          <Route path="/comunity-guidelines" element={<ComunityGuidelines />} />
          <Route path="/law-enforcement" element={<LawEnforcement />} />
          <Route path="/faq" element={<FooterFAQ />} />
          <Route path="/chat" element={<ChatsN8N />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </Suspense>
    </Router>
  );
}

export default App;
