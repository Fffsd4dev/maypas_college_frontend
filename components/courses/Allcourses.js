import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    addPerPage,
    addSort,
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
    clearPriceToggle
} from "../../features/courseSlice";
import CourseCard from "./CourseCard";
import { fetchCourses } from "@/util/courseApi";
import { getCategories } from "@/util/courseCategoryApi";

const Allcourses = () => {
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { courseList, courseSort } = useSelector((state) => state.courseFilter);
    const {
        category,
        instructor,
        price,
        language,
        difficulty,
    } = courseList || {};
    const { sort, perPage } = courseSort;
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        setError("");
        Promise.all([
            fetchCourses().then((data) => Array.isArray(data) ? data : data.data || []),
            getCategories().then((data) => Array.isArray(data) ? data : data.data || [])
        ])
        .then(([coursesArr, categoriesArr]) => {
            setCourses(coursesArr);
            setCategories(categoriesArr);
        })
        .catch(() => {
            setError("Oops, something went wrong. Please try again later.");
            setCourses([]);
            setCategories([]);
        })
        .finally(() => setLoading(false));
    }, []);

    // category filter (using backend category id)
    const categoryFilter = (item) =>
        category?.length !== 0
            ? category?.includes(String(item.course_category_id))
            : item;

    // Instructors filter
    const instructorFilter = (item) =>
        instructor?.length !== 0
            ? instructor?.includes(
                item?.instructor?.split(" ").join("").toLocaleLowerCase()
            )
            : item;

    // price filter
    const priceFilter = (item) =>
        price?.length !== 0
            ? price?.includes(
                String(item?.price)
            )
            : item;

    // language filter
    const languageFilter = (item) =>
        language?.length !== 0
            ? language?.includes(
                item?.language?.split(" ").join("").toLocaleLowerCase()
            )
            : item;

    // difficulty filter
    const difficultyFilter = (item) =>
        difficulty?.length !== 0
            ? difficulty?.includes(
                item?.difficulty?.split(" ").join("").toLocaleLowerCase()
            )
            : item;

    // sort filter
    const sortFilter = (a, b) =>
        sort === "des"
            ? a.id > b.id && -1
            : a.id < b.id && -1;

    let content = courses
        ?.filter(categoryFilter)
        ?.filter(instructorFilter)
        ?.filter(priceFilter)
        ?.filter(languageFilter)
        ?.filter(difficultyFilter)
        ?.sort(sortFilter)
        .slice(perPage.start, perPage.end !== 0 ? perPage.end : 12)
        ?.map((item) => (
            <div className="col" key={item.id}>
                <CourseCard item={item} categories={categories} />
            </div>
        ));

    // sort handler
    const sortHandler = (e) => {
        dispatch(addSort(e.target.value));
    };

    // per page handler
    const perPageHandler = (e) => {
        const pageData = JSON.parse(e.target.value);
        dispatch(addPerPage(pageData));
    };

    // clear all filters
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
        dispatch(addPerPage({ start: 0, end: 0 }));
    };

    return (
        <>
            <div className="shop-top-wrap courses-top-wrap">
                <div className="row align-items-center">
                    <div className="col-md-6">
                        <div className="shop-top-left">
                            {loading ? (
                                <p>Loading courses...</p>
                            ) : error ? (
                                <p style={{ color: "#ff4f4f" }}>{error}</p>
                            ) : (
                                <p>We found {content?.length} courses for you</p>
                            )}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="d-flex justify-content-center justify-content-md-end align-items-center">
                            <div>
                                {
                                    category?.length !== 0 ||
                                        instructor?.length !== 0 ||
                                        price?.length !== 0 ||
                                        language?.length !== 0 ||
                                        difficulty?.length !== 0 ||
                                        sort !== "" ||
                                        perPage.start !== 0 ||
                                        perPage.end !== 0
                                        ? (
                                            <button
                                                onClick={clearAll}
                                                className="btn btn-reset text-nowrap me-2"
                                            >
                                                Reset
                                            </button>
                                        ) : undefined
                                }
                            </div>
                            <div className="shop-top-right m-0 ms-md-auto">
                                <select
                                    value={sort}
                                    name="orderby" className="orderby"
                                    onChange={sortHandler}
                                >
                                    <option value="">Sort by (default)</option>
                                    <option value="asc">Newest</option>
                                    <option value="des">Oldest</option>
                                </select>
                            </div>
                            <div>
                                <select
                                    onChange={perPageHandler}
                                    className="chosen-single form-select ms-3 "
                                    value={JSON.stringify(perPage)}
                                >
                                    <option
                                        value={JSON.stringify({
                                            start: 0,
                                            end: 0,
                                        })}
                                    >
                                        All
                                    </option>
                                    <option
                                        value={JSON.stringify({
                                            start: 0,
                                            end: 10,
                                        })}
                                    >
                                        10 per page
                                    </option>
                                    <option
                                        value={JSON.stringify({
                                            start: 0,
                                            end: 20,
                                        })}
                                    >
                                        20 per page
                                    </option>
                                    <option
                                        value={JSON.stringify({
                                            start: 0,
                                            end: 30,
                                        })}
                                    >
                                        30 per page
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row courses__grid-wrap row-cols-1 row-cols-xl-3 row-cols-lg-2 row-cols-md-2 row-cols-sm-1">
                {loading || error ? null : content}
            </div>
        </>
    );
};

export default Allcourses;