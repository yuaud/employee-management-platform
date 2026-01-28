import { BrowserRouter as Router, Routes, Route } from "react-router"

import NotFoundPage from "./pages/NotFoundPage"
import Layout from "./layout/Layout"
import Jobs from "./pages/JobsPage"
import LocationPage from "./pages/LocationPage"
import DepartmentPage from "./pages/DepartmentPage"
import EmployeePage from "./pages/EmployeePage"
import ProtectedLayout from "./layout/ProtectedLayout"
import HomePage from "./pages/HomePage"
import AboutMePage from "./pages/AboutMePage"
function App() {
  return (
    <>
    <Router>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path="aboutme" element={<AboutMePage/>}/>
          <Route path="*" element={<NotFoundPage/>}/>

          {/* PROTECTED */}
          <Route element = {<ProtectedLayout/>}>
            <Route path="jobs" element={<Jobs/>}/>
            <Route path="locations" element={<LocationPage/>}/>
            <Route path="departments" element={<DepartmentPage/>}/>
            <Route path="employees" element={<EmployeePage/>}/>
          </Route>

          
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
