import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../app/features/leads/components/layout/MainLayout";
import Dashboard from "../app/features/leads/pages/dashboard/Dashboard";


import NotFound from "../app/features/leads/pages/NotFound";

import Login from "../app/features/auth/Login";
import Register from "../app/features/auth/Register";
import ProtectedRoute from "../app/features/auth/routes/ProtectedRoute";

import Profile from "../app/features/leads/pages/profile/Profile";
import Settings from "../app/features/leads/pages/settings/Settings";

import Leads from "../app/features/leads/pages/leads/Leads";
import LeadDetail from "../app/features/leads/pages/leads/LeadDetail";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ Auth Pages (NO layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Protected Routes (WITH layout) */}
        <Route
          path="/"
          element={
           
              <MainLayout>
                <Dashboard />
              </MainLayout>
           
          }
        />

        <Route
          path="/leads"
          element={
            
              <MainLayout>
                <Leads />
              </MainLayout>
           
          }
        />
         <Route
          path="/leads/:id"
          element={
           
              <MainLayout>
                <LeadDetail/>
              </MainLayout>
            
          }
        />


        {/* <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Analytics />
              </MainLayout>
            </ProtectedRoute>
          }
        /> */}
       
         
        <Route
          path="/profile"
          element={
            
              <MainLayout>
               <Profile/>
              </MainLayout>
            
          }
        />
        <Route
          path="/settings"
          element={
            
              <MainLayout>
               <Settings/>
              </MainLayout>
            
          }
        />
       

        {/* ❌ 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;