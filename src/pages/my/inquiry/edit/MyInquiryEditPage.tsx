import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type InquiryInputType, inquirySchema } from "../../../../schemas/inquiry/inquirySchema";
import inquiryApi from "../../../../api/user/inquiryApi.ts";
import {
    FormWrapper,
    LoadingText,
    PostContainer,
    PostPageHeader,
    PostTitle,
} from "../../../../components/post/post.style.tsx";
import InputGroup from "../../../../components/common/input/InputGroup.tsx";
import TextareaGroup from "../../../../components/common/textarea/TextareaGroup.tsx";
import {AdminButtonGroup} from "../../../../components/admin/admin.style.tsx";
import Button from "../../../../components/common/button/Button.tsx";
import { FiMessageSquare } from "react-icons/fi";

function MyInquiryEditPage() {
    // 사용자 측 "수정" 화면을 만들어야 해
    // 화면에서 받아서 전달해야 되는 정보 : title, content   (req.body)
    //         => schema가 필요하구나 => 생성 때 만든 schema가 있네 => 값이 같네? => 그냥 쓰면 되겠네
    // 문의 글 번호 : inquiryId (req.params)
    // 백엔드에게 요청해서 내용을 불러오고     => API를 만들어야 되는구나
    const navigate = useNavigate();
    // 구조분해할당 할 때 동일한 이름을 붙여서 변수를 만들어야 함
    const { inquiryId } = useParams<{ inquiryId: string }>();
    const id = Number(inquiryId);

    const [isLoading, setIsLoading] = useState(true);

    const {
        register,
        handleSubmit,
        reset, // 이 화면은 수정 화면 => input 현재 글 정보를 불러와서 넣어줘야 됨
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(inquirySchema),
        mode: "onBlur",
    });

    useEffect(() => {
        const loadInquiry = async () => {
            try {
                const result = await inquiryApi.getMyInquiryById(id);
                reset({
                    title: result.title,
                    content: result.content,
                });
            } catch (error) {
                console.log(error);
                alert("문의글을 불러오는데 실패하였습니다. 다시 시도하여 주세요.");
                navigate(-1);
            } finally {
                setIsLoading(false);
            }
        };

        loadInquiry().then(() => {});
    }, [id, navigate, reset]);

    const onSubmit = async (data: InquiryInputType) => {
        try {
            await inquiryApi.updateMyInquiry(id, data);
            navigate(`/my/inquiry/${id}`);
        } catch (error) {
            console.log(error);
            alert("문의 글 수정 중 오류가 발생되었습니다.");
        }
    };

    if (isLoading) {
        return (
            <PostContainer>
                <LoadingText>데이터를 불러오는 중입니다</LoadingText>
            </PostContainer>
        );
    }

    return (
        <PostContainer>
            <PostPageHeader>
                <PostTitle>
                    <FiMessageSquare size={26} style={{ color: "#FBBF24" }} />
                    1:1 문의 수정 <small>등록하신 문의 내용을 수정합니다.</small>
                </PostTitle>
            </PostPageHeader>

            <FormWrapper onSubmit={handleSubmit(onSubmit)}>
                <InputGroup
                    label={"문의 제목"}
                    id={"title"}
                    placeholder={"문의 사항의 제목을 입력해주세요"}
                    errorMessage={errors.title?.message}
                    registerObj={register("title")}
                />
                <TextareaGroup
                    label={"문의 내용"}
                    id={"content"}
                    placeholder={"발생된 문제점에 대해 자세히 입력해주세요."}
                    errorMessage={errors.content?.message}
                    registerObj={register("content")}
                />

                <AdminButtonGroup>
                    <Button color={"primary"} variant={"text"} onClick={() => navigate(-1)}>
                        취소
                    </Button>
                    <Button
                        type={"submit"}
                        color={"primary"}
                        variant={"contained"}
                        disabled={isSubmitting}>
                        등록
                    </Button>
                </AdminButtonGroup>
            </FormWrapper>
        </PostContainer>
    );
}

export default MyInquiryEditPage;