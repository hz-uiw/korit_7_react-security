import axios from "axios";
import { useQuery } from "react-query";
import { healthCheckApi } from "./api/apis/healthCheckApi";
import { api } from "./api/config/axiosConfig";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage/IndexPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SigninPage from "./pages/SigninPage/SigninPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import { Container } from "@mui/material";

function App() {
    const healthCheckQuery = useQuery(
        ["healthCheckQuery"], 
        healthCheckApi,
        async () => api.get("/server/hc"),
        {
            refetchOnWindowFocus: false,
            enabled: true,
            cacheTime: 1000 * 60 * 10, // 캐시 유지 시간(언마운트 이후)
            staleTime: 1000 * 60 * 10, // 10분마다 최신의 캐시 상태를 유지(refetch)
        }
    );
    if(!healthCheckQuery.isLoading) {
        console.log(healthCheckQuery.data.data.status); // react-query: data, axios: data
    }


	return (
		<Container maxWidth="sm">
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </Container>
	);
}

export default App;

// mui: npm install @mui/material @emotion/react @emotion/styled