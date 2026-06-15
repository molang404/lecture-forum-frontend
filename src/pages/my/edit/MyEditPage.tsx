import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    type UpdateUserInputType,
    updateUserSchema,
} from "../../../schemas/user/updateUserSchema.ts";
import {
    FormWrapper,
    PostContainer,
    PostPageHeader,
    PostTitle,
} from "../../../components/post/post.style.tsx";
import Card from "../../../components/common/card/Card.tsx";
import InputGroup from "../../../components/common/input/InputGroup.tsx";
import { AdminButtonGroup } from "../../../components/admin/admin.style.tsx";
import Button from "../../../components/common/button/Button.tsx";
import userApi from "../../../api/user/userApi.ts";
import { isAxiosError } from "axios";
import { useAuthStore } from "../../../stores/auth/authStore.ts";
import { useEffect } from "react";

function MyEditPage() {
    // useEffect를 쓰고, 그 안에서 loadUser라는 함수를 만들어서 백엔드에게 데이터를 가져오고
    // 그 데이터를 사용해서 화면에다가 출력 => 필요하면 해야함

    // 하지만, 지금 우리는 이 프로젝트에서 사용자 로그인 정보 유지를 zustand(useAuthStore)에 맡기고 있고
    // login이라는 화면에서 로그인 처리할 때, useAuthStore에 token과 isLoggedIn이라는 항목을 통해
    // 현재 사용자 정보를 저장 중임
    const { user } = useAuthStore();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(updateUserSchema),
        mode: "onBlur",
    });

    useEffect(() => {
        if (user) {
            reset({
                nickname: user.nickname,
                email: user.email,
                phoneNumber: user.phoneNumber || "",
            });
        }
    }, [user, reset]);

    const onSubmit = async (data: UpdateUserInputType) => {
        try {
            const result = await userApi.updateUser(data);
            alert("회원 정보가 성공적으로 수정 되었습니다.");
            // AuthStore에 저장되어져 있는 값도 변경
            useAuthStore.setState({ user: result });
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
                <PostTitle>회원정보 수정</PostTitle>{" "}
                <small>소중한 내 정보를 최신 상태로 관리하세요</small>
            </PostPageHeader>

            <Card>
                <FormWrapper onSubmit={handleSubmit(onSubmit)}>
                    <InputGroup
                        label={"아이디"}
                        id={"username"}
                        readOnly={true}
                        disabled={true}
                        value={user?.username}
                    />

                    <InputGroup
                        label={"이름"}
                        id={"name"}
                        readOnly={true}
                        disabled={true}
                        value={user?.name}
                    />

                    <InputGroup
                        label={"닉네임"}
                        id={"nickname"}
                        placeholder={"새로운 닉네임을 입력하세요"}
                        errorMessage={errors.nickname?.message}
                        registerObj={register("nickname")}
                    />

                    <InputGroup
                        label={"이메일"}
                        id={"email"}
                        placeholder={"새로운 이메일을 입력하세요"}
                        errorMessage={errors.email?.message}
                        registerObj={register("email")}
                    />

                    <InputGroup
                        label={"휴대폰 번호 (선택)"}
                        id={"phoneNumber"}
                        placeholder={"010-0000-0000"}
                        errorMessage={errors.phoneNumber?.message}
                        registerObj={register("phoneNumber")}
                    />

                    <AdminButtonGroup $align={"right"}>
                        <Button
                            color={"primary"}
                            variant={"contained"}
                            disabled={isSubmitting}
                            type={"submit"}>
                            회원정보 변경
                        </Button>
                    </AdminButtonGroup>
                </FormWrapper>
            </Card>
        </PostContainer>
    );
}

export default MyEditPage;
