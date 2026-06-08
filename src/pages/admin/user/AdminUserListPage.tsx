import { useEffect, useState } from "react";
import { Role, type User } from "../../../types/user.type.ts";
import adminUserApi from "../../../api/admin/user/adminUserApi.ts";
import {
    AdminButtonGroup,
    AdminContainer,
    AdminLoadingText,
    AdminPageHeader,
    AdminTable,
    AdminTableWrapper,
    AdminTd,
    AdminTh,
    AdminTitle,
} from "../../../components/admin/admin.style.tsx";
import Button from "../../../components/common/button/Button.tsx";
import { Link, useSearchParams } from "react-router";
import Card from "../../../components/common/card/Card.tsx";
import Badge from "../../../components/common/badge/Badge.tsx";
import { FiEdit, FiTrash } from "react-icons/fi";
import Pagination from "../../../components/common/pagination/Pagination.tsx";

function AdminUserListPage() {
    // 선언문 - 왜 선언했는가?
    // 앞으로 사용자 목옥을 출력해주기 위해서 백엔드에게 데이터 요청을 보낼테니
    // 그 받아온 정보를 저장하고 화면에 출력을 해줌
    // User[]가 저장할 수 있는 초기값 [], list이름을 붙인 state를 선언한다
    const [list, setList] = useState<User[]>([]);

    // 얘는 백엔드와의 통신이 진행 중인지 여부를 나타내는
    //      얘를 통해서 통신 진행 중에는 화면이 출력되지 않도록 제한하기 위해
    // boolean이 저장될 수 있는 초기값 true를 가진, isLoading state를 선언한다
    const [loading, setLoading] = useState(true);

    // 이 컴포넌트는 목록을 출력해줄 목적의 컴포넌트니까,
    // 페이지네이션이 따라오게 설계 되어있고,
    // 페이지네이션을 위해 page와 size가 쿼리스트링에 포함되므로
    // useSearchParams() 를 통해 쿼리 스트링을 불러와야 한다. > 쿼리스트링 사용
    const [searchParams, setSearchParams] = useSearchParams();
    // const pageParams = searchParams.get("page");
    // const page = pageParams ? Number(pageParams) : 1;

    // 페이지네이션을 하는데 지금 현재 사용자가 존재하는 page 번호를 알아야
    // 백엔드에게로 그에 맞춰 요청하고, 페이지네이션도 색깔을 바꿔 출력할 수 있음
    // 근데 최초 주소는 /admin/user 라는 주소라 쿼리스트링이 없음. 그러니까 초기값을 논리합으로 계산.
    // 쿼리스트링에 존재하는 page 항목의 값을 가져오거나, 없으면 1을 number타입으로 page 변수에 저장
    const page = Number(searchParams.get("page")) || 1; // 이것 자체가 state임

    // page는 변경이 가능하도록 하기 위해 쿼리스트링에 포함시켰는데, SIZE는
    // 개발자가 값을 안 바꿀 모양이다 => 쿼라스트링에 SIZE는 포함 X
    // SIZE라고 "대문자"로 쓴 변수명에 상수로써(바꾸지 않는 값) 20을 저장
    const SIZE = 20;

    // 페이지 네이션을 할 때 마지막 페이지를 계산하기 위한 목적으로 전체 중 공지사항 갯수가 필요하거나
    // 그것을 백엔드에게 받아서 저장할 목적으로
    // 초기값 0의 number 타입의 total이라는 이름으로 state를 선언
    const [total, setTotal] = useState(0);

    // 실제 페이지네이션에 출력되는 버튼은 "공지사항 갯수"로 출력하는게 아니라
    // 총 "페이지 매 수"로 출력하니까 여러 군데에서 이에 대해 사용할 거 같으니 한 번에 계산하여
    // totalPage를 불러 씀
    // total 값을 SIZE로 나눠, 올림한 값을 저장하는 totalPage 변수 선언
    const totalPage = Math.ceil(total / SIZE); // Math.ceil() : 올림 메서드

    // 사용자 목록을 불러오는 기능을 함수로 작성
    // 이 함수는 page: number를 매개변수로 갖는다. 리턴은 없음 => 목록 불러오고 끝
    const loadUser = async (page: number) => {
        try {
            // API에 대한 관리가 관리자 측 기능은 admin 접두사로 시작하니까 관리자만 사용하는 기능
            // adminUserApi라는 파일에 fetchUserList라는 함수가 실행 되는구나
            // 매개변수로 page와 SIZE를 받아서, 사용자 목록을 백엔드에게 받아오고
            // 그 결과를 data 변수에 저장
            // data에 마우스를 올려서 팝업을 보니, PaginationResponseType<User> 타입이 저장 됨
            // data = {
            //          page: number,
            //          size: number,
            //          total: number,
            //          list: User[],
            // }
            const data = await adminUserApi.fetchUserList(page, SIZE);
            // 우리가 만든 list state에 data.list를 저장
            setList(data.list);
            // 우리가 만든 total이라고 하는 state에 data.total을 저장
            setTotal(data.total);
        } catch (error) {
            // 위에 존재하는 try 중 실행 실패(에러, 오류)가 발생되면 실행되는 내용으로써
            // 콘손 로그 error를 출력하고, 경고창 하고 끝
            // 별다른 에러 처리 X
            console.log(error);
            alert("사용자 목록을 불러오는데 실패했습니다.");
        } finally {
            // isLoading을 가지고서 화면을 출력해줄 때 isLoading이 false에 실제 결과가 나옴
            // try가 끝나는, catch가 끝나는. 어떠한 것이 끝나는 마지막에 isLoading state가 false로 바뀜
            setLoading(false);
        }
    };

    // useEffect는 초기렌더링이 끝난 즉시 1번 무조건 실행
    // page가 바뀔 때 목록 갱신 함수가 실행되어야 함 ⇒ useEffect의 의존성 배열이 하는 일

    // 의존성 배열에 넣은 변수나 함수나 메서드나 state가 바뀔 때 재시작됨

    // 리액트에서는 백엔드에서 받아오기 위해,
    // 그 받아오는 함수에 대힌 실행을 useEffect 안에 담아줘야 함
    // useEffect 안에서 백엔드 데이터를 받아 오겠구나
    useEffect(() => {
        // 이 함수는, 백엔드에게 내용을 받아서 state에 저장 => 화면 출력을 해주는 함수를 useEffect 매개변수 안에 작성해서
        // 함수 안에 함수를 선언하고, 그걸 실행했었음
        // 함수 스코프에 의해 외부에서는 실행 불가능 => 외부에서도 저 기능을 이용해야 는 상황이 되었으니
        // 그 함수를 밖으로 뺌

        // 사용자의 스크롤을 이동시키는 명령
        window.scrollTo({ top: 0, behavior: "instant" });

        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadUser(page).then(() => {});

        // page state의 값이 바뀔 때마다 게시글 목록을 해당 page 번호에 맞춰 다시 백엔드에게 받아오고
        // 화면 위치를 맨 위로 옮김
        // page state의 값이 바뀔 때마다 useEffect가 재발동
    }, [page]);

    // handler (핸들러) : 상호작용을 통해 무언가 동작을 실행시키는 함수
    const handleDelete = async (id: number) => {
        // confirm은 사용자에게 경고장을 통해 확인을 받는 메서드. true/false 가 반환됨
        // 그렇게 취소를 하면 더 이상 함수 진행을 안 함
        if (!confirm("정말 이 유저를 삭제(탈퇴) 처리 하시겠습니까?")) {
            return;
        }

        try {
            await adminUserApi.deleteUser(id);
            alert("사용자 정보가 성공적으로 삭제되었습니다.");

            // 그렇게 삭제처리가 끝난 정보가 result에 도착했고,
            // 사용자 화면에 반영해줘야 함
            // 1. 다시금 백엔드에게 요청해서 데이터를 받아 화면 갱신
            // 2. 삭제된 사용자 정보를 화면에 바로 반영 (백앤드 x)
            // 카테고리 목록 화면에서는 2번으로 진행했었음

            // 1번으로 진행하려면,        => 이미 우리가 작성한 내용이 있음
            // 1-1. 백엔드에게 다시 데이터 요청
            // 1-2. 받아온 정보를 목록을 관리하는 state에 덮어쓰기
            loadUser(page).then(() => {});
        } catch (error) {
            console.log(error);
            alert("사용자 삭제 중 오류가 발생했습니다.");
        }
    };

    // 페이지 번호 (매개변수)를 통해 page의 값을 변화시키는 핸들러
    const handlePageChange = (page: number) => {
        // state의 값을 바로 바꾸는게 아니라,
        // 쿼리스트링에 존재하는 page의 값을 변경해야 함
        searchParams.set("page", page.toString()); // searchParams 내부의 page 프로퍼티 값을 변경
        setSearchParams(searchParams); // 주소 변경
    };

    return (
        <AdminContainer>
            <AdminPageHeader>
                <AdminTitle>사용자 관리</AdminTitle>
                <Button color={"primary"} variant={"contained"} as={Link} to={"/admin/user/create"}>
                    + 사용자 추가
                </Button>
            </AdminPageHeader>
            <Card>
                {loading ? (
                    <AdminLoadingText>불러오는 중...</AdminLoadingText>
                ) : (
                    <AdminTableWrapper>
                        <AdminTable>
                            <thead>
                                <tr>
                                    <AdminTh $width={"5%"}>ID</AdminTh>
                                    <AdminTh $width={"15%"}>아이디</AdminTh>
                                    <AdminTh $width={"15%"}>이름 (닉네임)</AdminTh>
                                    <AdminTh $width={"20%"}>이메일</AdminTh>
                                    <AdminTh $width={"10%"}>권한</AdminTh>
                                    <AdminTh $width={"10%"}>상태</AdminTh>
                                    <AdminTh $width={"15%"}>가입일</AdminTh>
                                    <AdminTh $width={"10%"}>관리</AdminTh>
                                </tr>
                            </thead>
                            <tbody>
                                {list.length === 0 && (
                                    <tr>
                                        <AdminTd
                                            colSpan={8}
                                            style={{ textAlign: "center", padding: "100px" }}>
                                            등록된 유저가 없습니다.
                                        </AdminTd>
                                    </tr>
                                )}
                                {list.map(item => (
                                    <tr key={item.id}>
                                        <AdminTd>{item.id}</AdminTd>
                                        <AdminTd>{item.username}</AdminTd>
                                        <AdminTd>
                                            {item.name} <br />
                                            <small>{item.nickname}</small>
                                        </AdminTd>
                                        <AdminTd>{item.email}</AdminTd>
                                        <AdminTd>
                                            <Badge
                                                color={
                                                    item.role === Role.ADMIN ? "error" : "primary"
                                                }>
                                                {item.role === "ADMIN" ? "관리자" : "일반"}
                                            </Badge>
                                        </AdminTd>
                                        <AdminTd>
                                            <Badge color={item.deletedAt ? "default" : "success"}>
                                                {item.deletedAt ? "탈퇴" : "정상"}
                                            </Badge>
                                        </AdminTd>
                                        <AdminTd>
                                            {new Date(item.createdAt).toLocaleString()}
                                        </AdminTd>
                                        <AdminTd>
                                            <AdminButtonGroup>
                                                <Button
                                                    variant={"icon"}
                                                    color={"primary"}
                                                    as={Link}
                                                    to={`/admin/user/${item.id}`}>
                                                    <FiEdit size={18} />
                                                </Button>
                                                {!item.deletedAt && (
                                                    <Button
                                                        color={"error"}
                                                        variant={"icon"}
                                                        onClick={() => handleDelete(item.id)}>
                                                        <FiTrash size={18} />
                                                    </Button>
                                                )}
                                            </AdminButtonGroup>
                                        </AdminTd>
                                    </tr>
                                ))}
                            </tbody>
                        </AdminTable>
                    </AdminTableWrapper>
                )}

                {total > 0 && (
                    <Pagination
                        currentPage={page}
                        totalPage={totalPage}
                        onPageChange={handlePageChange}
                    />
                )}
            </Card>
        </AdminContainer>
    );
}

export default AdminUserListPage;
