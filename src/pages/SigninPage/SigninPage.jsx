import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../api/config/axiosConfig';

function SigninPage(props) {
    const navigate = useNavigate();
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

    const [errors, setErrors] = useState({
        username: "",
        passowrd: "",
    });

    const handleInputOnBlur = (e) => {
        const {name, value} = e.target;
        let message = "";
        if(name === "username" && value === "") {
            message = "올바른 사용자 이름을 입력하세요."
        }
        if (name === "password" && value === "") {
            message = "올바른 비밀번호를 입력하세요."
        }
        setErrors({
            ...errors,
            [name]: message,
        });
    }

    const handleSigninButtonOnClick = async () => {
        if(Object.entries(errors).filter(entry => !entry[1]) > 0) {
            return;
        }
        console.log(signinInput)
        try {
            const response = await api.post("/api/auth/signin", signinInput);
            const accessToken = response.data?.accessToken;
            localStorage.setItem("AccessToken", accessToken);
            alert("로그인 되었습니다.");
            navigate("/");
        } catch(error) {
            setErrors({
                username: "",
                password: error.response.data.data,
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