import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/layout";
import MyCalendar from "./pages/Calendar"; 
import Subjects from "./pages/Subjects";
import './app.css'; 
import Topics from "./pages/Topics";
import Filetable from "./pages/FileTable";
import Storage from "./pages/Storage";
import { QueryClientProvider,QueryClient } from "@tanstack/react-query";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CreationProvider } from "./context/ModalsMenusContext";
import Files from "./pages/Files";
import Favourites from "./pages/Favourites";
import UserSettings from "./pages/UserSettings";
const queryClient = new QueryClient();
function App() {

 
  
  return (
     <CreationProvider>
       <QueryClientProvider client={queryClient}>
       <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Subjects />} /> 
          <Route path="calendar" element={<MyCalendar />} />
          <Route path="subject/:subjectId/topics/" element={<Topics />} />
          <Route path="subject/:subjectId/topics/:topicId/files" element={<Files />} />  
          <Route path="storage" element = {<Storage/>}/>
          <Route path="userSettings" element={<UserSettings />} />
          <Route path="favourites" element={<Favourites />} />
        </Route>
      </Routes>
    </Router>
    </QueryClientProvider>
     
     </CreationProvider>
   
    
    
  );
}

export default App;
