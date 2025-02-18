import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../api/config/axiosConfig';
import { useQueryClient } from 'react-query';

function SigninPage(props) {
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    
    const [signinInput, setSigninInput] = useState({
        username: "",
        password: "",
    });
    
    const [isSigninError, setSigninError] = useState(false);
    
    const handleSigninInputOnChange = (e) => {
        setSigninInput({
            ...signinInput,
            [e.target.name]: e.target.value,
        });
    }

    const [errors, setErrors] = useState({
        username: "",
        passowrd: "",
    });

    const handleInputOnBlur = (e) => {
        const {name, value} = e.target;
        setErrors(prev => ({
            ...prev,
            [name]: !(value.trim()) ? `${name}을(를) 입력하세요` : "",
        }));
    }

    const handleSigninButtonOnClick = async () => {
        if(Object.entries(errors).filter(entry => !!entry[1]) > 0) {
            return;
        }
        try {
            const response = await api.post("/api/auth/signin", signinInput);
            console.log(response);

            const accessToken = response.data.data;
            localStorage.setItem("AccessToken", accessToken);
            api.interceptors.request.use(config => {
                config.headers.Authorization = `Bearer ${accessToken}`;
                return config;
            });
            queryClient.refetchQueries(["userQuery"]);
            setSigninError(false);
            navigate("/");
            // window.location.href = "/";
        } catch(error) {
            setSigninError(true);
        }
    }
    
    return (
        <Box mt={10}>
            <Container maxWidth={"xs"}>
                <Card variant='outlined'>
                    <CardContent>
                        <Typography variant='h4' textAlign={'center'} className='mb-4 text-center'>로그인</Typography>
                        <Box display={"flex"} flexDirection={"column"} gap={2}>
                            <TextField type='text' label="username" name="username" 
                                onChange={handleSigninInputOnChange} value={signinInput.username}
                                error={!!errors.username}
                                helperText={errors.username}
                                onBlur={handleInputOnBlur}
                                />
                            
                            <TextField type='password' label="password" name="password" 
                                onChange={handleSigninInputOnChange} value={signinInput.password}
                                error={!!errors.username}
                                helperText={errors.username}
                                onBlur={handleInputOnBlur}
                                />
                            {
                                !!isSigninError &&
                                <Typography variant='body2' textAlign={'center'}>
                                    사용자 정보를 다시 확인하세요
                                </Typography>
                            }
                            <Button variant='contained' onClick={handleSigninButtonOnClick}>
                                로그인
                            </Button>
                        </Box>
                        <Typography variant='h6' textAlign={'center'}>
                            계정이 없으신가요? <Link to={"/signup"}>회원가입</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}

export default SigninPage;