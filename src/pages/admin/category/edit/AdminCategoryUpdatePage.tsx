import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    type AdminEditCategoryInputType,
    adminEditCategorySchema,
} from "../../../../schemas/admin/edit/adminEditCategorySchema.ts";
import {
    AdminButtonGroup,
    AdminContainer,
    AdminForm, AdminLoadingText,
    AdminPageHeader,
    AdminTitle,
} from "../../../../components/admin/admin.style.tsx";
import Card from "../../../../components/common/card/Card.tsx";
import InputGroup from "../../../../components/common/input/InputGroup.tsx";
import Button from "../../../../components/common/button/Button.tsx";
import { Link, useNavigate, useParams } from "react-router";
import adminCategoryApi from "../../../../api/admin/adminCategoryApi.ts";
import * as axios from "axios";
import { useEffect, useState } from "react";

function AdminCategoryUpdatePage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(adminEditCategorySchema),
        mode: "onBlur",
    });

    useEffect(() => {
        const loadInitialData = async () => {
            if (!id) return;
            try {
                const result = await adminCategoryApi.fetchCategoryById(Number(id));
                setValue("name", result.name);
            } catch (error) {
                console.log(error);
                alert("존재하지 않거나 삭제된 카테고리입니다.");
                navigate("/admin/category");
            } finally {
                setLoading(false);
            }
        };

        loadInitialData().then(() => {});
    }, [id, navigate, setValue]);

    const onSubmit = async (data: AdminEditCategoryInputType) => {
        try {
            await adminCategoryApi.updateCategory(Number(id), data);
            alert("Successfully updated category!");
            navigate("/admin/category");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 409) {
                setError("name", { message: "이미 존재하는 카테고리 명입니다." });
            } else {
                alert("카테고리 수정 중 오류가 발생했습니다.");
            }
        }
    };

    return (
        <AdminContainer>
            <AdminPageHeader>
                <AdminTitle>새 카테고리 수정</AdminTitle>
            </AdminPageHeader>

            <Card>
                {loading ? (
                        <AdminLoadingText>데이터를 불러오는 중...</AdminLoadingText>
                    ) :
                    <AdminForm onSubmit={handleSubmit(onSubmit)}>
                    <InputGroup
                        id={"name"}
                        label={"카테고리 이름"}
                        placeholder={"수정할 카테고리를 입력하세요 (최대 50자)"}
                        errorMessage={errors.name?.message}
                        registerObj={register("name")}
                    />
                    <AdminButtonGroup>
                        <Button
                            color={"secondary"}
                            variant={"text"}
                            as={Link}
                            to={"/admin/category"}>
                            최소
                        </Button>
                        <Button
                            type={"submit"}
                            variant={"contained"}
                            color={"primary"}
                            disabled={isSubmitting}>
                            수정
                        </Button>
                    </AdminButtonGroup>
                </AdminForm>
                }
            </Card>
        </AdminContainer>
    );
}

export default AdminCategoryUpdatePage;
