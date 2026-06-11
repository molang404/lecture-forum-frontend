import { useEffect, useState } from "react";
import type { Inquiry } from "../../types/inquiry.type.ts";
import { Link, useSearchParams } from "react-router";
import {
    AdminContainer,
    AdminLoadingText,
    AdminPageHeader,
    AdminTable,
    AdminTableWrapper,
    AdminTd,
    AdminTh,
    AdminTitle,
} from "../../components/admin/admin.style.tsx";
import Card from "../../components/common/card/Card.tsx";
import Pagination from "../../components/common/pagination/Pagination.tsx";
import adminInquiryApi from "../../api/admin/adminInquiryApi.ts";

function AdminInquiryListPage() {
    const [list, setList] = useState<Inquiry[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;
    const SIZE = 15;

    const [total, setTotal] = useState(0);
    const totalPage = Math.ceil(total / SIZE);

    const handlePageChange = (page: number) => {
        searchParams.set("page", page.toString());
        setSearchParams(searchParams);
    };

    const loadInquiries = async (page: number) => {
        try {
            const data = await adminInquiryApi.getInquiryList(page, SIZE);
            setList(data.list);
            setTotal(data.total);
        } catch (error) {
            console.log(error);
            alert("문의 목록을 불러오는데 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadInquiries(page).then(() => {});
    }, [page]);

    return (
        <AdminContainer>
            <AdminPageHeader>
                <AdminTitle>
                    1:1 문의 관리 <small>{total}개</small>
                </AdminTitle>
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
                                    <AdminTh $width={"60%"}>제목</AdminTh>
                                    <AdminTh $width={"20%"}>작성일</AdminTh>
                                    <AdminTh $width={"10%"}>작성자</AdminTh>
                                </tr>
                            </thead>
                            <tbody>
                                {list.length === 0 && (
                                    <tr>
                                        <AdminTd
                                            colSpan={4}
                                            style={{ textAlign: "center", padding: "100px 0" }}>
                                            등록된 문의 사항이 없습니다.
                                        </AdminTd>
                                    </tr>
                                )}
                                {list.map(item => (
                                    <tr key={item.id}>
                                        <AdminTd>{item.id}</AdminTd>
                                        <AdminTd>
                                            <Link to={`/admin/inquiry/${item.id}`}>
                                                {item.title}
                                            </Link>
                                        </AdminTd>
                                        <AdminTd>
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </AdminTd>
                                        <AdminTd>{item.user.nickname}</AdminTd>
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

export default AdminInquiryListPage;
