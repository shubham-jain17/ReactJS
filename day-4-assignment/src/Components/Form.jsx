import InputText from './InputText';
import InputFile from './InputFile';
import InputRadio from './InputRadio';
import InputDate from './InputDate';
import InputOption from './InputOption';
import Error from './Error';
import { useState } from 'react';

export default function Form() {


    const [errorlist, setErrorList] = useState([]);

    const [formdata, setFormData] = useState({
        name: "",
        email: "",
        birthdate: "",
        gender: "",
        photo: "",
        eduction: "Bachelors Degree",
        password: "",
        confirmPassword: ""

    })


    const handleSubmit = (e) => {
        e.preventDefault();
        const err = [];
        const emailRegex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

        const isValidEmail = emailRegex.test(formdata.email);
        const isValidName = formdata.name.length > 0 ? true : false;
        const isValidPassword = formdata.password.length > 5 ? true : false;
        const isPasswordMatched = formdata.password === formdata.confirmPassword ? true : false

        if (!isValidEmail) {
            //console.log("Invalid Email")
            err.push("Invalid Email")
        }
        if (!isValidName) {
            //console.log("Invalid Name");
            err.push("Invalid Name");
        }
        if (!isValidPassword) {
            //console.log("Invalid Password")
            err.push("Invalid Password");
        }
        if (isValidPassword && !isPasswordMatched) {
            //console.log("Password Not  Matched");
            err.push("Password Not  Matched");
        }
        setErrorList(err);

    }

    const handleChange = (e) => {
        setFormData({
            ...formdata, [e.target.name]: e.target.value
        })

    }

    return (<div className='container'>
        <form className='form-style' onSubmit={handleSubmit}>
            <div className='field' >
                <label htmlFor="name">Name: </label>
                <InputText handleChange={handleChange} value={formdata.name} name="name" />
            </div>
            <div className='field'>
                <label htmlFor="email">Email: </label>
                <InputText handleChange={handleChange} value={formdata.email} name="email" />
            </div>
            <div className='field'>
                <label htmlFor="DOB">DOB: </label>
                <InputDate handleChange={handleChange} value={formdata.birthdate} name="birthdate" />
            </div>
            <div className='field'>
                <label htmlFor="Gender">Gender: </label>
                <InputRadio handleChange={handleChange} value="Male" name="gender" />
                <label>Male</label>
                <InputRadio handleChange={handleChange} value="Female" name="gender" />
                <label>Female</label>
            </div>
            <div className='field'>
                <label htmlFor="Photo">Profile Pic: </label>
                <InputFile handleChange={handleChange} name="photo" value={formdata.photo} />
            </div>
            <div className='field'>
                <label htmlFor="EducationLevel">Education Level: </label>
                <InputOption handleChange={handleChange} option1="Bachelors Degree" option2="PG Degree" option3="Doctorate Degree" option4="Other" value={formdata.eduction} name="eduction" />
            </div>
            <div className='field'>
                <label htmlFor="password">Password: </label>
                <InputText handleChange={handleChange} value={formdata.password} name="password" />
            </div>
            <div className='field'>
                <label htmlFor="password">Re-Enter Password: </label>
                <InputText handleChange={handleChange} value={formdata.confirmPassword} name="confirmPassword" />
            </div>
            <div className='field'> <input type="submit" value="Submit"></input></div>

        </form>
        <Error errorlist={errorlist} />
    </div>
    );
}