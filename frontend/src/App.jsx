import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import About from "./pages/About";
import Header from "./components/Header";
import Footers from "./components/Footer";
import AllCourse from "./pages/AllCourse";
import MyCourse from "./pages/MyCourse";
import Course from "./pages/Course";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import CreateCourse from "./pages/CreateCourse";
import UpdateCourse from "./pages/UpdateCourse";
import EnrolledCourse from "./pages/EnrolledCourse";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/allcourses" element={<AllCourse />} />

        <Route element={<PrivateRoute />}>
          <Route path="/mycourse/:id" element={<Course />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mycourses" element={<MyCourse />} />
          <Route path="/create-course" element={<CreateCourse />} />
          <Route path="/update-course/:id" element={<UpdateCourse />} />
          <Route path="/enrolled-course/:id" element={<EnrolledCourse />} />
        </Route>
      </Routes>
      <Footers />
    </BrowserRouter>
  );
}
