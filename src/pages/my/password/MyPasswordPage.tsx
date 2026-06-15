import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    type UpdatePasswordInputType,
    updatePasswordSchema,
} from "../../../schemas/user/updatePasswordSchema.ts";
import {
    FormWrapper,
    PostContainer,
    PostPageHeader,
    PostTitle,
} from "../../../components/post/post.style.tsx";
import userApi from "../../../api/user/userApi.ts";
import { isAxiosError } from "axios";
import Card from "../../../components/common/card/Card.tsx";
import InputGroup from "../../../components/common/input/InputGroup.tsx";
import { AdminButtonGroup } from "../../../components/admin/admin.style.tsx";
import Button from "../../../components/common/button/Button.tsx";

function MyPasswordPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: zodResolver(updatePasswordSchema),
        mode: "onBlur",
    });

    const onSubmit = async (data: UpdatePasswordInputType) => {
        try {
            await userApi.updatePassword(data);
            alert("비밀번호 수정이 완료되었습니다.");
            reset({
                prevPassword: "",
                password: "",
                confirmPassword: "",
            });
        } catch (error) {
            console.log(error);
            let errorMessage = "회원 정보 수정 중 오류가 발생했습니다.";
            if (isAxiosError(error)) {
                errorMessage = error.response?.data.message || errorMessage;
            }
            alert(errorMessage);
        }
    };

    return (
        <PostContainer>
            <PostPageHeader>
                <PostTitle>비밀번호 수정</PostTitle>{" "}
                <small>소중한 내 비밀번호를 최신 상태로 관리하세요</small>
            </PostPageHeader>

            <Card>
                <FormWrapper onSubmit={handleSubmit(onSubmit)}>
                    <InputGroup
                        label={"현재 비밀번호"}
                        id={"prevPassword"}
                        placeholder={"현재 비밀번호를 입력하세요"}
                        errorMessage={errors.prevPassword?.message}
                        registerObj={register("prevPassword")}
                        type={"password"}
                    />

                    <InputGroup
                        label={"변경 비밀번호"}
                        id={"password"}
                        placeholder={"변경할 비밀번호 입력하세요"}
                        errorMessage={errors.password?.message}
                        registerObj={register("password")}
                        type={"password"}
                    />

                    <InputGroup
                        label={"변경할 비밀번호 확인"}
                        id={"confirmPassword"}
                        placeholder={"변경할 비밀번호를 다시 입력해주세요"}
                        errorMessage={errors.confirmPassword?.message}
                        registerObj={register("confirmPassword")}
                        type={""}
                    />

                    <AdminButtonGroup $align={"right"}>
                        <Button
                            color={"primary"}
                            variant={"contained"}
                            disabled={isSubmitting}
                            type={"submit"}>
                            비밀번호 변경
                        </Button>
                    </AdminButtonGroup>
                </FormWrapper>
            </Card>
        </PostContainer>
    );
}

export default MyPasswordPage;
