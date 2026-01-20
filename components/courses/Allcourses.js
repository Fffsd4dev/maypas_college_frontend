import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
    addSort,
    addCategory,
    clearCategory,
    clearDifficulty,
    clearInstructor,
    clearLanguage,
    clearPrice,
} from "../../features/courseFilterSlice";

import {
    clearCategoryToggle,
    clearDifficultyToggle,
    clearInstructorToggle,
    clearLanguageToggle,
    clearPriceToggle,
} from "../../features/courseSlice";

import CourseCard from "./CourseCard";
import { fetchCourses } from "@/util/courseApi";
import { getCategories } from "@/util/courseCategoryApi";

const Allcourses = () => {
    // 🔹 Local state
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // 🔹 Frontend pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);

    // 🔹 Redux
    const dispatch = useDispatch();
    const { courseList, courseSort } = useSelector(
        (state) => state.courseFilter
    );

    const {
        category,
        instructor,
        price,
        language,
        difficulty,
    } = courseList || {};

    const { sort } = courseSort;

    const router = useRouter();

    // 🔹 Sync category from URL → Redux
    useEffect(() => {
        const { category } = router.query;
        if (category) {
            const catArr = Array.isArray(category) ? category : [category];
            catArr.forEach((catId) => {
                dispatch(addCategory(String(catId)));
            });
        }
    }, [router.query.category, dispatch]);

    // 🔹 Fetch courses & categories
    useEffect(() => {
        setLoading(true);
        setError("");

        Promise.all([
            fetchCourses().then((data) =>
                Array.isArray(data) ? data : data.data || []
            ),
            getCategories().then((data) =>
                Array.isArray(data) ? data : data.data || []
            ),
        ])
            .then(([coursesArr, categoriesArr]) => {
                setCourses(coursesArr);
                setCategories(categoriesArr);
            })
            .catch(() => {
                setError(
                    "Oops, something went wrong. Please try again later."
                );
                setCourses([]);
                setCategories([]);
            })
            .finally(() => setLoading(false));
    }, []);

    // 🔹 Filters
    const categoryFilter = (item) =>
        !category || category.length === 0
            ? true
            : category.includes(String(item.course_category_id));

    const instructorFilter = (item) =>
        instructor?.length
            ? instructor.includes(
                  item?.instructor
                      ?.split(" ")
                      .join("")
                      .toLowerCase()
              )
            : true;

    const priceFilter = (item) =>
        price?.length ? price.includes(String(item?.price)) : true;

    const languageFilter = (item) =>
        language?.length
            ? language.includes(
                  item?.language
                      ?.split(" ")
                      .join("")
                      .toLowerCase()
              )
            : true;

    const difficultyFilter = (item) =>
        difficulty?.length
            ? difficulty.includes(
                  item?.difficulty
                      ?.split(" ")
                      .join("")
                      .toLowerCase()
              )
            : true;

    // 🔹 Sort
    const sortFilter = (a, b) => {
        if (sort === "des") return b.id - a.id;
        if (sort === "asc") return a.id - b.id;
        return 0;
    };

    // 🔹 Apply filters + sorting
    const filteredCourses = courses
        .filter(categoryFilter)
        .filter(instructorFilter)
        .filter(priceFilter)
        .filter(languageFilter)
        .filter(difficultyFilter)
        .sort(sortFilter);

    // 🔹 Pagination logic
    const totalPages = Math.ceil(
        filteredCourses.length / itemsPerPage
    );

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedCourses = filteredCourses.slice(
        startIndex,
        endIndex
    );

    // 🔹 Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [category, instructor, price, language, difficulty, sort]);

    // 🔹 Render courses
    const content = paginatedCourses.map((item) => (
        <div className="col" key={item.id}>
            <CourseCard
                item={item}
                categories={categories.map((cat) => ({
                    ...cat,
                    name: cat.name?.endsWith("s")
                        ? cat.name.slice(0, -1)
                        : cat.name,
                }))}
            />
        </div>
    ));

    // 🔹 Handlers
    const sortHandler = (e) => {
        dispatch(addSort(e.target.value));
    };

    const clearAll = () => {
        dispatch(clearInstructor());
        dispatch(clearCategory());
        dispatch(clearPrice());
        dispatch(clearLanguage());
        dispatch(clearDifficulty());
        dispatch(clearInstructorToggle());
        dispatch(clearCategoryToggle());
        dispatch(clearPriceToggle());
        dispatch(clearLanguageToggle());
        dispatch(clearDifficultyToggle());
        dispatch(addSort(""));
    };

    // 🔹 Clear category if removed from URL
    useEffect(() => {
        if (!router.query.category) {
            dispatch(clearCategory());
        }
    }, [router.query.category, dispatch]);

    return (
        <>
            <div className="shop-top-wrap courses-top-wrap">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className="shop-top-left">
                            {loading ? (
                                <p>Loading courses...</p>
                            ) : error ? (
                                <p style={{ color: "#ff4f4f" }}>
                                    {error}
                                </p>
                            ) : (
                                <p>
                                    We found{" "}
                                    {filteredCourses.length} courses
                                    for you
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="col-md-6 d-flex justify-content-end">
                        <select
                            value={sort}
                            className="orderby me-3"
                            onChange={sortHandler}
                        >
                            <option value="">
                                Sort by (default)
                            </option>
                            <option value="asc">Newest</option>
                            <option value="des">Oldest</option>
                        </select>

                        <select
                            className="form-select"
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(
                                    Number(e.target.value)
                                );
                                setCurrentPage(1);
                            }}
                        >
                            <option value={12}>12 per page</option>
                            <option value={20}>20 per page</option>
                            <option value={30}>30 per page</option>
                            <option value={filteredCourses.length}>
                                All
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="row courses__grid-wrap row-cols-1 row-cols-xl-3 row-cols-lg-2">
                {loading || error ? null : content}
            </div>

            {/* Pagination controls */}
            <div className="d-flex justify-content-center mt-4">
                <button
                    className="btn btn-outline-secondary me-2"
                    disabled={currentPage === 1}
                    onClick={() =>
                        setCurrentPage((p) => p - 1)
                    }
                >
                    Prev
                </button>

                <span className="align-self-center">
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    className="btn btn-outline-secondary ms-2"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                        setCurrentPage((p) => p + 1)
                    }
                >
                    Next
                </button>
            </div>
        </>
    );
};

export default Allcourses;
