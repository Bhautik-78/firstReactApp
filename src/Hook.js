import React, {useState} from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.css'


const Hook = () => {
        const [userDetail, setUserDetail] = useState({});
        const [data, setData] = useState([]);

    const handleChange = e => {
        const {name, value} = e.target;
        setUserDetail({...userDetail,[name]: value})
    }

    const submitValue =() => {
        setData([...data,userDetail])

        setUserDetail({})
    }
    // data.push(userDetail)

    return(
        <div className="App">
        <div className="container">
            <h2>Crud Form With Hooks</h2>

            <b>FIRST NAME</b> : <input type="text" name="firstName" value={userDetail.firstName || ''} onChange={handleChange} /><br /><br />
            <b>LAST NAME</b> : <input type="text" name="lastName"  value={userDetail.lastName  || ''} onChange={handleChange} /><br /><br />
            <b>AGE</b> : <input type="text" name="age"  value={userDetail.age  || ''} onChange={handleChange} /><br /><br />
            <b>GENDER</b> :{' '}<input type="radio" name="gender"  onChange={handleChange} value="male" />Male{' '}
                    <input type="radio" name="gender"  onChange={handleChange} value="female" />Female{' '}
                    <input type="radio" name="gender"  onChange={handleChange} value="other" />Other<br /><br />
            <b>ADDRESS</b> : <input type="text" name="address"  value={userDetail.address  || ''} onChange={handleChange} /><br /><br />
            <b>COUNTRY</b>:{' '}<select  name="country" value={userDetail.country  || ''} onChange={handleChange}>
            <option value="India">India</option>
            <option value="Brazil">Brazil</option>
            <option value="USA">USA</option>
            <option value="Dubai">Dubai</option>
            <option value="UK">UK</option>
            </select><br /><br />
            <b>Is Active:</b>:{' '} <input type="checkbox" name="active"  onChange={handleChange} /><br /><br />

            <button onClick={submitValue}>Submit</button>
        </div><br />
            <div>
                <table className="table table-dark table-striped table table-bordered">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Address</th>
                            <th>Country</th>
                            <th>Active</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        data.map((value,index) => (
                            <tr key={index}>
                                <td>{value.firstName}</td>
                                <td>{value.lastName}</td>
                                <td>{value.age}</td>
                                <td>{value.gender}</td>
                                <td>{value.address}</td>
                                <td>{value.country}</td>
                                <td>{value.active}</td>

                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Hook;