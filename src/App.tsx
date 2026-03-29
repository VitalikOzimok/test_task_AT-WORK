import { NavBar } from "./components/navbar/navbar";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/route";
import { Profile } from "./page/profile/profile";
import { UserList } from "./page/userList/userList";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path={ROUTES.home} element={<UserList />} />
          <Route path={`${ROUTES.profile}/:id`} element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
