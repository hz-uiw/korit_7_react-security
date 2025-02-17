import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../api/config/axiosConfig';

/*
    로그인 요구사항
    각 필드가 공백인지만 체크(공백이면 아래 오류 메시지로)
    로그인 버튼 클릭시 /api/auth/signin 요청 
    -> 응답 받은 accessToken을 localStorage의 AccessToken이라는 키값으로 저장.
    Index페이지로 이동
    계정이 없으신가요? 회원가입 구현
*/
function SignupPage(props) {
    const navigate = useNavigate();

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

    const handleInputOnBlur = (e) => {
        const {name, value} = e.target;
        let message = "";
        if(name === "username" && !(/^[a-zA-Z0-9_]{5,20}$/.test(value))) {
            message = "올바른 사용자 이름을 입력하세요.";
        }
        if(name === "password" && !(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/.test(value))) {
            message = "영어 대소문자, 숫자, 특수문자를 하나 이상 포함하여 8~20자리로 작성하세요";
        }
        if(name === "name" && !(/^[가-힣a-zA-Z]{2,30}$/.test(value))) {
            message = "두 글자 이상 입력하세요요.";
        }
        if(name === "email" && !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))) {
            message = "올바른 이메일을 입력하세요.";
        }
        setErrors({
            ...errors,
            [name]: message,
        });
    }
    
    const handleSignupButtonOnClick = async () => {
        if(Object.entries(errors).filter(entry => !entry[1]) > 0) {
            return;
        }
        try {
            await api.post("/api/auth/signup", signupInput);
            alert("회원가입 완료");
            navigate("/signin");
        } catch(error) {
            setErrors({
                username: error.response.data.data.username,
                password: "",
                name: "",
                email: "",
            });
        }
    }


    // const handleSignupButtonOnClick = async () => {
    //     try {
    //         const response = await api.post("/api/auth/signup", signupInput);
    //         console.log(response.data);
    //     } catch(error) {
    //         console.error(error.response.data.data);
    //         let newError = {};
    //         const responseErrors = error.response.data.data;
    //         for(let e of responseErrors) {
    //             const errorEntry = Object.entries(e)[0]
    //             newError = {
    //                 ...newError,
    //                 [errorEntry[0]]: errorEntry[1],
    //             };
    //         }
    //         setErrors({
    //             username: "",
    //             password: "",
    //             name: "",
    //             email: "",
    //             ...newError
    //         });
    //     }
    // }

    
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
                                helperText={errors.username}
                                onBlur={handleInputOnBlur}/>
                            
                            <TextField type='password' label="password" name="password" 
                                onChange={handleSignupInputOnChange} value={signupInput.password}
                                error={!!errors.password}
                                helperText={errors.password}
                                onBlur={handleInputOnBlur}/>
                            
                            <TextField type='text' label="name" name="name" 
                                onChange={handleSignupInputOnChange} value={signupInput.name}
                                error={!!errors.name}
                                helperText={errors.name}
                                onBlur={handleInputOnBlur}/>
                            
                            <TextField type='email' label="email" name="email" 
                                onChange={handleSignupInputOnChange} value={signupInput.email}
                                error={!!errors.email}
                                helperText={errors.email}
                                onBlur={handleInputOnBlur}/>

                            <Button variant='contained' onClick={handleSignupButtonOnClick}>
                                가입하기
                            </Button>
                        </Box>
                        <Typography variant='h6' textAlign={'center'}>
                            이미 계정이 있나요? <Link to={"/signin"}>로그인</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
}

export default SignupPage;