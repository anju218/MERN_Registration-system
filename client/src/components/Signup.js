import React from 'react';
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import {Alert} from '@material-ui/lab'
import { useState } from 'react';
import Details from './Details'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link,useHistory } from 'react-router-dom';
const Signup = () => {
    const history = useHistory();
    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
    const [showWarning, setShowWarning] = useState("");
   

    const [user, setuser] = useState({
        name:"" ,email:"", phone:"", password:"",cpassword:""
    });
    let name,value;
    const handleInputs =(e)=>{
        name = e.target.name;
        value = e.target.value;
        setuser({...user,[name]:value});
    }

    const postdata = async (e)=>{
        
        e.preventDefault();
        const{name,email,phone,password,cpassword}=user;
        const res = await fetch ("/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name:name,email:email,phone:phone,password:password,cpassword:cpassword
            })
        });
        const data = await res.json();
        
        if(res.status === 422 || !data){
            setShowWarning("Please fill in valid and required details");
		    setTimeout(() => setShowWarning(""), 3000);
            //window.alert("Please fill in valid and required details");
            console.log("Invalid Registration");
            
        }
        else if(res.status ===401) {
            setShowWarning("Password Doesn't match");
		    setTimeout(() => setShowWarning(""), 3000);
            //window.alert("Password Doesn't match");
        }else if(res.status ===402){
            setShowWarning("User already exists");
		    setTimeout(() => setShowWarning(""), 3000);
            //window.alert("Email already exists");
        }
        else{
           
            //window.alert("Registration Succesful");
            console.log("Registration Succesful");
            history.push("/otp",{params:user});
        }

    }


    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                {showWarning && (

                    <Alert severity="warning">{showWarning}</Alert>
                )}
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <form method="POST"> 
                    <TextField fullWidth label='Name' id="name" name="name" onChange={handleInputs}  value={user.name} placeholder="Enter your name" required/>
                    <TextField fullWidth label='Email' id="email" name="email" onChange={handleInputs} value={user.email} placeholder="Enter your email" required />
                    <TextField fullWidth label='Phone Number' id="phone" name="phone" onChange={handleInputs} value={user.phone} placeholder="Enter your phone number" required />
                    <TextField fullWidth type="password" label='Password' id="password" name="password" onChange={handleInputs} value={user.password} placeholder="Enter your password" required />
                    <TextField fullWidth type="password" label='Confirm Password' id="cpassword" name="cpassword" onChange={handleInputs} value={user.cpassword} placeholder="Confirm your password" required />
                    <br></br>
                    <div>
                    <Link >
                        <Button type='submit' variant='contained' color='primary' onClick={postdata}>Verify</Button>
                    </Link>
                    </div>
                    <br></br>
                    <div>
                    <Link to="/">
                        <Button type='submit' variant='contained' color='primary'>Already a user?Login</Button></Link>
                    </div>
                    
                </form>
            </Paper>
        </Grid>
    )
}

export default Signup;
