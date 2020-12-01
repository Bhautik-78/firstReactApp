import React, {Component} from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import _ from 'lodash';
import './App.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            address: "",
            gender: "",
            hobby: [],
            city: "",
            phoneNumber: "",
            data: [],

            errors: {},
            isEditableIndex: null
        }
    }



    componentDidMount() {

        let data = [];
        if(JSON.parse(localStorage.getItem("data")) !== null ) {
            data = JSON.parse(localStorage.getItem("data"));

        }
        this.setState({data: data});

    }

    handleChange = e => {
        // console.log(e.target.name);
        if (e.target.name === "hobby") {
            const {hobby} = this.state
            let all = _.clone(hobby);
            if (e.target.checked) {
                all.push(e.target.value)
            } else {
                const findIndex = all.findIndex(v => v === e.target.value)
                if (findIndex !== -1) {
                    all.splice(findIndex, 1)
                }
            }
            this.setState({hobby: all})
        } else {
            this.setState({[e.target.name]: e.target.value});
        }

    };

    validation = (name, value) => {
        switch (name) {
            case 'firstName' :
                if (!value) {
                    return "First Name is required"
                } else {
                    return ''
                }
            case 'lastName' :
                if (!value) {
                    return "last Name is required"
                } else {
                    return ''
                }
            case 'email' :
                if (!value) {
                    return "email is required"
                } else {
                    return ''
                }
            case 'address' :
                if (!value) {
                    return "address is required"
                } else {
                    return ''
                }
            case 'gender' :
                if (!value) {
                    return "gender is required"
                } else {
                    return ''
                }
            case 'hobby' :
                if (!value.length) {
                    return "hobby is required"
                } else {
                    return ''
                }
            case 'city' :
                if (!value) {
                    return "city is required"
                } else {
                    return ''
                }
            case 'phoneNumber' :
                if (!value) {
                    return "phoneNumber is required"
                } else {
                    return ''
                }
            default : {
                return "";
            }
        }
    }


    fSubmit = () => {
        const {firstName, lastName, email, address, gender, hobby, city, phoneNumber, data, isEditableIndex} = this.state

        let allErrors = {}



        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            address: address,
            gender: gender,
            hobby: hobby,
            city: city,
            phoneNumber: phoneNumber
        }

        Object.keys(userData).forEach(key => {
            const error = this.validation(key, userData[key])
            if (error && error.length) {
                allErrors[key] = error
            }
        })
        if (Object.keys(allErrors).length) {
            this.setState({errors: allErrors})
        } else {
            if (isEditableIndex !== null) {
                data[isEditableIndex] = userData
                localStorage.setItem("data", JSON.stringify(data));

            } else {
                data.push(userData)
                localStorage.setItem("data", JSON.stringify(data));

            }

            this.setState({
                data,
                firstName: '',
                lastName: '',
                email: '',
                address: '',
                gender: '',
                hobby: [],
                city: '',
                phoneNumber: '',
                errors: {},
                isEditableIndex: null
            })
        }
    }


    delete = (index) => {
        const {data} = this.state
        data.splice(index, 1);
        this.setState({data})
        localStorage.setItem("data", JSON.stringify(data));
    }

    update = (index) => {
        const {data} = this.state;
        const userData = data[index]
        this.setState({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            address: userData.address,
            gender: userData.gender,
            hobby: userData.hobby,
            city: userData.city,
            phoneNumber: userData.phoneNumber,
            isEditableIndex: index
        })
    }




    render() {
        const {firstName, lastName, email, address, gender, city, phoneNumber, data, errors, hobby} = this.state
        return (
            <div className="App">
                <div className="fr container">
                    <h1>Registration Form</h1><br/>

                    <b>FIRST NAME</b>: <input type="text" className="container text-black-50" value={firstName}
                                              name="firstName" onChange={this.handleChange}/>
                    <span style={{color: 'red', margin_left: '5px'}}>{errors.firstName || ""}</span><br/><br/>


                    <b>LAST NAME</b>: <input type="text" className="container  text-black-50" value={lastName}
                                             name="lastName" onChange={this.handleChange}/>
                    <span style={{color: 'red', margin_left: '5px'}}>{errors.lastName || ""}</span><br/><br/>


                    <b>EMAIL-ID</b>: <input type="text" className="container  text-black-50" value={email}
                                            name="email" onChange={this.handleChange}/>
                    <span style={{color: 'red', margin_left: '5px'}}>{errors.email || ""}</span><br/><br/>


                    <b>ADDRESS</b>: <input type="text" className="container text-black-50" value={address}
                                           name="address" onChange={this.handleChange}/>
                    <span style={{color: 'red', margin_left: '5px'}}>{errors.address || ""}</span><br/><br/>


                    <b>GENDER</b>:{' '}<input type="radio" checked={gender === "male"} name="gender"
                                              onChange={this.handleChange} value="male"/>Male{' '}
                    <input type="radio" checked={gender === "female"} name="gender" onChange={this.handleChange}
                           value="female"/>Female<br/>
                    <span style={{color: 'red', margin_left: '5px'}}>{errors.gender || ""}</span><br/><br/>


                    <b>HOBBIES</b>:<br/>
                    <input type="checkbox" name="hobby" checked={hobby && hobby.includes("Reading")}
                           onChange={this.handleChange} value="Reading"/>{' '}Reading{' '}
                    <input type="checkbox" name="hobby" checked={hobby && hobby.includes("Gaming")}
                           onChange={this.handleChange} value="Gaming"/>{' '}Gaming{' '}
                    <input type="checkbox" name="hobby" checked={hobby && hobby.includes("Writing")}
                           onChange={this.handleChange} value="Writing"/>{' '}Writing{' '}
                    <input type="checkbox" name="hobby" checked={hobby && hobby.includes("Internet Suffering")}
                           onChange={this.handleChange} value="Internet Suffering"/>{' '}Internet-Suffering{' '}
                    <input type="checkbox" name="hobby" checked={hobby && hobby.includes("Movie")}
                           onChange={this.handleChange} value="Movie"/>{' '}Movie<br/>
                    <span style={{color: 'red', margin_left: '5px'}}>{errors.hobby || ""}</span><br/><br/>


                    <b>CITY</b>:{' '}<select value={city} name="city" onChange={this.handleChange}>
                    <option value="surat">Surat</option>
                    <option value="ahmedabad">Ahmedabad</option>
                    <option value="rajkot">Rajkot</option>
                    <option value="vadodara">Vadodara</option>
                </select>
                    <span style={{color: 'red', margin_left: '5px'}}>{errors.city || ""}</span><br/><br/>


                    <b>PHONE NUMBER</b>: <input type="tel" maxLength="10" className="container text-black-50"
                                                value={phoneNumber} name="phoneNumber" onChange={this.handleChange}/>
                    <span style={{color: 'red', margin_left: '5px'}}>{errors.phoneNumber || ""}</span>
                    <br/><br/>

                    <Button type="submit" id="submit" onClick={this.fSubmit} variant="primary">Submit</Button><br/><br/>
                </div>
                <div>
                    <table className="table table-dark table-striped table table-bordered">
                        <thead>
                        <tr>
                            <th><b>FIRST NAME</b></th>
                            <th><b>LAST NAME</b></th>
                            <th><b>EMAIL</b></th>
                            <th><b>ADDRESS</b></th>
                            <th><b>GENDER</b></th>
                            <th><b>CITY</b></th>
                            <th><b>HOBBY</b></th>
                            <th><b>PHONE NUMBER</b></th>
                            <th><b>ACTION</b></th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            data.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.address}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.city}</td>
                                    <td>{user.hobby}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td>
                                        <Button onClick={() => {
                                            this.update(index)
                                        }} variant="success">Edit</Button>{' '}
                                        <Button onClick={() => {
                                            this.delete(index)
                                        }} variant="danger">Delete</Button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


export default App;


