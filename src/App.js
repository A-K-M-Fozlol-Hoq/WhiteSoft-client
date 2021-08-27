import { createContext, useState } from "react";
import "./App.css";
import Form from "./components/Form/Form";
import Reset from "./components/Reset/Reset";
import UpdateUsersData from "./components/UpdateUsersData/UpdateUsersData";
import UserList from "./components/UserList/UserList";

export const UserDataContext = createContext([]);
function App() {
  const [ usersData, setUsersData ]  = useState([]);
  return (
    <UserDataContext.Provider value= {[ usersData, setUsersData ]} >
      <UpdateUsersData></UpdateUsersData>
      <Form></Form>
      <UserList></UserList>
      <Reset></Reset>
    </UserDataContext.Provider>
  );
}

export default App;
