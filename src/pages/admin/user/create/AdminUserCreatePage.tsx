import {
    AdminButtonGroup,
    AdminContainer,
    AdminForm,
    AdminPageHeader,
    AdminTitle,
} from "../../../../components/admin/admin.style.tsx";
import Card from "../../../../components/common/card/Card.tsx";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    type AdminCreateUserInputType,
    adminCreateUserSchema,
} from "../../../../schemas/admin/user/adminCreateUserSchema.ts";
import InputGroup from "../../../../components/common/input/InputGroup.tsx";
import Button from "../../../../components/common/button/Button.tsx";
import SelectGroup from "../../../../components/common/select/SelectGroup.tsx";
import { Gender, Role } from "../../../../types/user.type.ts";
import adminUserApi from "../../../../api/admin/user/adminUserApi.ts";
import * as axios from "axios";
import { AuthRootErrorMessage } from "../../../../components/auth/auth.style.tsx";

function AdminUserCreatePage() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(adminCreateUserSchema),
        mode: "onBlur",
    });

    const onSubmit = async (data: AdminCreateUserInputType) => {
        try {
            await adminUserApi.createUser(data);
            alert("사용자 생성이 완료되었습니다.");
            navigate("/admin/user");
        } catch (error) {
            console.log(error);
            let errorMessage = "회원가입 중 오류가 발생했습니다.";
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            setError("root", { message: errorMessage });
        }
    };

    return (
        <AdminContainer>
            <AdminPageHeader>
                <AdminTitle>새 사용자 추가</AdminTitle>
            </AdminPageHeader>

            <Card>
                <AdminForm onSubmit={handleSubmit(onSubmit)} $wrap={true}>
                    <InputGroup
                        wrap={true}
                        label={"아이디"}
                        id={"username"}
                        errorMessage={errors.username?.message}
                        registerObj={register("username")}
                        placeholder={"4자 이상 필요"}
                    />

                    <InputGroup
                        wrap={true}
                        label={"비밀번호"}
                        id={"password"}
                        errorMessage={errors.password?.message}
                        registerObj={register("password")}
                        placeholder={"6자 이상 필요"}
                        type={"password"}
                    />

                    <InputGroup
                        wrap={true}
                        label={"이름"}
                        id={"name"}
                        errorMessage={errors.name?.message}
                        registerObj={register("name")}
                    />

                    <InputGroup
                        wrap={true}
                        label={"닉네임"}
                        id={"nickname"}
                        errorMessage={errors.nickname?.message}
                        registerObj={register("nickname")}
                        placeholder={"닉네임을 2자 이상 입력해주세요"}
                    />

                    <InputGroup
                        wrap={true}
                        label={"이메일"}
                        id={"email"}
                        errorMessage={errors.email?.message}
                        registerObj={register("email")}
                        type={"email"}
                    />

                    <InputGroup
                        wrap={true}
                        label={"전화번호"}
                        id={"phoneNumber"}
                        errorMessage={errors.phoneNumber?.message}
                        registerObj={register("phoneNumber")}
                        type={"tel"}
                    />

                    <InputGroup
                        wrap={true}
                        label={"생년월일"}
                        id={"birthdate"}
                        errorMessage={errors.birthdate?.message}
                        registerObj={register("birthdate")}
                        type={"date"}
                    />

                    <SelectGroup
                        wrap={true}
                        label={"성별"}
                        id={"gender"}
                        errorMessage={errors.gender?.message}
                        registerObj={register("gender")}>
                        <option value={""}>성별을 선택해주세요</option>
                        <option value={Gender.MALE}>남자</option>
                        <option value={Gender.FEMALE}>여자</option>
                    </SelectGroup>

                    <SelectGroup
                        wrap={true}
                        label={"종류"}
                        id={"role"}
                        errorMessage={errors.role?.message}
                        registerObj={register("role")}>
                        <option value={""}>종류를 선택해주세요</option>
                        <option value={Role.ADMIN}>관리자</option>
                        <option value={Role.USER}>일반 사용자</option>
                    </SelectGroup>

                    <div style={{ width: "100%", gap: "32px" }}>
                        {errors.root && (
                            <AuthRootErrorMessage>{errors.root?.message}</AuthRootErrorMessage>
                        )}
                        
                        <AdminButtonGroup $align={"right"}>
                            <Button color={"primary"} variant={"text"} as={Link} to={"/admin/user"}>
                                취소
                            </Button>
                            <Button
                                type={"submit"}
                                color={"success"}
                                variant={"contained"}
                                disabled={isSubmitting}>
                                등록
                            </Button>
                        </AdminButtonGroup>
                    </div>
                </AdminForm>
            </Card>
        </AdminContainer>
    );
}

export default AdminUserCreatePage;
