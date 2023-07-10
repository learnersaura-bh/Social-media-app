import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home/Home";
import { Explore } from "./pages/Explore/Explore";
import { Bookmarks } from "./pages/Bookmarks/Bookmarks";
import { Navbar } from "./Components/Navbar/Navbar";
import { Signup } from "./pages/SignUp/SignUp";
import { Login } from "./pages/Login/Login";
import { RequiresAuth } from "./Components/RequiresAuth";
import { UserProfile } from "./pages/UserProfile/UserProfile";
import { SuggestedUsers } from "./Components/SuggestedUsers/SuggestedUsers";

function App() {
  

  return (
    <div className="App">
      {/* <Navbar/> */}
      {/* <SuggestedUsers/> */}
      <Routes>
        <Route path="/" element={ <RequiresAuth><Home /></RequiresAuth> } />
        <Route path="/explore" element={ <RequiresAuth><Explore/></RequiresAuth> } />
        <Route path="/bookmarks" element={ <RequiresAuth><Bookmarks/></RequiresAuth> } />
        <Route path="/profile/:username" element={ <RequiresAuth> <UserProfile/> </RequiresAuth> } />
        <Route path="/login" element={  <Login/>} />
        <Route path="/signup" element={<Signup/>} />
        
        <Route path="/shfdajklgahsfjkhgad" element={<SuggestedUsers/>} />

      </Routes>
    </div>
  );
}

export default App;
