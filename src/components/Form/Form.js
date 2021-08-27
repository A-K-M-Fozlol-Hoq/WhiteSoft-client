import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../App";
import "./Form.css";

const Form = () => {
  const [ usersData, setUsersData ] = useContext(UserDataContext);
  const [countries, setCountries] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    country: "",
    message: "",
  });
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [genericError, setGenericError] = useState("");

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        // console.log(countries.length)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  //   },[countries.length])

  const isStartsWithAlphabetic = (string) => {
    const char = string.charAt(0);
    return /[a-zA-Z]/.test(char);
  };

  const checkName = (name) => {
    let isFieldValid = true;
    if (name.length >= 5 && name.length <= 25) {
      isFieldValid = /^[a-z ,.'-]+$/i.test(name);
      if (isFieldValid) {
        setNameError("");
        const newUserData = { ...userData }
        newUserData.name = name;
        setUserData(newUserData);
      } else {
        setNameError("Enter valid User Name. It might contain characters, hyphen ans dot. - Admin");
        return false;
      }
      if (!isStartsWithAlphabetic(name)) {
        setNameError("Name have to start with alphabet. It might contain characters, hyphen ans dot.");
      }
    } else {
      setNameError(
        `The length of your user name should be between 5 and 25. - Admin`
      );
    }
  };

  const checkEmail = (email)=>{
    const isFieldValid = /\S+@\S+\.\S+/.test(email);
    if (isFieldValid) {
        setEmailError('')
        const newUserData = { ...userData }
        newUserData.email = email;
        setUserData(newUserData);
    }
    else {
        setEmailError('Please Enter a valid email')
    }
  }

  const handleChange = (event) => {
    setGenericError('')
    if (event.target.name === "name") {
      let name = event.target.value.trim();
      checkName(name);
    }
    else if (event.target.name === "email"){
        let email = event.target.value.trim();
        checkEmail(email);
    }
    else if (event.target.name === "country"){
        const newUserData = { ...userData }
        newUserData.country = event.target.value;
        setUserData(newUserData);
    }
    else{
        const newUserData = { ...userData }
        newUserData.message = event.target.value.trim();
        setUserData(newUserData);
    }
  };

    const handleSubmit = (event)=>{
        event.preventDefault();
        console.log(userData)
        if(userData.message.length > 2){
            if(userData.name && userData.email && userData.country && userData.message){
                const formData = new FormData();
                formData.append("name", userData.name);
                formData.append("email", userData.email);
                formData.append("country", userData.country);
                formData.append("message", userData.message);
                fetch("https://morning-headland-46638.herokuapp.com/createNewUserData", {
                  method: "POST",
                  body: formData,
                })
                  .then((response) => response.json())
                  .then((data) => {
                    if(data){
                        if(data.insertedId){
                            setUsersData([...usersData,userData] )
                            alert('Added One More Data')
                            event.target.reset();
                        }else{
                            alert('Failed to add this user data')
                        }
                    }
                  })
                  .catch((error) => {
                    console.error(error);
                  });
            }
            else{
                setGenericError('Please Provide All Fields')
            }
        }
        else{
            setGenericError('Invalid message!')
        }
    }
  return (
    <div className="form">
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-25">
                <label htmlFor="fname">Full Name</label>
                </div>
                <div className="col-75">
                <input onChange={handleChange} type="text" id="name" name="name" placeholder="Your name.."/>
                <p style={{color:'red'}}>{nameError}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                <label htmlFor="fname">Email</label>
                </div>
                <div className="col-75">
                <input onChange={handleChange} type="email" id="email" name="email" placeholder="Your email.."/>
                <p style={{color:'red'}}>{emailError}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                <label htmlFor="country">Country</label>
                </div>
                <div className="col-75">
                <select onChange={handleChange} id="country" name="country" required>
                    <option value=''>Select Country</option>
                    {
                        countries.map((country,index) => <option key={index} value={country.name}>{country.name}</option>)
                    }
                </select>
                </div>
            </div>
            <div className="row">
                <div className="col-25">
                <label htmlFor="subject">Message</label>
                </div>
                <div className="col-75">
                <textarea onChange={handleChange} id="message" name="message" placeholder="Write something.." style={{height:"200px"}}></textarea>
                </div>
            </div>
            {
                genericError &&
                <div style={{backgroundColor:'#3399ff', color:'red', textAlign:'center', fontSize:'25px',
                margin:'5px', padding:'5px', borderRadius:'5px', border:'3px dotted goldenRod'}}>
                    <p>{genericError}</p>
                </div>
            }
            <div className="row">
                <input type="submit" value="Submit"/>
            </div>
        </form>
    </div>
);
};

export default Form;
