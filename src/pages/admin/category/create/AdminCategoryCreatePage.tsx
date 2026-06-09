import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    type AdminCreateCategoryInputType,
    adminCreateCategorySchema,
} from "../../../../schemas/admin/category/adminCreateCategorySchema.ts";
import {
    AdminButtonGroup,
    AdminContainer,
    AdminForm,
    AdminPageHeader,
    AdminTitle,
} from "../../../../components/admin/admin.style.tsx";
import Card from "../../../../components/common/card/Card.tsx";
import InputGroup from "../../../../components/common/input/InputGroup.tsx";
import Button from "../../../../components/common/button/Button.tsx";
import { Link, useNavigate } from "react-router";
import adminCategoryApi from "../../../../api/admin/adminCategoryApi.ts";
import * as axios from "axios";

function AdminCategoryCreatePage() {
    const navigate = useNavigate();

    // 구조분해할당을 통해 값을 바로 꺼내서 변수에 저장하는 행위는
    // 모든 값들을 뽑지 않아도 됨. 내가 필요한 것만 뽑아올 수 있음
    const {
        // 화면에 있는 input과 react-hook-form이 관리하는 state를 연결
        register,
        // 시용자가 onSubmit(form 태그 속성)을 발동시킬 때
        // react-hook-form을 통해 각 input에 걸어놓은 조건 검사(유효성 검사)를
        // 진행하고, 이후 handleSubmit()에 전달해준 실제 실행 함수로
        // 값을 전달
        handleSubmit,
        // error를 set한다 (error를 수동으로 집어넣을 수 있는 기능)
        setError,
        // errors: 에러 객체, setError를 통해 집어넣은 에러 내용(값이) 자동으로 기록되는 객체
        // isSubmitting : form의 제출(submit)을 하고 있다라는 상태를 나타내는 state
        //                평상시엔 false가 저장 되어져 있는데
        //                form의 onSubmit 속성이 발동 중일 때
        //                즉, handleSubmit부터 onSubmit 함수가 발동 중일 때 true
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(adminCreateCategorySchema),
        mode: "onBlur",
    });

    // useForm<제네릭을통해관리할state모양(타입)을지정>(옵션객체)

    const onSubmit = async (data: AdminCreateCategoryInputType) => {
        try {
            // adminCategoryApi.createCategory() 메서드는 리턴을 하지만,
            // 우리가 쓸모가 없으면, 그냥 버리면 됨
            await adminCategoryApi.createCategory(data);
            alert("카테고리가 성공적으로 추가되었습니다.");
            navigate("/admin/category");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 409) {
                setError("name", { message: "이미 존재하는 카테고리 명입니다." });
            } else {
                alert("카테고리 생성 중 오류가 발생했습니다.");
            }
        }
    };

    return (
        <AdminContainer>
            <AdminPageHeader>
                <AdminTitle>새 카테고리 추가</AdminTitle>
            </AdminPageHeader>

            <Card>
                <AdminForm onSubmit={handleSubmit(onSubmit)}>
                    <InputGroup
                        id={"name"}
                        label={"카테고리 이름"}
                        placeholder={"추가할 카테고리명을 입력하세요 (최대 50자)"}
                        errorMessage={errors.name?.message}
                        registerObj={register("name")}
                    />
                    <AdminButtonGroup>
                        <Button
                            color={"secondary"}
                            variant={"text"}
                            as={Link}
                            to={"/admin/category"}>
                            취소
                        </Button>
                        <Button
                            type={"submit"}
                            variant={"contained"}
                            color={"primary"}
                            disabled={isSubmitting}>
                            등록
                        </Button>
                    </AdminButtonGroup>
                </AdminForm>
            </Card>
        </AdminContainer>
    );
}

export default AdminCategoryCreatePage;
