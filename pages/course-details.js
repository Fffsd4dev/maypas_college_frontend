import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCategories } from "@/util/courseCategoryApi";

export default function CourseDetails() {
    const router = useRouter();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [categories, setCategories] = useState([]);

    const courseId = router.query.id;

    useEffect(() => {
        if (!courseId) return;
        setLoading(true);
        setError("");
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/course/get/${courseId}`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch course details");
                return res.json();
            })
            .then(data => setCourse(data))
            .catch(() => setError("Oops, something went wrong. Please try again later."))
            .finally(() => setLoading(false));
    }, [courseId]);

    useEffect(() => {
        getCategories()
            .then(data => {
                const arr = Array.isArray(data) ? data : data.data || [];
                setCategories(arr);
            })
            .catch(() => {});
    }, []);

    const categoryName = categories.find(cat => String(cat.id) === String(course?.course_category_id))?.name || course?.course_category_id;

    return (
        <Layout headerStyle={3} footerStyle={1} breadcrumbTitle="Course Details">
            <section className="courses__breadcrumb-area">
                <div className="container">
                    {loading ? (
                        <div style={{ textAlign: "center", margin: "2rem" }}>Loading...</div>
                    ) : error ? (
                        <div style={{ textAlign: "center", margin: "2rem", color: "#ff4f4f" }}>{error}</div>
                    ) : course ? (
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="courses__breadcrumb-content">
                                    <div style={{ marginBottom: 10 }}>
                                        <span className="category" style={{ fontWeight: 600, color: "#4f8cff" }}>
                                            {categoryName}
                                        </span>
                                    </div>
                                    <h3 className="title">{course.title}</h3>
                                    <p>{course.excerpt}</p>
                                    <img
                                        src={
                                            course.featured_image_path
                                                ? process.env.NEXT_PUBLIC_API_BASE_URL + "/storage/" + course.featured_image_path
                                                : "/assets/img/courses/default.png"
                                        }
                                        alt={course.title}
                                        style={{ maxWidth: 300, marginBottom: 20 }}
                                    />
                                    <div>
                                        <strong>Description:</strong>
                                        <p>{course.description}</p>
                                    </div>
                                    <div>
                                        <strong>Price:</strong> ${course.price}
                                    </div>
                                    <div>
                                        <strong>Created At:</strong> {course.created_at}
                                    </div>
                                    <div>
                                        <strong>Updated At:</strong> {course.updated_at}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ textAlign: "center", margin: "2rem" }}>Course not found.</div>
                    )}
                </div>
            </section>
        </Layout>
    );
}