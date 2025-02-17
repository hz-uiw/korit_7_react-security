import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../api/config/axiosConfig';

function SignupPage(props) {
    const [signupInput, setSignupInput] = useState({
        username: "",
        password: "",
        name: "",
        email: "",
    });

    const handleSignupInputOnChange = (e) => {
        setSignupInput({
            ...signupInput,
            [e.target.name]: e.target.value,
        });
    }

    const [errors, setErrors] = useState({
        username: "",
        password: "",
        name: "",
        email: "",
    });

    const handleSignupButtonOnClick = async () => {
        try {
            const response = await api.post("/api/auth/signup", signupInput);
            console.log(response.data);
        } catch(error) {
            console.error(error.response.data.data);
            let newError = {};
            const responseErrors = error.response.data.data;
            for(let e of responseErrors) {
                const errorEntry = Object.entries(e)[0]
                newError = {
                    ...newError,
                    [errorEntry[0]]: errorEntry[1],
                };
            }
            setErrors({
                username: "",
                password: "",
                name: "",
                email: "",
                ...newError
            });
        }

    }
    
    return (
        <Box mt={10}>
            <Container maxWidth={"xs"}>
                <Card variant='outlined'>
                    <CardContent>
                        <Typography variant='h4' textAlign={'center'} className='mb-4 text-center'>회원가입</Typography>
                        <Box display={"flex"} flexDirection={"column"} gap={2}>
                            <TextField type='text' label="username" name="username" 
                                onChange={handleSignupInputOnChange} value={signupInput.username}
                                error={!!errors.username}
                                helperText={errors.username}/>
                            
                            <TextField type='password' label="password" name="password" 
                                onChange={handleSignupInputOnChange} value={signupInput.password}
                                error={!!errors.password}
                                helperText={errors.password}/>
                            
                            <TextField type='text' label="name" name="name" 
                                onChange={handleSignupInputOnChange} value={signupInput.name}
                                error={!!errors.name}
                                helperText={errors.name}/>
                            
                            <TextField type='email' label="email" name="email" 
                                onChange={handleSignupInputOnChange} value={signupInput.email}
                                error={!!errors.email}
                                helperText={errors.email}/>

                            <Button variant='contained' onClick={handleSignupButtonOnClick}>
                                가입하기
                            </Button>
                        </Box>
                        <Typography variant='h6' textAlign={'center'}>
                            이미 계정이 있나요? <Link>로그인</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}

export default SignupPage;