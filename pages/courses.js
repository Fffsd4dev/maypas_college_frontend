import Allcourses from "@/components/courses/Allcourses"
import FilterCourses from "@/components/courses/FilterCourses"
import Layout from "@/components/layout/Layout"
import { useState, useEffect } from "react"
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addCategory, clearCategory } from "../features/courseFilterSlice";

export default function Courses() {
    const [activeIndex, setActiveIndex] = useState(1)
    const handleOnClick = (index) => {
        setActiveIndex(index)
    }

    const router = useRouter();
    const dispatch = useDispatch();

    // Sync Redux filter with URL query
    useEffect(() => {
        const { category } = router.query;
        if (category) {
            dispatch(clearCategory());
            const catArr = Array.isArray(category) ? category : [category];
            catArr.forEach(catId => {
                dispatch(addCategory(String(catId)));
            });
        } else {
            dispatch(clearCategory());
        }
    }, [router.query.category, dispatch]);

    return (
        <>
            <Layout headerStyle={3} footerStyle={1} breadcrumbTitle="Our Courses">
                <section className="all-courses-area section-py-120">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-lg-4 order-2 order-lg-0">
                                <FilterCourses />
                            </div>
                            <div className="col-xl-9 col-lg-8">
                                <div className="tab-content" id="myTabContent">
                                    <div className={activeIndex === 1 ? "tab-pane fade show active" : "tab-pane fade"}>
                                        <Allcourses />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}