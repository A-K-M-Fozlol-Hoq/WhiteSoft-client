import React, { useContext } from 'react';
import { UserDataContext } from '../../App';
import './Reset.css';

const Reset = () => {
    const [ usersData, setUserData ] = useContext(UserDataContext);

    const resetUserData = () => {
        setUserData([])
        fetch("https://morning-headland-46638.herokuapp.com/deleteAllUserData", {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if(data){
                console.log(data);
            }
          })
          .catch((error) => {
            console.error(error);
          });
    }
    return (
        <div className="reset">
            {
                usersData.length > 0 &&
                <button onClick={resetUserData} className='btn'>Reset</button>
            }
        </div>
    );
};

export default Reset;