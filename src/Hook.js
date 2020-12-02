import React, {useEffect, useState} from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const Hook = () => {
    const [userDetail, setUserDetail] = useState({
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        address: "",
        country: "",
        active: ""
    });
    const [data, setData] = useState([]);
    const [showResults, setShowResults] = React.useState(true);
    const [editableIndex, setEditableIndex] = useState(null);
    const [error, setError] = useState({});

    useEffect(() => {
        let list = [];
        if(JSON.parse(localStorage.getItem("data")) !== null ) {
            list = JSON.parse(localStorage.getItem("data"));
        }
        setData(list);
    },[])

    const validation = () => {
        let isError = false;
        const errors = {};
        if (userDetail.firstName === "") {
            errors.firstName = "first Name Is Required";
            isError = true;
        }
        if (userDetail.lastName === "") {
            errors.lastName = "Last Name Is Required";
            isError = true;
        }
        if (userDetail.age === "") {
            errors.age = "Age Is Required";
            isError = true;
        }
        if (userDetail.gender === "") {
            errors.gender = "gender Is Required";
            isError = true;
        }
        if (userDetail.address === "") {
            errors.address = "Address Is Required";
            isError = true;
        }
        if (userDetail.country === "") {
            errors.country = "country Is Required";
            isError = true;
        }
        // if(userDetail.active === ""){
        //     errors.active = "you must agree first";
        //     isError = true;
        //     return true;
        // }
        setError(errors);
        return isError;
    }

    const onAdd = () => {
        setShowResults(!showResults)
    }


    const handleChange = e => {
        const {name, value} = e.target;
        if (name === "gender") {
            setUserDetail({...userDetail, [name]: value})
        } else {
            setUserDetail({...userDetail, [name]: value})
        }

    }

    const onDelete = (index) => {
        setData(data.filter((value, i) => i !== index))
        localStorage.setItem("data", JSON.stringify(data));
    }

    const onEdit = (index) => {
        setShowResults(!showResults)
        setUserDetail(data[index])
        setData(data)
        setEditableIndex(index)
    }

    const submitValue = () => {
        const x = validation();
        if (x) {
            return
        }
        if (editableIndex !== null) {
            data[editableIndex] = userDetail
        } else if (!x) {
            data.push(userDetail)
            setData(data)
        }
        localStorage.setItem("data", JSON.stringify(data));
        setUserDetail({})
        setEditableIndex(null)
        setShowResults(!showResults)
    }

    return (
        <div className="container">
            <br/>
            <button className="btn-primary" onClick={onAdd}>Add New</button>
            <br/><br/>
            <div className="row table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data.map((value, index) => (
                            <tr key={index}>
                                <td>{value.firstName}</td>
                                <td>{value.lastName}</td>
                                <td>{value.age}</td>
                                <td>
                                    <Button variant="outlined" color="primary" onClick={() => {
                                        onEdit(index)
                                    }}>
                                        <EditIcon/>
                                    </Button>{' '}
                                    <Button variant="outlined" color="primary" onClick={() => onDelete(index)}>
                                        <DeleteIcon/>
                                    </Button>
                                </td>

                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <br/>
            {showResults && <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <h2>Registration Form</h2><br/>

                    <b>FIRST NAME</b> : <input type="text" className="form-control" name="firstName"
                                               value={userDetail.firstName || ''}
                                               onChange={handleChange}/>
                    <span style={{color: "red"}}>{error.firstName}</span><br/>

                    <b>LAST NAME</b> : <input type="text" className="form-control" name="lastName"
                                              value={userDetail.lastName || ''}
                                              onChange={handleChange}/>
                    <span style={{color: "red"}}>{error.lastName}</span><br/>

                    <b>AGE</b> : <input type="text" className="form-control" name="age" value={userDetail.age || ''}
                                        onChange={handleChange}/>
                    <span style={{color: "red"}}>{error.age}</span><br/>

                    <b>GENDER</b> :{' '}<input type="radio" name="gender" checked={userDetail.gender === "male"}
                                               onChange={handleChange} value="male"/>{' '}Male{' '}
                    <input type="radio" name="gender" checked={userDetail.gender === "female"} onChange={handleChange}
                           value="female"/>{' '}Female{' '}
                    <input type="radio" name="gender" checked={userDetail.gender === "other"} onChange={handleChange}
                           value="other"/>{' '}Other
                    <span style={{color: "red"}}>{error.gender}</span><br/><br/>

                    <b>ADDRESS</b> : <input type="text" className="form-control" name="address"
                                            value={userDetail.address || ''}
                                            onChange={handleChange}/>
                    <span style={{color: "red"}}>{error.address}</span><br/>

                    <b>COUNTRY</b>:{' '}<select name="country" className="form-control" value={userDetail.country || ''}
                                                onChange={handleChange}>
                    <option value="India">India</option>
                    <option value="Brazil">Brazil</option>
                    <option value="USA">USA</option>
                    <option value="Dubai">Dubai</option>
                    <option value="UK">UK</option>
                </select>
                    <span style={{color: "red"}}>{error.country}</span><br/>

                    <b>I Agree the Terms & Conditions:</b>:{' '} <input type="checkbox" checked={userDetail.active ? true : false}
                                                                        name="active"
                                                                        onChange={handleChange}/><br/><br/>

                    <button className="btn-primary" onClick={submitValue}>Submit</button>
                </div>
            </div>
            }
        </div>
    )
}
export default Hook;