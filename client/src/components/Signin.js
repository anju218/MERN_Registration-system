import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import { useState } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, withRouter ,useHistory} from "react-router-dom";
import Signup from './Signup';
import { NavLink } from 'react-router-dom';
const Login=()=>{
    const history = useHistory();
    const paperStyle={padding :20,height:'35vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [showWarning, setShowWarning] = useState(false);

    const loginUser = async (e)=>{
        e.preventDefault();
        const res=await fetch('/signin',{
            method:"POST",
            headers :{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,password
            })
        });

        const data = res.json()
        if(res.status === 400 || !data){
            setShowWarning(true);
		    setTimeout(() => setShowWarning(false), 3000);
            //window.alert("Invalid Credentials");
        }
        else
        {
            
            history.push("/Welcome",{params:email});
        }

    }

    return(
        <Grid>
           
            
            <Paper elevation={10} style={paperStyle}>
            {showWarning && (
				<Alert severity="warning">Invalid Credentials</Alert>
			)}
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <form method="POST">
                <TextField label='Username' type="email" name="email" id="email" value={email} 
                    onChange = {(e)=>setemail(e.target.value)}
                    placeholder='Enter Email ID' fullWidth required
                />
                <TextField label='Password' type ="password" name="password" id="password" value={password}
                    onChange = {(e)=>setpassword(e.target.value)}
                    placeholder='Enter password' type='password' fullWidth required
                />
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} 
                        onClick ={loginUser}
                        fullWidth>
                        Sign in
                    </Button>
                
                </form>
                
                <Typography > Do you have an account ?
                     <Link to="/register" >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default withRouter(Login);