import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import inquiryApi from "../../../api/user/inquiryApi.ts";
import type { Inquiry } from "../../../types/inquiry.type.ts";
import {
    BoardTable,
    BoardTd,
    BoardTh,
    BoardWrapper,
    LoadingText,
    PostContainer,
    PostPageHeader,
    PostTitle,
} from "../../../components/post/post.style.tsx";
import Pagination from "../../../components/common/pagination/Pagination.tsx";
import Button from "../../../components/common/button/Button.tsx";
import { FaCheckSquare } from "react-icons/fa";
import { CiNoWaitingSign } from "react-icons/ci";

function MyInquiryListPage() {
    const [searchParams, setSearchParams] = useSearchParams("");
    const page = Number(searchParams.get("page")) || 1;
    const SIZE = Number(searchParams.get("size")) || 20;

    const [list, setList] = useState<Inquiry[]>([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const totalPage = Math.ceil(total / SIZE);

    useEffect(() => {
        const loadInquiries = async () => {
            try {
                const data = await inquiryApi.getMyInquiryList(page, SIZE);
                setList(data.list);
                setTotal(data.total);
            } catch (error) {
                console.log(error);
                alert("문의사항을 불러오는 중 오류가 발생했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        window.scrollTo({ top: 0, behavior: "instant" });
        loadInquiries().then(() => {});
    }, [SIZE, page]);

    const onPageChange = (page: number) => {
        searchParams.set("page", page.toString());
        setSearchParams(searchParams);
    };

    return (
        <PostContainer>
            <PostPageHeader>
                <PostTitle>
                    1:1 문의 <small>총 {total}개의 글</small>
                </PostTitle>
                <Button color={"primary"} variant={"contained"} as={Link} to={"/my/inquiry/create"}>
                    문의 남기기
                </Button>
            </PostPageHeader>
            <BoardWrapper>
                {isLoading ? (
                    <LoadingText>문의글을 불러오는 중입니다.</LoadingText>
                ) : (
                    <BoardTable>
                        <thead>
                            <tr>
                                <BoardTh $width={"10%"}>번호</BoardTh>
                                <BoardTh>제목</BoardTh>
                                <BoardTh $width={"15%"}>작성일</BoardTh>
                                <BoardTh $width={"10%"}>답변</BoardTh>
                            </tr>
                        </thead>
                        <tbody>
                            {list.length === 0 && (
                                <tr>
                                    <BoardTd colSpan={4} style={{ padding: "100px 0" }}>
                                        아직 작성된 문의글이 없습니다.
                                    </BoardTd>
                                </tr>
                            )}
                            {list.map(item => (
                                <tr key={item.id}>
                                    <BoardTd>{item.id}</BoardTd>
                                    <BoardTd className={"title-cell"}>
                                        <Link to={`/my/inquiry/${item.id}`}>{item.title}</Link>
                                    </BoardTd>
                                    <BoardTd>
                                        {new Date(item.createdAt).toLocaleString("ko-KR", {
                                            year: "2-digit",
                                            month: "2-digit",
                                            day: "2-digit",
                                        })}
                                    </BoardTd>
                                    <BoardTd>
                                        {item.answer ? (
                                            <FaCheckSquare
                                                size={18}
                                                style={{ color: "#34D399" }}
                                            />
                                        ) : (
                                            <CiNoWaitingSign
                                                size={18}
                                                style={{ color: "#EF4444" }}
                                            />
                                        )}
                                    </BoardTd>
                                </tr>
                            ))}
                        </tbody>
                    </BoardTable>
                )}
            </BoardWrapper>

            <Pagination currentPage={page} totalPage={totalPage} onPageChange={onPageChange} />
        </PostContainer>
    );
}

export default MyInquiryListPage;
