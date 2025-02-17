import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

function SigninPage(props) {
    const [signinInput, setSigninInput] = useState({
        username: "",
        password: "",
    });

    const handleSigninInputOnChange = (e) => {
        setSigninInput({
            ...signinInput,
            [e.target.name]: e.target.value,
        });
    }

    const handleSigninButtonOnClick = () => {
        console.log(signinInput);
    }
    
    return (
        <div>
            <Card variant='outlined'>
                <CardContent>
                    <Typography variant='h4' textAlign={'center'} className='mb-4 text-center'>로그인</Typography>
                    <Box display={"flex"} flexDirection={"column"} gap={2}>
                        <TextField type='text' label="username" name="username" onChange={handleSigninInputOnChange} value={signinInput.username}/>
                        <TextField type='password' label="password" name="password" onChange={handleSigninInputOnChange} value={signinInput.password}/>
                        <Button variant='contained' onClick={handleSigninButtonOnClick}>로그인</Button>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
}

export default SigninPage;