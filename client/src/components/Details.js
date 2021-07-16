import React from 'react';
import { useState } from 'react';
import { Grid, Paper, Avatar, Typography, TextField, Button } from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { InputLabel } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import './Signin'
import Select from '@material-ui/core/Select';
import Calendar from 'react-calendar';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      
      
      width: 297,
    },
      formControl: {
        
        minWidth: 297,
      },
  }));
  
const Details = () => {
    const history=useHistory();
    const location = useLocation();
    const myparam = location.state.params;
    console.log(myparam);
    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const marginTop = { marginTop: 5 }
    const classes = useStyles();
    const [Education, setEducation] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [city,setcity] = useState("");
    const [state,setstate]=useState("");
    const [showWarning, setShowWarning] = useState(false);
    
    const [user, setuser] = useState({
        email:myparam.email ,dateofbirth:"", education:"", address1:"", address2:"", pincode:"",city:"",state:"",country:""
    });
    
    // const handleChange = (event) => {
    //     setEducation(event.target.value);
    //     user.education=Education;
    // };
    const handleClose = () => {
        setOpen(false);
    };
    
      const handleOpen = () => {
        setOpen(true);
    };
    
    let name,value;
    const [change, setchange] = useState(0);
    const handleInputs = async (e)=>{
            name = e.target.name;
            value = e.target.value;
            if(name==="pincode" && value.length===6)
            {
                setchange(1)
            }
            setuser({...user,[name]:value});
        if(change){
            console.log(user.pincode);
            const url = `https://api.postalpincode.in/pincode/${user.pincode}`
          await fetch(url)
            .then((response) => response.json())
            .then((data) => {
              //setuser({...user,);
              setuser({...user,city:data[0].PostOffice[0].Block,state:data[0].PostOffice[0].State});
              setchange(0);
                // user.city=city;
                // user.state=state;
                // console.log(state);
                // console.log(user.state);
            });
        }
    }

    const postdata = async (e)=>{
        
        e.preventDefault();
        const{email,dateofbirth, education, address1, address2, pincode,city,state,country}=user;
        const res = await fetch ("/details",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email,dateofbirth, education, address1, address2, pincode,city,state,country
            })
        });
        const data = await res.json();
        if(res.status === 422 || !data){
            setShowWarning(true);
		    setTimeout(() => setShowWarning(false), 3000);
            //window.alert("Invalid Registration");
            console.log("Invalid Registration");
            
        }else{
           
            //window.alert("Details stored successfully");
            console.log("Registration Succesful");
            history.push("/");
        }

    }

    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
            {showWarning && (
                    <Alert severity="warning">Invalid Details</Alert>
                )}
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Enter your Details</h2>
                </Grid>
                <br></br>
                <form>
                    {/* <TextField fullWidth label='Date of Birth' placeholder="Enter your Date of Birth" /> */}
                    <TextField
                            onChange={handleInputs}
                            value={user.dateofbirth}
                            name="dateofbirth"
                            id="date"
                            label="Date of Birth"
                            type="date"
                            defaultValue="Enter Your Birth Date"
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        required />
                    {/* Dropdown */}
                    {/* <TextField fullWidth label='Education' placeholder="Enter your Qualification" /> */}
                    
                        <FormControl className={classes.formControl} required>
                            <InputLabel id="demo-controlled-open-select-label" label="Date of Birth">Education</InputLabel>
                            <Select
                            name="education"
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={user.education}
                            onChange={handleInputs}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"School"}>School(1st to 10th)</MenuItem>
                            <MenuItem value={"High-School"}>High-School(11th/12th)</MenuItem>
                            <MenuItem value={"Under-Gradauate"}>Under-graduate</MenuItem>
                            <MenuItem value={"Post-Graduate"}>Post-graduate</MenuItem>
                            </Select>
                        </FormControl>
                    <TextField fullWidth label='Address Line 1' name="address1" value={user.address1} onChange={handleInputs} placeholder="Enter House No." required />
                    <TextField fullWidth label='Address Line 2' name="address2" value={user.address2} onChange={handleInputs} placeholder="Street/Area" required/>
                    <TextField fullWidth label='PinCode' name="pincode" value={user.pincode} onChange={handleInputs} placeholder="Enter your Pincode" required/>
                    {/* Autocomplete */}
                    
                    <TextField fullWidth label='City' name="city" value={user.city} onChange={handleInputs} placeholder="Enter your City" required/>
                    <TextField fullWidth label='State' name="state" value={user.state} onChange={handleInputs} placeholder="Enter your State" required/>
                    <TextField fullWidth label='Country' name="country" value={user.country} onChange={handleInputs} placeholder="Enter your Country" required/>
                    {/* Attach a file */}
                    <Button type='submit' variant='contained' color='primary' onClick={postdata}>Sign up</Button>
                </form>
            </Paper>
        </Grid>
    )
}

export default Details;
