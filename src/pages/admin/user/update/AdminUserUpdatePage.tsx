import {
    AdminButtonGroup,
    AdminContainer,
    AdminForm,
    AdminLoadingText,
    AdminPageHeader,
    AdminTitle,
} from "../../../../components/admin/admin.style.tsx";
import Card from "../../../../components/common/card/Card.tsx";
import InputGroup from "../../../../components/common/input/InputGroup.tsx";
import SelectGroup from "../../../../components/common/select/SelectGroup.tsx";
import { Gender, Role } from "../../../../types/user.type.ts";
import { AuthRootErrorMessage } from "../../../../components/auth/auth.style.tsx";
import Button from "../../../../components/common/button/Button.tsx";
import { Link, useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    type AdminUpdateUserInputType,
    adminUpdateUserSchema,
} from "../../../../schemas/admin/user/adminUpdateUserSchema.ts";
import adminUserApi from "../../../../api/admin/user/adminUserApi.ts";
import * as axios from "axios";
import { useEffect, useState } from "react";

function AdminUserUpdatePage() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    const [isLoading, setIsLoading] = useState(true);

    const {
        register,
        handleSubmit,
        setError,
        reset, // 새로이 react-hook-form이 관리하는 state 값을 리셋
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(adminUpdateUserSchema),
        mode: "onBlur",
    });

    useEffect(() => {
        const loadUser = async () => {
            try {
                const result = await adminUserApi.fetchUserById(Number(id));

                // 데이터 베이스를 조회해서 backend가 전달해 준 날짜-시간 관련 값은
                // 2026-05-22T00:00:00.000Z 형태 (ISO 8601 국제 표준 날짜 및 시간 표기법)
                // input type="date"로 지정한 input은 "2026-05-22" 형태를 받아야 함
                // 결국 ISO 8601 표기법의 값 중 T부터 뒷 부분을 잘라 전달해줘야 정상 출력됨
                reset({
                    username: result.username,
                    name: result.name,
                    nickname: result.nickname,
                    email: result.email,
                    gender: result.gender,
                    role: result.role,
                    phoneNumber: result.phoneNumber ?? undefined,
                    birthdate: result.birthdate ? result.birthdate.split("T")[0] : undefined,
                });
            } catch (error) {
                console.log(error);
                alert("사용자 정보를 불러오는 도중 오류가 발생했습니다.");
                navigate("/admin/user");
            } finally {
                setIsLoading(false);
            }
        };

        loadUser().then(() => {});
    }, [id, navigate, reset]);

    const onSubmit = async (data: AdminUpdateUserInputType) => {
        try {
            await adminUserApi.updateUser(Number(id), data);
            alert("사용자 정보의 업데이트가 완료 되었습니다.");
            navigate("/admin/user");
        } catch (error) {
            // backend에서 여러가지 이유로 실패됐다는 내용을 전달해줄 수 있음
            // 어떠한 에러가 도착하든, 저 text만 화면에 출력하고 끝내겠다
            // console.log(error);
            // setError("root", { message: "사용자 정보의 업데이트에 실패했습니다."});

            if (axios.isAxiosError(error)) {
                setError("root", { message: error.response?.data?.message });
            }
            setError("root", { message: "사용자 정보의 업데이트에 실패했습니다." });
        }
    };

    return (
        <AdminContainer>
            <AdminPageHeader>
                <AdminTitle>사용자 정보 변경</AdminTitle>
            </AdminPageHeader>

            <Card>
                {isLoading ? (
                    <AdminLoadingText>데이터를 불러오는 중...</AdminLoadingText>
                ) : (
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
                                <Button
                                    color={"primary"}
                                    variant={"text"}
                                    as={Link}
                                    to={"/admin/user"}>
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
                )}
            </Card>
        </AdminContainer>
    );
}

export default AdminUserUpdatePage;
