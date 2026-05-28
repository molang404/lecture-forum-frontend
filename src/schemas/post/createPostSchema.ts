import { z } from "zod";

// 백엔드에서 제공되었던 schema와 프론트앤드에서 사용해야 할 schema는 다른 지점이 있음
// option1Text를 사용자를 통해 입력됐다면, option2Text도 존재하는지 체크해야 함

// 회원가입 시에 password 항목과 passwordConfirm 항목이 값이 같은지 체크했던 것과 비슷함
export const createPostSchema = z
    .object({
        title: z
            .string()
            .min(1, "제목을 입력해주세요.")
            .max(255, "제목은 255자를 넘을 수 없습니다."),
        content: z.string().min(1, "내용을 입력해주세요."),
        categoryId: z.number().positive("유효한 카테고리 ID가 필요합니다."),
        option1Text: z.string().max(50, "투표 선택지 내용은 50자 이하로 입력해주세요.").optional(),
        option2Text: z.string().max(50, "투표 선택지 내용은 50자 이하로 입력해주세요.").optional(),
    })
    .refine(
        data => {
            const hasOpt1 = !!data.option1Text?.trim();
            const hasOpt2 = !!data.option2Text?.trim();
            return hasOpt1 && hasOpt2;
        },
        {
            path: ["root"],
            message: "투표 기능을 사용하려면 1번과 2번 항목을 모두 입력해야 합니다.",
        },
    );

export type CreatePostInputType = z.infer<typeof createPostSchema>;
