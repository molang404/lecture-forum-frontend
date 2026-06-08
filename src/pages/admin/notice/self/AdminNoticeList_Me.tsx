import { useCallback, useEffect, useState } from "react";
import type { Notice } from "../../../../types/notice.type.ts";
import {
    AdminButtonGroup,
    AdminContainer,
    AdminLoadingText,
    AdminPageHeader,
    AdminTable,
    AdminTableWrapper,
    AdminTd,
    AdminTh,
} from "../../../../components/admin/admin.style.tsx";
import Button from "../../../../components/common/button/Button.tsx";
import { Link, useSearchParams } from "react-router";
import Card from "../../../../components/common/card/Card.tsx";
import NoticeApi from "../../../../api/user/noticeApi.ts";
import { FiTrash } from "react-icons/fi";
import Pagination from "../../../../components/common/pagination/Pagination.tsx";
import adminNoticeApi from "../../../../api/admin/adminNoticeApi.ts";
import { PostTitle } from "../../../../components/post/post.style.tsx";

function AdminNoticeList_Me() {
    const [list, setList] = useState<Notice[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;

    const SIZE = 15;
    const [total, setTotal] = useState(0);
    const totalPage = Math.ceil(total / SIZE);

    const loadNotice = useCallback(async (page: number) => {
        try {
            const data = await NoticeApi.getNoticeList(page, SIZE);
            setList(data.list);
            setTotal(data.total);
        } catch (error) {
            console.log(error);
            alert("공시사항 목록을 불러오는데 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });

        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadNotice(page).then(() => {});
    }, [loadNotice, page]);

    const handleDelete = async (id: number) => {
        if (!confirm("공지사항을 삭제하시겠습니까?")) {
            return;
        }

        try {
            await adminNoticeApi.deleteNotice(id);
            alert("공지사항이 삭제되었습니다.");
        } catch (error) {
            console.log(error);
            alert("삭제중 오류가 발생했습니다.");
        }
    };

    const handlePageChange = (page: number) => {
        searchParams.set("page", page.toString());
        setSearchParams(searchParams);
    };

    return (
        <AdminContainer>
            <AdminPageHeader>
                <PostTitle>공지사항 관리 <small>총 {total}개의 글</small></PostTitle>
                <Button
                    color={"primary"}
                    variant={"contained"}
                    as={Link}
                    to={`/admin/notice/create`}>
                    + 공지사항 추가
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
                                    <AdminTh $width={"10%"}>번호</AdminTh>
                                    <AdminTh $width={"65%"}>제목</AdminTh>
                                    <AdminTh $width={"15%"}>생성일</AdminTh>
                                    <AdminTh $width={"10%"}>관리</AdminTh>
                                </tr>
                            </thead>
                            <tbody>
                                {list.length === 0 && (
                                    <tr>
                                        <AdminTd
                                            colSpan={4}
                                            style={{ textAlign: "center", padding: "100px" }}>
                                            등록된 공지사항이 없습니다.
                                        </AdminTd>
                                    </tr>
                                )}
                                {list.map(item => (
                                    <tr key={item.id}>
                                        <AdminTd>{item.id}</AdminTd>
                                        <AdminTd>{item.title}</AdminTd>
                                        <AdminTd>{item.createdAt}</AdminTd>
                                        <AdminTd>
                                            <AdminButtonGroup>
                                                <Button
                                                    color={"error"}
                                                    variant={"icon"}
                                                    onClick={() => handleDelete(item.id)}>
                                                    <FiTrash size={18} />
                                                </Button>
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

export default AdminNoticeList_Me;
