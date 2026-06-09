import { useEffect, useState } from "react";
import type { Notice } from "../../../../types/notice.type.ts";
import { Link, useSearchParams } from "react-router";
import NoticeApi from "../../../../api/user/noticeApi.ts";
import {
    AdminContainer,
    AdminLoadingText,
    AdminPageHeader,
    AdminTable,
    AdminTableWrapper,
    AdminTd,
    AdminTh,
    AdminTitle,
} from "../../../../components/admin/admin.style.tsx";
import Button from "../../../../components/common/button/Button.tsx";
import Card from "../../../../components/common/card/Card.tsx";
import Pagination from "../../../../components/common/pagination/Pagination.tsx";

function AdminNoticeList() {
    const [list, setList] = useState<Notice[]>([]);
    const [isLoading, setLoading] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;
    const SIZE = 15;

    const [total, setTotal] = useState(0);
    const totalPage = Math.ceil(total / SIZE);

    const loadNotices = async (page: number) => {
        try {
            const data = await NoticeApi.getNoticeList(page, SIZE);
            setList(data.list);
            setTotal(data.total);
        } catch (error) {
            console.log(error);
            alert("공지사항 목록을 불러오는데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });

        // loadNotices 함수는 async 붙은 "비동기함수"
        // 그냥 실행하면 안됨. 그에 대하여 then-catch 처리를 해주거나
        // try - catch로 묶은 async - await 처리를 해줘야 함
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadNotices(page).then(() => {});
    }, [page]);

    const handlePageChange = (page: number) => {
        searchParams.set("page", page.toString());
        setSearchParams(searchParams);
    };

    return (
        <AdminContainer>
            <AdminPageHeader>
                <AdminTitle>공지사항 관리 <small>{total}개</small></AdminTitle>
                <Button
                    color={"primary"}
                    variant={"contained"}
                    as={Link}
                    to={"/admin/notice/create"}>
                    + 공지사항 등록
                </Button>
            </AdminPageHeader>
            <Card>
                {isLoading ? (
                    <AdminLoadingText>불러오는 중...</AdminLoadingText>
                ) : (
                    <AdminTableWrapper>
                        <AdminTable>
                            <thead>
                                <tr>
                                    <AdminTh $width={"10%"}>ID</AdminTh>
                                    <AdminTh $width={"70%"}>제목</AdminTh>
                                    <AdminTh $width={"20%"}>작성일</AdminTh>
                                </tr>
                            </thead>
                            <tbody>
                                {list.length === 0 && (
                                    <tr>
                                        <AdminTd
                                            colSpan={3}
                                            style={{ textAlign: "center", padding: "100px 0" }}>
                                            등록된 공지사항이 없습니다.
                                        </AdminTd>
                                    </tr>
                                )}
                                {list.map(item => (
                                    <tr key={item.id}>
                                        <AdminTd>{item.id}</AdminTd>
                                        <AdminTd>
                                            <Link to={`/admin/notice/${item.id}`}>
                                                {item.title}
                                            </Link>
                                        </AdminTd>
                                        <AdminTd>
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </AdminTd>
                                    </tr>
                                ))}
                            </tbody>
                        </AdminTable>
                    </AdminTableWrapper>
                )}

                <Pagination
                    currentPage={page}
                    totalPage={totalPage}
                    onPageChange={handlePageChange}
                />
            </Card>
        </AdminContainer>
    );
}

export default AdminNoticeList;
