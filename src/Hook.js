import React, {useState} from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const Hook = () => {
    const [userDetail, setUserDetail] = useState({});
    const [data, setData] = useState([]);
    const [showResults, setShowResults] = React.useState(true);
    const [editableIndex, setEditableIndex] = useState(null);

    const onAdd = () => {
        setShowResults(!showResults)
    }

    const handleChange = e => {
        const {name, value,checked} = e.target;
        if(name === "active" ){
            setUserDetail({...userDetail, [name]: checked})
        }else{
            setUserDetail({...userDetail, [name]: value})
        }

    }

    const onDelete = (index) => {
        setData(data.filter((value,i) => i !== index))
    }

    const onEdit = (index) => {
        setShowResults(!showResults)
        setUserDetail(data[index])
        setData(data)
        setEditableIndex(index)
    }

    const submitValue = () => {
        setShowResults(!showResults)
        if(editableIndex !== null){
            data[editableIndex] = userDetail
        }else{
            setData([...data, userDetail])
        }
        setUserDetail({})
    }

    return (
        <div className="container">
            <br /><button className="btn-primary" type="button" onClick={onAdd}>Add New</button><br /><br />
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
                                    <Button variant="outlined" color="primary"  onClick={()=>{onEdit(index)}}>
                                        <EditIcon />
                                    </Button>{' '}
                                    <Button variant="outlined" color="primary"  onClick={()=>onDelete(index)}>
                                        <DeleteIcon />
                                    </Button>
                                </td>

                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <br/>
            {showResults && <div className="col-md-6">
                <h2>Registration Form</h2><br />

                <b>FIRST NAME</b> : <input type="text" name="firstName" value={userDetail.firstName || ''}
                                           onChange={handleChange}/><br/><br/>
                <b>LAST NAME</b> : <input type="text" name="lastName" value={userDetail.lastName || ''}
                                          onChange={handleChange}/><br/><br/>
                <b>AGE</b> : <input type="text" name="age" value={userDetail.age || ''}
                                    onChange={handleChange}/><br/><br/>
                <b>GENDER</b> :{' '}<input type="radio" name="gender" checked={userDetail.gender === "male"} onChange={handleChange} value="male"/>Male{' '}
                <input type="radio" name="gender" checked={userDetail.gender === "female"} onChange={handleChange} value="female"/>Female{' '}
                <input type="radio" name="gender" checked={userDetail.gender === "other"} onChange={handleChange} value="other"/>Other<br/><br/>
                <b>ADDRESS</b> : <input type="text" name="address" value={userDetail.address || ''}
                                        onChange={handleChange}/><br/><br/>
                <b>COUNTRY</b>:{' '}<select name="country" value={userDetail.country || ''} onChange={handleChange}>
                <option value="India">India</option>
                <option value="Brazil">Brazil</option>
                <option value="USA">USA</option>
                <option value="Dubai">Dubai</option>
                <option value="UK">UK</option>
            </select><br/><br/>
                <b>I Agree the Terms & Conditions:</b>:{' '} <input type="checkbox" checked={userDetail.active} name="active" onChange={handleChange}/><br/><br/>

                <button  className="btn-primary" onClick={submitValue}>Submit</button>
            </div>}
        </div>
    )
}
export default Hook;