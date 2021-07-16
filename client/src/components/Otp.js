import React from 'react';
import { useHistory , useLocation} from 'react-router';
import { Grid,Paper, Avatar, TextField, Button, Typography} from '@material-ui/core'
import { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, withRouter} from "react-router-dom";

const Otp = () => {
    const paperStyle={padding :20,height:'30vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    const [otp, setotp] = useState("");
    const history=useHistory();
    const location = useLocation();
    const user = location.state.params;
    const [users, setusers] = useState({
        email:user.email,code:""
    });
    const [showWarning, setShowWarning] = useState(false);
    const postdata = async (e)=>{
        e.preventDefault();
       
        
        
        const{email,code}=users;
        const res = await fetch ("/verify",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email:email,code:code
            })
        });
        const data = await res.json();
        if(res.status === 401 || !data){
            setShowWarning(true);
		    setTimeout(() => setShowWarning(false), 3000);
            //window.alert("Wrong OTP");
            console.log("Invalid Registration");
            
        }
        else{
           
            //window.alert("Registration Succesful");
            console.log("Registration Succesful");
            history.push("/details",{params:user});
        }

    }
    let name,value;
    const handleInputs =(e)=>{
        name = e.target.name;
        value = e.target.value;
        setusers({...users,[name]:value});
    }


    return (
        <div>
            <Grid>
            <Paper elevation={10} style={paperStyle}>
                {showWarning && (
                    <Alert severity="warning">Wrong OTP</Alert>
                )}
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Verify Account</h2>
                </Grid>
                <form method="POST">
                <TextField label='OTP' type="email" name="code" id="email" value={user.code} 
                    onChange = {handleInputs}
                    placeholder='Enter OTP' fullWidth required
                />
                    <Button type='submit' color='primary' variant="contained" style={btnstyle}
                       onClick={postdata}  fullWidth> 
                        Submit
                    </Button>
                
                </form>
                
                <Typography > Do you have an account ?
                     <Link to="/register" >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid>
            
        </div>
    );
}

export default Otp;
