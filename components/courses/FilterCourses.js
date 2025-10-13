import { useEffect, useState } from "react";
import { getCategories } from "@/util/courseCategoryApi";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../features/courseFilterSlice";

export default function FilterCourses() {
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    const selectedCategories = useSelector((state) => state.courseFilter.courseList.category);

    useEffect(() => {
        getCategories().then((data) => {
            const arr = Array.isArray(data) ? data : data.data || [];
            setCategories(arr);
        });
    }, []);

    const handleCategoryChange = (id) => {
        dispatch(addCategory(id));
    };

    return (
        <div className="filter-categories">
            <h5>Programmes</h5>
            <div className="divider" />
                {categories.map((cat) => (
                    <p key={cat.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedCategories?.includes(String(cat.id))}
                                onChange={() => handleCategoryChange(String(cat.id))}
                            />
                         {"  "}{cat.name}
                        </label>
                    </p>
                ))}
            
        </div>
    );
}