import * as axios from "axios";
import { useAuthStore } from "../stores/auth/authStore.ts";
import { isAxiosError } from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const api = axios.create({
    baseURL: BASE_URL, // 옵션을 진행할 상대의 기본 주소
    timeout: 5000, // 통신 요청을 했을 때 실패되었다고 판단하는 타임아웃 시간 (ms 밀리세컨드 단위, 5초)
    withCredentials: true, // CORS 요청을 허용할지 여부
});

export default api;

// 인터셉터 : 요청을 보내기 전에 axios가 내용을 가로채서 내용을 변경할 수 있음

// 리퀘스트에 해당하는 인터셉터는 api.interceptors.request에 등록할 수 있고,
// api.interceptors.request.use() 메서드에 해당 내용을 매개변수에 함수로서 작성
// 그렇게 집어넣는 함수의 매개변수 첫 자리에는 Request를 보낼 때의 설정 정보가 들어옴
api.interceptors.request.use(config => {
    // 우리가 프론트에서 갖고 있는 토큰 정보를 가지고서
    // Request의 HTTP 메세지 헤더에 넣어줘야 함
    const { token } = useAuthStore.getState();

    // 이 interceptor는 이 axiosInstance를 사용하는 모든 요청에 발동되는 기능이고,
    // 사용자는 로그인이 되어져 있을 수도 있고, 없을 수도 있으므로
    // token이 있을 수도 있고 없을 수도 있음
    // 그러니,  token이 있을 때만 헤더에 추가해 줘야 하는구나~

    if (token) {
        // token이 있을 때에만 요청 헤더에 토큰 정보를 기재해서 보냄
        // config.headers <- axios를 사용할 때 HTTP 메세지 헤더는 이렇게 접근 가능

        // 토큰 정보는 꼭 Authorization 이라는 key에 값으로 입력해줘야 하며,
        // 심지어 값에 token만 넣는게 아니라 꼭 Bearer 라는 글자를 앞에 붙여서 넣어줘야 함
        config.headers.Authorization = `Bearer ${token}`;

        // 토큰 앞에 붙이는 prefix(접두사)를 붙이는 이유
        // Bearer라고 붙으면, 그 뒤에는 JWT token 처럼 string으로 암호화한 값이 들어간다는 의미
        // Basic라고 붙으면, 그 뒤에는 Base64로 인코딩된 값이 들어간다는 의미
        // Digest라고 붙으면, MD5 형식으로 암호화한 값이 들어간다는 의미
    }
    return config;
});

// api.interceptors.response 에는 그렇게 요청한 응답이 도착했을 때
// 응답을 실제 사용하기 전, 해야할 일에 대해서 api.interceptors.response.use() 에다가
// 등록할 수 있음
// intercepter.response.use(성공(HTTP STATUS 200)일 때 해야되는 일(함수), 실패(HTTP STATUS 4xx OR 5xx)일 때 해야되는 일(함수))
api.interceptors.response.use(
    response => response,
    error => {
        if (isAxiosError(error) && error.response) {
            if (error.response.status === 401) {
                useAuthStore.getState().logout();
                // 사용자를 이동시켜줘야 하는데, 마찬가지로 컴포넌트 안이 아니니까 useNavigate를 쓸 수 없음
                // useState (X), useEffect (X), useNavigate (X). react-hook 전부 다 못 씀
                alert("로그인 세션이 만료되었습니다. 다시 로그인 해주세요.");
                window.location.href = "/auth/login";
            }
        }

        // 인터셉터를 통해 "실패"에 해당하는 HTTP status code가 와서 axios는 실패(두번째 매개변수)로 잡았지만
        // return에 따라 상위 try - catch에서 잡는 걸 바꿔줄 수도 있음
        // 성공으로 바꿔주려면 Promise.resolve()
        // 실패로 진핼하여면 Promise.reject()
        return Promise.reject(error); // 원래 이게 실행되고 있었던 try - catch 절에 catch로 다시 던짐
    },
);
