// 사용자 정보를 집어넣는 seed 작성

// 경로에 대한 이해
// 이 파일은 프로그램 실행하는 위치가 루트(최상단) 폴더가 되고    => .env 파일이 있음
// 파일이 존재하는 위치는 /seed/user.js 에 위치. 이 파일에 입장에서 .env 파일의 위치 표현은 ../.env

// typescript에서는 라이브러리를 불러올 때 import 키워드를 썼었음
// javascript에서는 require() 메서드를 통해 불러와야 함
// 그리고 javascript에서 파일에 대한 경로를 사용하려면, path라고 하는 기본 라이브러리를 써야함

// JavaScript 버전이 나뉘어짐
// - js, cjs, ejs
// - js : 일반 js (과거)
// - cjs : commonJS (과거의 JS를 발전시킨
// - ejs : ES 모듈(ECMA)  방식을 받아들인 JavaScript

// package.json을 열어보면, 여기에 “type” 항목이 있음
// 지금 현재 이 프로젝트는 package.json의 type 항목이 “module”임
// 그래서 node 엔진이 실행할 때 ES모듈 방식으로 파일 해석 중
// 즉, “require 쓰지 말고 import 써야 됨” (에러)

import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// dotenv를 통해 환경 변수 파일을 불러오는데, 매개 변수에 옵션 객체를 넣어 설정을 해줄 수 있음
// path라는 프로퍼티로 "여기에서 .env를 불러와" 라고 지정 가능
// 위치는 path 라이브러리를 통해 __dirname (현재 경로 위치값이 저장되어 있는 기본 변수) 와 "../.env"를
// 합쳐서(join) 넣어줌

// commonJS에서는 기본으로 현재 경로를 __dirname 이라는 변수에 저장해놓지만
// ES module 에서는 제공하지 않아서 직접 만들어줘야 함
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

const BASE_URL = process.env.VITE_API_BASE_URL;
const API_URL = BASE_URL + "/admin/user/create";
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

async function generateUsers(count) {
    // 들어온 매개변수 count 만큼 회원 생성 요청을 백엔드에게 보내야 함
    for (let i = 0; i < count; i++) {
        try {
            // fetch(전송해야 하는 URL, 옵션)
            // 옵션은 객체이고, 그 안에 method, headers, body 가 들어감

            // username이나 name, nickname, email은 겹치는 값이면 안됨. unique여야 하니까
            // 뒤어 들어갈 단어는 "겹치지 않는 값"을 붙여야 하므로
            // 손쉽게 만드는 방법은 지금 현재 시간을 쓸 수 있음
            // 사실 i를 쓰면 되는데, 얘는 재실행하면 겹침
            // 그리고, username은 10자 제한 있음
            // 그리고, Javascript애는 random이라는 메서드 존재

            // 날짜 사용 방법
            // Date.now() : 현재 시간을 구함
            // .toString() : 문자열로 변환
            // .slice(-3) : 마지막 3자리만 가져옴
            // + i : i를 붙여서 겹치지 않는 값으로 만듦. (덧셈 X)
            // const unique = Date.now().toString().slice(-3) + i;

            // random 사용 방법
            // Math.random() : 랜덤한 숫자를 만드는 메서드
            // .toString(숫자) : 숫자 진법을 통한 string으로 변환  => 36진법은 0~9, a~z까지 사용 가능
            const unique = Math.random().toString(36).slice(-3);

            const dummyData = {
                username: `user_${unique}`,
                password: "password123",
                name: `유저_${unique}`,
                nickname: `닉네임_${unique}`,
                email: `user_${unique}@test.com`,
                gender: "MALE",
                role: "USER",
            };

            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ADMIN_TOKEN}`,
                },
                body: JSON.stringify(dummyData), // JSON stringify는 Javascript의 객체를 JSON 형태로 변환
            });
            console.log(`[${i + 1}/${count}] ${response.ok ? "성공" : "실패"} / ${unique}`);
        } catch (error) {
            console.log(error);
        }
    }
}

generateUsers(3).then(() => {});
