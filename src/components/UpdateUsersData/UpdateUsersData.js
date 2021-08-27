import React, { useContext, useEffect } from 'react';
import { UserDataContext } from '../../App';

const UpdateUsersData = () => {
    const [ usersData, setUserData ] = useContext(UserDataContext);
    useEffect(() => {
        fetch('https://morning-headland-46638.herokuapp.com/getAllUserData')
            .then(res => res.json())
            .then(data => {
                setUserData(data)
                console.log(usersData)
            })
    }, [usersData.length]);
    return (
        <div>
            
        </div>
    );
};

export default UpdateUsersData;