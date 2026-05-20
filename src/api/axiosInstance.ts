import * as axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const api = axios.create({
    baseURL: BASE_URL,   // 옵션을 진행할 상대의 기본 주소
    timeout: 5000,       // 통신 요청을 했을 때 실패되었다고 판단하는 타임아웃 시간 (ms 밀리세컨드 단위, 5초)
    withCredentials: true,  // CORS 요청을 허용할지 여부
});

export default api;

// 인터셉터 : 요청을 보내기 전에 axios가 내용을 가로채서 내용을 변경할 수 있음