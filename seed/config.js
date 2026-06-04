// Typescript 파일과 Javascript 파일은 호환이 안됨

// 경로에 대한 이해
// 이 파일은 프로그램 실행하는 위치가 루트(최상단) 폴더가 되고    => .env 파일이 있음
// 파일이 존재하는 위치는 /seed/user.js 에 위치. 이 파일에 입장에서 .env 파일의 위치 표현은 ../.env

import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// dotenv를 통해 환경 변수 파일을 불러오는데, 매개 변수에 옵션 객체를 넣어 설정을 해줄 수 있음
// path라는 프로퍼티로 "여기에서 .env를 불러와" 라고 지정 가능
// 위치는 path 라이브러리를 통해 __dirname (현재 경로 위치값이 저장되어 있는 기본 변수) 와 "../.env"를
// 합쳐서(join) 넣어줌

// commonJS에서는 기본으로 현재 경로를 __dirname 이라는 변수에 저장해놓지만
// ES module 에서는 제공하지 않아서 직접 만들어줘야 함
dotenv.config({ path: path.join(__dirname, "../.env") });

export const BASE_URL = process.env.VITE_API_BASE_URL;
export const ADMIN_TOKEN = process.env.ADMIN_TOKEN;