import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { api, setAccessToken } from '../../api/config/axiosConfig';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';

function MainHeader(props) {
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const userQueryData = queryClient.getQueryData(["userQuery"]);

    const handleLogOutOnClick = () => {
        setAccessToken(null);
        queryClient.invalidateQueries({
            queryKey: ["userQuery"],
        });
        navigate("/auth/signin")
    }

    return (
        <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h6">로고</Typography>
            <ButtonGroup variant="outlined" aria-label="Basic button group">
                {
                    !!userQueryData
                    ?
                    <>
                        <Link to={"/user/profile"}><Button>프로필</Button></Link>
                        <Button onClick={handleLogOutOnClick}>로그아웃</Button>
                    </>
                    :
                    <>
                        <Link to={"/auth/signin"}><Button>로그인</Button></Link>
                        <Link to={"/auth/signup"}><Button>회원가입</Button></Link>
                    </>
                }
            </ButtonGroup>
        </Box>
    );
}

export default MainHeader;