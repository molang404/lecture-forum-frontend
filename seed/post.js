// 프론트앤드 입장에서 Post(글)에 대해서 등록을 시킬 seeding 작업 파일
// 백엔드에서 글 등록이라는 기능에 대해 생각해보면,
// 주소는 /post/create가 되어야 하고, token 있어야 하고, req.body에 필수값 3가지 선택값 2가지

import { ADMIN_TOKEN, BASE_URL } from "./config.js";

const POST_CREATE_URL = BASE_URL + "/post/create";

const mockPostList = [
    {
        title: "탕수육 먹을 때 소스는?",
        option1Text: "무조건 부먹",
        option2Text: "바삭하게 찍먹",
    },
    {
        title: "강아지 vs 고양이",
        option1Text: "강아지가 귀여워",
        option2Text: "고양이가 세상을 지배한다",
    },
    {
        title: "치킨 vs 피자",
        option1Text: "치킨이 짱",
        option2Text: "피자가 더 맛있어",
    },
    {
        title: "치킨 먹을 때",
        option1Text: "다리가 조아",
        option2Text: "날개가 조아",
    },
    {
        title: "돼지고기 vs 소고기",
        option1Text: "무조건 소고기 아님?",
        option2Text: "비싸기만 하고 느끼해 돼지고기",
    },
    {
        title: "깻잎논쟁",
        option1Text: "헤어져",
        option2Text: "그게 머가 어때서",
    },
    {
        title: "새우논쟁",
        option1Text: "바람",
        option2Text: "상관 없는데 매너지",
    },
    {
        title: "출근시간",
        option1Text: "무조건 5~10분 전",
        option2Text: "아냐 정각이야 계약서대로 해야지",
    },
    {
        title: "민트초코 vs 레인보우샤베트",
        option1Text: "민트초코",
        option2Text: "레샤",
    },
    {
        title: "무쌍 vs 유쌍",
        option1Text: "남자든 여자든 쌍커풀이 더 예쁘지",
        option2Text: "무쌍이 유니크하고 더 좋아",
    },
];

// 사용자 생성에 대해서 만들 때는, 그냥 api를 통해 바로 사용자 정보를 집어넣어서 요청만 했으면 됐는데,
// 글 생성이라는 건 api에 요청하기 위해서는 글 정보 뿐만 아니라 categoryId가 필요함
// 물론, categoryId를 수동으로 (실행할 때) 집어넣어서 요청하면 되겠지만
// category 정보도 읽어들여서 자동으로 모든 카테고리에 글이 등록될 수 있도록 처리할 예정

// 1파트 : 카테고리 목록을 불러오는 기능
// 2파트 : 카테고리 ID를 받아서 글을 등록하는 기능
// 3파트 : 1파트와 2파트를 묶어서 실행하는 메인함수

const CATEGORY_LIST_URL = BASE_URL + "/category";

async function fetchCategories() {
    try {
        // axios는 실패하면 바로 catch 절로 에러를 던지지만
        // fetch는 실패하더라도 catch 절로 바로 가는게 아니라 response.ok 를 체크 해줘야 함
        // fetch는 성공된 내용이 자동으로 JSON 파싱이 되지 않음.
        const response = await fetch(CATEGORY_LIST_URL);
        if (!response.ok) throw new Error("카테고리 목록을 불러오는데 실패했습니다.");
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.log("카테고리 조회 중 에러 발생", error.message);
        return [];
    }
}

async function generatePosts(categoryId, count) {
    for (let i = 0; i < count; i++) {
        try {
            // 글을 등록하도록 할텐데, 준비된 mockPostList에서 랜덤으로 글이 써지도록
            // Math.floor() : 소수점 이하 버림
            // Math.random() : 0 이상 1 미만의 랜덤 실수 반환
            // mockPostList.length = 10 * 0~1   => 최소 0부터 9.xxxx => 0 ~ 9
            const topic = mockPostList[Math.floor(Math.random() * mockPostList.length)];

            const dummyData = {
                title: topic.title,
                option1Text: topic.option1Text,
                option2Text: topic.option2Text,
                categoryId: categoryId,
                content:
                    "이 게시물은 토론대난투 시스템을 검증하기 위해 생성된 자동화 텍스트 글입니다. \n\n" +
                    "과연 여러분의 선택은 어느쪽인가요? \n" +
                    `1번 ${topic.option1Text} 과 2번 ${topic.option2Text} 중에 마음에 드는 진영에 투표하고,` +
                    "아래 댓글 창에서 논리 제압을 시작해주세요!",
            };

            const response = await fetch(POST_CREATE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${ADMIN_TOKEN}`,
                },
                body: JSON.stringify(dummyData),
            });
            if (!response.ok) {
                console.log(`[${i + 1}/${count} : 카테고리ID(${categoryId})] 생성 실패`);
                console.log(response);
            } else {
                console.log(`[${i + 1}/${count} : 카테고리ID(${categoryId})] 생성 성공`);
            }
        } catch (error) {
            console.log(`[${i + 1}/${count} : 카테고리ID(${categoryId})] 생성 실패`);
        }
    }
}

async function runSeeder() {
    const categories = await fetchCategories();
    if (!categories || categories.length === 0) {
        console.log("카테고리 데이터를 불러오지 못했습니다. 시드 작업을 중단합니다.");
        return;
    }

    const postsPerCategory = 20;

    // 향상된 for문 중 forof  (array에서만 사용 가능)
    // for (const 함수몸통에서이용할변수 of for의 대상) {
    //      함수몸통에서는 for의 대상의 요소가 들어가는 "함수몸통에서이용할변수"를 써줄 수 있음
    // }
    for (const category of categories) {
        console.log(`카테고리ID(${category.id})에 대한 게시글 생성 작업을 시작합니다.`);
        await generatePosts(category.id, postsPerCategory);
    }

    console.log("모든 카테고리에 대한 게시물 시딩 작업이 완전히 종료되었습니다.");
}


runSeeder().then(() => {});