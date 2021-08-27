import React, { useContext} from "react";
import { UserDataContext } from "../../App";
import "./UserList.css";

const UserList = ( props ) => {
    const [ usersData, setUsersData ] = useContext(UserDataContext);

  return (
    <div className="user-list">
      <h1 style={{ textAlign: "center", color: "#3399ff" }}>All Users</h1>
      <div
        style={{
          width: "130px",
          height: "8px",
          margin: " -10px auto 20px",
          backgroundColor: "#cce5ff"
        }}
      ></div>
     <table style={{ overflow: "hidden" }}>
        <tbody>
          <tr>
            <th style={{backgroundColor:'rgb(76 175 80)'}}>Name</th>
            <th style={{backgroundColor:'rgb(76 175 80)'}}>Email</th>
            <th style={{backgroundColor:'rgb(76 175 80)'}}>Country</th>
            <th style={{backgroundColor:'rgb(76 175 80)'}}>Message</th>
          </tr>
          {
              usersData.map((userData,index) => 
              <tr key={index}>
                <td style={{backgroundColor:'rgb(51, 153, 255)'}}>{userData.name}</td>
                <td style={{backgroundColor:'rgb(51, 153, 255)'}}>{userData.email}</td>
                <td style={{backgroundColor:'rgb(51, 153, 255)'}}>{userData.country}</td>
                <td style={{backgroundColor:'rgb(51, 153, 255)'}}>{userData.message}</td>
            </tr>
              )
          }
        </tbody>
      </table>
      {usersData.length === 0 && <p style={{textAlign:'center', color:'red', fontSize:'25px'}}>User data does not exist</p>}
    </div>
  );
};

export default UserList;
