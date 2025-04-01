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
          <Route path="topics/:subjectId/files/:topicId" element={<Files />} />  
          <Route path="storage" element = {<Storage/>}/>
        </Route>
      </Routes>
    </Router>
    </QueryClientProvider>
     
     </CreationProvider>
   
    
    
  );
}

export default App;
