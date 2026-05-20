import { useEffect, useState } from "react";
import adminCategoryApi from "../../../api/admin/adminCategoryApi.ts";
import type { Category } from "../../../types/category.type.ts";

function AdminCategoryListPage() {
    // useEffect를 통해 role을 판단하면 초기 렌더링이 끝난 후에 컴포넌트 내에서(화면이 그려진 후) 판별이 이루어짐
    const [categiries, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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
        }

        loadCategories().then(() => {});
    }, []);

    return <></>;
}

export default AdminCategoryListPage;