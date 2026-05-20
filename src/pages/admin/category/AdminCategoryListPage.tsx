import { useEffect, useState } from "react";
import adminCategoryApi from "../../../api/admin/adminCategoryApi.ts";
import type { Category } from "../../../types/category.type.ts";

function AdminCategoryListPage() {
    // useEffect를 통해 role을 판단하면 초기 렌더링이 끝난 후에 컴포넌트 내에서(화면이 그려진 후) 판별이 이루어짐
    const [categiries, setCategories] = useState<Category[]>([]);
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

    return <></>;
}

export default AdminCategoryListPage;