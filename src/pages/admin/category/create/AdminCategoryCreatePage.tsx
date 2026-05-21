import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminCreateCategorySchema } from "../../../../schemas/admin/category/adminCreateCategorySchema.ts";
import { AdminButtonGroup, AdminContainer, AdminForm, AdminPageHeader, AdminTitle } from "../../../../components/admin/admin.style.tsx";
import Card from "../../../../components/common/card/Card.tsx";
import InputGroup from "../../../../components/common/input/InputGroup.tsx";
import Button from "../../../../components/common/button/Button.tsx";
import { Link } from "react-router";

function AdminCategoryCreatePage() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(adminCreateCategorySchema),
        mode: "onBlur",
    });

    const onSubmit = () => {

    }

    return <AdminContainer>
        <AdminPageHeader>
            <AdminTitle>새 카테고리 추가</AdminTitle>
        </AdminPageHeader>

        <Card>
            <AdminForm onSubmit={handleSubmit(onSubmit)}>
                <InputGroup
                    id={"name"}
                    label={"카테고리 이름"}
                    placeholder={"추가할 카테고리를 입력하세요 (최대 50자)"}
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
                    <Button type={"submit"} variant={"contained"} color={"primary"}>
                        등록
                    </Button>
                </AdminButtonGroup>
            </AdminForm>
        </Card>
    </AdminContainer>;
}

export default AdminCategoryCreatePage;