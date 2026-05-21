import { useEffect, useState } from "react";
import adminCategoryApi from "../../../api/admin/adminCategoryApi.ts";
import { type Category, CategoryStatus } from "../../../types/category.type.ts";
import Button from "../../../components/common/button/Button.tsx";
import { Link } from "react-router";
import Card from "../../../components/common/card/Card.tsx";
import {
    AdminContainer,
    AdminLoadingText,
    AdminPageHeader,
    AdminTable,
    AdminTableWrapper,
    AdminTd,
    AdminTh,
    AdminTitle,
} from "../../../components/admin/admin.style.tsx";
import Badge from "../../../components/common/badge/Badge.tsx";

function AdminCategoryListPage() {
    // useEffect를 통해 role을 판단하면 초기 렌더링이 끝난 후에 컴포넌트 내에서(화면이 그려진 후) 판별이 이루어짐
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // useEffect 안에서 비동기 함수를 async - await 방법으로 사용할거라면
        // 함수를 만들어서 감싸주고, 그걸 실행하도록 문법에 맞춰 적음
        // 그리고 그 함수 실행 역시 비동기 함수에 대한 실행이기 때문에
        // then(() => {})       아무것도 안 하는 then을 붙여줌

        const loadCategories = async () => {
            try {
                const data = await adminCategoryApi.fetchCategoryList();
                setCategories(data);
            } catch (error) {
                console.log(error);
                alert("카테고리 목록을 불러오는데 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        loadCategories().then(() => {});
    }, []);

    return (
        <AdminContainer>
            <AdminPageHeader>
                <AdminTitle>카테고리 관리</AdminTitle>
                <Button
                    color={"primary"}
                    variant={"contained"}
                    as={Link}
                    to={"/admin/category/create"}>
                    + 카테고리 추가
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
                                    <AdminTh $width={"65%"}>카테고리명</AdminTh>
                                    <AdminTh $width={"15%"}>상태</AdminTh>
                                    <AdminTh $width={"15%"}>관리</AdminTh>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.length === 0 && (
                                    <tr>
                                        <AdminTd
                                            colSpan={4}
                                            style={{ textAlign: "center", padding: "100px" }}>
                                            등록된 카테고리가 없습니다.
                                        </AdminTd>
                                    </tr>
                                )}
                                {categories.map(item => (
                                    <tr key={item.id}>
                                        <AdminTd>{item.id}</AdminTd>
                                        <AdminTd>{item.name}</AdminTd>
                                        <AdminTd>
                                            <Badge color={item.status === CategoryStatus.ACTIVE ? "success" : "secondary"}>
                                                {item.status === CategoryStatus.ACTIVE ? "활성" : "비활성"}
                                            </Badge>
                                        </AdminTd>
                                        <AdminTd>기능</AdminTd>
                                    </tr>
                                ))}
                            </tbody>
                        </AdminTable>
                    </AdminTableWrapper>
                )}
            </Card>
        </AdminContainer>
    );
}

export default AdminCategoryListPage;
