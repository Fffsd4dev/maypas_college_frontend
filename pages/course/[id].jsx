import VideoPopup from "@/components/elements/VidepPopup"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { getCategories } from "@/util/courseCategoryApi"
import { fetchCourses } from "@/util/courseApi"

const CourseSingle = () => {
    const router = useRouter()
    const [course, setCourse] = useState(null)
    const [categories, setCategories] = useState([])
    const [relatedCourses, setRelatedCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const id = router.query.id

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        setError("");
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/course/get/${id}`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch course details");
                return res.json();
            })
            .then(data => setCourse(data))
            .catch(() => setError("Oops, something went wrong. Please try again later."))
            .finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        getCategories()
            .then(data => {
                const arr = Array.isArray(data) ? data : data.data || [];
                setCategories(arr);
            })
            .catch(() => {});
    }, []);

    useEffect(() => {
        if (!course?.course_category_id) return;
        fetchCourses().then(data => {
            const arr = Array.isArray(data) ? data : data.data || [];
            // Filter out current course and match category, limit to 4
            const related = arr
                .filter(c => String(c.course_category_id) === String(course.course_category_id) && String(c.id) !== String(course.id))
                .slice(0, 4);
            setRelatedCourses(related);
        });
    }, [course]);

    const categoryName = categories.find(cat => String(cat.id) === String(course?.course_category_id))?.name || course?.course_category_id;

       const [activeIndex, setActiveIndex] = useState(1)
    const handleOnClick = (index) => {
        setActiveIndex(index)
    }
    const [isActive, setIsActive] = useState({
        status: false,
        key: 1,
    })

    const handleToggle = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            })
        } else {
            setIsActive({
                status: true,
                key,
            })
        }
    }

    return (
        <Layout headerStyle={3} footerStyle={1}>
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
                                    <span className="category" style={{ fontWeight: 600, color: "#4f8cff" }}>
                                        {categoryName}
                                    </span>
                                    <h3 className="title">{course.title}</h3>
                                    <p>{course.excerpt}</p>
                                   <img
    src={
        course && course.featured_image_path
            ? process.env.NEXT_PUBLIC_API_BASE_URL + "/storage/" + course.featured_image_path
            : "/assets/img/courses/default.png"
    }
    alt={course ? course.title : "Course image"}
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
                                        {/* <strong>Created At:</strong> {course.created_at} */}
                                    </div>
                                    <div>
                                        {/* <strong>Updated At:</strong> {course.updated_at} */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4">
                               
                            </div>
                        </div>
                    ) : (
                        <div style={{ textAlign: "center", margin: "2rem" }}>Course not found.</div>
                    )}
                </div>
            </section>
            <section className="courses-details-area section-pb-120">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9 col-lg-8">
                                <div className="courses__details-wrapper">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        {/* <li className="nav-item" onClick={() => handleOnClick(1)}>
                                            <button className={activeIndex === 1 ? "nav-link active" : "nav-link"}>Course Information</button>
                                        </li> */}
                                        <li className="nav-item" onClick={() => handleOnClick(2)}>
                                            <button className={activeIndex === 1 ? "nav-link active" : "nav-link"}>Reviews</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        
                                        {/* <div className={activeIndex === 1 ? "tab-pane active" : "tab-pane"}>
                                            <div className="courses__details-content">
                                                <p>This tutorial will help you learn quickly and thoroughly. Lorem ipsum, or lipsum as it is sometimes known, iaws dumm text used in laying out print, graphic or web designs. Lorem ipsum dolor sit amet, consectetuer adipiscingawr elit onec odio. Quisque volutpat mattis eros.</p>
                                                <p>You’ll be exposed to principles and strategies, but, more importantly, you’ll learn how to actually apply these abstract concepts by coding three different websites for three very different audiences. Lorem ipsum is dummy text used in laying out print, graphic or web designs Lorem ipsum</p>
                                                <div className="courses__details-inner">
                                                    <h3 className="title">What Will You Learn?</h3>
                                                    <p>This tutorial will help you learn quickly and thoroughly. Lorem ipsum, or lipsum as it is sometimes known, iaws dumm text used in laying out print, graphic or web designsm dolor sit amet.</p>
                                                    <div className="event-details-list">
                                                        <ul className="list-wrap">
                                                            <li><i className="fas fa-check-circle" />Become a UX designer.</li>
                                                            <li><i className="fas fa-check-circle" />Create quick wireframes.</li>
                                                            <li><i className="fas fa-check-circle" />You will be able to add UX designe</li>
                                                            <li><i className="fas fa-check-circle" />Downloadable exercise files</li>
                                                            <li><i className="fas fa-check-circle" />Become a UI designer.</li>
                                                            <li><i className="fas fa-check-circle" />Build a UX project from beginning to end.</li>
                                                            <li><i className="fas fa-check-circle" />Build  test a full website design.</li>
                                                            <li><i className="fas fa-check-circle" />Learn to design websites  mobile</li>
                                                            <li><i className="fas fa-check-circle" />Create your first UX brief  persona.</li>
                                                            <li><i className="fas fa-check-circle" />All the techniques used by UX professionals</li>
                                                            <li><i className="fas fa-check-circle" />How to use premade UI kits.</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="courses__details-inner">
                                                    <h3 className="title">Requirements</h3>
                                                    <p>This tutorial will help you learn quickly and thoroughly. Lorem ipsum, or lipsum as it is sometimes</p>
                                                    <div className="event-details-list">
                                                        <ul className="list-wrap">
                                                            <li><i className="fas fa-check-circle" />Become a UX designer.</li>
                                                            <li><i className="fas fa-check-circle" />Create quick wireframes.</li>
                                                            <li><i className="fas fa-check-circle" />You will be able to add UX designe</li>
                                                            <li><i className="fas fa-check-circle" />Downloadable exercise files</li>
                                                            <li><i className="fas fa-check-circle" />Become a UI designer.</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="courses__details-curriculum">
                                                <h4 className="title">Curriculum</h4>
                                                <div className="accordion" id="accordionExample">
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header" onClick={() => handleToggle(1)}>
                                                            <button className={isActive.key == 1 ? "accordion-button  collapsed" : "accordion-button"}>
                                                                Introduction
                                                            </button>
                                                        </h2>
                                                        <div className={isActive.key == 1 ? "accordion-collapse collapse show" : "accordion-collapse collapse"}>
                                                            <div className="accordion-body">
                                                                <ul className="list-wrap">
                                                                    <li className="course-item">
                                                                        <Link href="#" className="course-item-link">
                                                                            <span className="item-name">Course Installation</span>
                                                                            <div className="course-item-meta">
                                                                                <span className="item-meta duration">07:48</span>
                                                                                <span className="item-meta course-item-status">
                                                                                    <img src="/assets/img/icons/lock.svg" alt="icon" />
                                                                                </span>
                                                                            </div>
                                                                        </Link>
                                                                    </li>
                                                                    <li className="course-item">
                                                                        <Link href="#" className="course-item-link">
                                                                            <span className="item-name">Create a Simple React App</span>
                                                                            <div className="course-item-meta">
                                                                                <span className="item-meta duration">07:48</span>
                                                                                <span className="item-meta course-item-status">
                                                                                    <img src="/assets/img/icons/lock.svg" alt="icon" />
                                                                                </span>
                                                                            </div>
                                                                        </Link>
                                                                    </li>
                                                                    <li className="course-item">
                                                                        <Link href="#" className="course-item-link">
                                                                            <span className="item-name">React for the Rest of us</span>
                                                                            <div className="course-item-meta">
                                                                                <span className="item-meta duration">10:48</span>
                                                                                <span className="item-meta course-item-status">
                                                                                    <img src="/assets/img/icons/lock.svg" alt="icon" />
                                                                                </span>
                                                                            </div>
                                                                        </Link>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header" onClick={() => handleToggle(2)}>
                                                            <button className={isActive.key == 2 ? "accordion-button  collapsed" : "accordion-button"}>
                                                                Capacitance and Inductance
                                                            </button>
                                                        </h2>
                                                        <div className={isActive.key == 2 ? "accordion-collapse collapse show" : "accordion-collapse collapse"}>
                                                            <div className="accordion-body">
                                                                <ul className="list-wrap">
                                                                    <li className="course-item">
                                                                        <Link href="#" className="course-item-link">
                                                                            <span className="item-name">Course Installation</span>
                                                                            <div className="course-item-meta">
                                                                                <span className="item-meta duration">07:48</span>
                                                                                <span className="item-meta course-item-status">
                                                                                    <img src="/assets/img/icons/lock.svg" alt="icon" />
                                                                                </span>
                                                                            </div>
                                                                        </Link>
                                                                    </li>
                                                                    <li className="course-item">
                                                                        <Link href="#" className="course-item-link">
                                                                            <span className="item-name">Create a Simple React App</span>
                                                                            <div className="course-item-meta">
                                                                                <span className="item-meta duration">07:48</span>
                                                                                <span className="item-meta course-item-status">
                                                                                    <img src="/assets/img/icons/lock.svg" alt="icon" />
                                                                                </span>
                                                                            </div>
                                                                        </Link>
                                                                    </li>
                                                                    <li className="course-item">
                                                                        <Link href="#" className="course-item-link">
                                                                            <span className="item-name">React for the Rest of us</span>
                                                                            <div className="course-item-meta">
                                                                                <span className="item-meta duration">10:48</span>
                                                                                <span className="item-meta course-item-status">
                                                                                    <img src="/assets/img/icons/lock.svg" alt="icon" />
                                                                                </span>
                                                                            </div>
                                                                        </Link>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="accordion-item">
                                                        <h2 className="accordion-header" onClick={() => handleToggle(3)}>
                                                            <button className={isActive.key == 3 ? "accordion-button  collapsed" : "accordion-button"}>
                                                                Final Audit
                                                            </button>
                                                        </h2>
                                                        <div className={isActive.key == 3 ? "accordion-collapse collapse show" : "accordion-collapse collapse"}>
                                                             <div className="accordion-body">
                                                                <ul className="list-wrap">
                                                                    <li className="course-item">
                                                                        <Link href="#" className="course-item-link">
                                                                            <span className="item-name">Course Installation</span>
                                                                            <div className="course-item-meta">
                                                                                <span className="item-meta duration">07:48</span>
                                                                                <span className="item-meta course-item-status">
                                                                                    <img src="/assets/img/icons/lock.svg" alt="icon" />
                                                                                </span>
                                                                            </div>
                                                                        </Link>
                                                                    </li>
                                                                    <li className="course-item">
                                                                        <Link href="#" className="course-item-link">
                                                                            <span className="item-name">Create a Simple React App</span>
                                                                            <div className="course-item-meta">
                                                                                <span className="item-meta duration">07:48</span>
                                                                                <span className="item-meta course-item-status">
                                                                                    <img src="/assets/img/icons/lock.svg" alt="icon" />
                                                                                </span>
                                                                            </div>
                                                                        </Link>
                                                                    </li>
                                                                    <li className="course-item">
                                                                        <Link href="#" className="course-item-link">
                                                                            <span className="item-name">React for the Rest of us</span>
                                                                            <div className="course-item-meta">
                                                                                <span className="item-meta duration">10:48</span>
                                                                                <span className="item-meta course-item-status">
                                                                                    <img src="/assets/img/icons/lock.svg" alt="icon" />
                                                                                </span>
                                                                            </div>
                                                                        </Link>
                                                                    </li>
                                                                </ul>
                                                            </div>                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                             <div className="courses__details-instructors">
                                                <h4 className="title">Your Instructors</h4>
                                                <div className="courses__instructors-list">
                                                    <div className="courses__instructors-item">
                                                        <div className="courses__instructors-thumb">
                                                            <Link href="/instructor-details"><img src="/assets/img/courses/details_instructors01.jpg" alt="img" /></Link>
                                                        </div>
                                                        <div className="courses__instructors-content">
                                                            <h5 className="name"><Link href="/instructor-details">Robert Smith</Link></h5>
                                                            <span className="designation">Graphic Design</span>
                                                            <ul className="meta list-wrap d-flex flex-wrap">
                                                                <li><i className="flaticon-user-1" /> 1,135 Students</li>
                                                                <li><i className="flaticon-file" /> 05</li>
                                                                <li>
                                                                    <div className="rating">
                                                                        <i className="fas fa-star" />
                                                                        <i className="fas fa-star" />
                                                                        <i className="fas fa-star" />
                                                                        <i className="fas fa-star" />
                                                                        <i className="fas fa-star" />
                                                                        <span className="average">(4.2)</span>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                            <p>Donald Logan has more than 15 years’ experience as a project management consultant, educator, technology consultant, business know.</p>
                                                            <div className="tg-button-wrap">
                                                                <Link href="/instructor-details" className="btn btn-border tg-svg"><span className="text">See More</span> <span className="svg-icon" id="svg-btn1" data-svg-icon="assets/img/icons/btn-arrow.svg" /></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="courses__instructors-item">
                                                        <div className="courses__instructors-thumb">
                                                            <Link href="/instructor-details"><img src="/assets/img/courses/details_instructors02.jpg" alt="img" /></Link>
                                                        </div>
                                                        <div className="courses__instructors-content">
                                                            <h5 className="name"><Link href="/instructor-details">Ketty Roagh</Link></h5>
                                                            <span className="designation">Web Developer</span>
                                                            <ul className="meta list-wrap d-flex flex-wrap">
                                                                <li><i className="flaticon-user-1" /> 1,435 Students</li>
                                                                <li><i className="flaticon-file" /> 05</li>
                                                                <li>
                                                                    <div className="rating">
                                                                        <i className="fas fa-star" />
                                                                        <i className="fas fa-star" />
                                                                        <i className="fas fa-star" />
                                                                        <i className="fas fa-star" />
                                                                        <i className="fas fa-star" />
                                                                        <span className="average">(4.2)</span>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                            <p>Donald Logan has more than 15 years’ experience as a project management consultant, educator, technology consultant, business know.</p>
                                                            <div className="tg-button-wrap">
                                                                <Link href="/instructor-details" className="btn btn-border tg-svg"><span className="text">See More</span> <span className="svg-icon" id="svg-btn2" data-svg-icon="assets/img/icons/btn-arrow.svg" /></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> 
                                        </div> */}

                                        <div className={activeIndex === 1 ? "tab-pane active" : "tab-pane"}>
                                            <div className="courses__details-reviews">
                                                <h4 className="title">Student Ratings  Reviews</h4>
                                                {/* <div className="course-rate">
                                                    <div className="course-rate__summary">
                                                        <div className="course-rate__summary-value">4.8</div>
                                                        <div className="course-rate__summary-stars">
                                                            <i className="fas fa-star" />
                                                            <i className="fas fa-star" />
                                                            <i className="fas fa-star" />
                                                            <i className="fas fa-star" />
                                                            <i className="fas fa-star" />
                                                        </div>
                                                        <div className="course-rate__summary-text">
                                                            Total 2 Rating
                                                        </div>
                                                    </div>
                                                    <div className="course-rate__details">
                                                        <div className="course-rate__details-row">
                                                            <div className="course-rate__details-row-star">
                                                                5
                                                                <i className="fas fa-star" />
                                                            </div>
                                                            <div className="course-rate__details-row-value">
                                                                <div className="rating-gray" />
                                                                <div className="rating" style={{ width: '80%' }} title="80%" />
                                                                <span className="rating-count">2</span>
                                                            </div>
                                                        </div>
                                                        <div className="course-rate__details-row">
                                                            <div className="course-rate__details-row-star">
                                                                4
                                                                <i className="fas fa-star" />
                                                            </div>
                                                            <div className="course-rate__details-row-value">
                                                                <div className="rating-gray" />
                                                                <div className="rating" style={{ width: '50%' }} title="50%" />
                                                                <span className="rating-count">1</span>
                                                            </div>
                                                        </div>
                                                        <div className="course-rate__details-row">
                                                            <div className="course-rate__details-row-star">
                                                                3
                                                                <i className="fas fa-star" />
                                                            </div>
                                                            <div className="course-rate__details-row-value">
                                                                <div className="rating-gray" />
                                                                <div className="rating" style={{ width: '0%' }} title="0%" />
                                                                <span className="rating-count">0</span>
                                                            </div>
                                                        </div>
                                                        <div className="course-rate__details-row">
                                                            <div className="course-rate__details-row-star">
                                                                2
                                                                <i className="fas fa-star" />
                                                            </div>
                                                            <div className="course-rate__details-row-value">
                                                                <div className="rating-gray" />
                                                                <div className="rating" style={{ width: '0%' }} title="0%" />
                                                                <span className="rating-count">0</span>
                                                            </div>
                                                        </div>
                                                        <div className="course-rate__details-row">
                                                            <div className="course-rate__details-row-star">
                                                                1
                                                                <i className="fas fa-star" />
                                                            </div>
                                                            <div className="course-rate__details-row-value">
                                                                <div className="rating-gray" />
                                                                <div className="rating" style={{ width: '0%' }} title="0%" />
                                                                <span className="rating-count">0</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> */}
                                                <div id="course-reviews">
                                                    <h4 className="course-review-head">Reviews (01)</h4>
                                                    <ul className="list-wrap">
                                                        <li>
                                                            <div className="review-author">
                                                                <img src="/assets/img/blog/comment01.png" alt="img" />
                                                            </div>
                                                            <div className="review-author-info">
                                                                {/* <div className="review-stars-rated">
                                                                    <i className="fas fa-star" />
                                                                    <i className="fas fa-star" />
                                                                    <i className="fas fa-star" />
                                                                    <i className="fas fa-star" />
                                                                    <i className="fas fa-star" />
                                                                </div> */}
                                                                <h5 className="user-name">Admin <span className="date">August 5, 2023</span></h5>
                                                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantiu meature areawtyt totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.</p>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="course-review-form">
                                                    <h4 className="course-review-head">Write a review</h4>
                                                    <form action="#">
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <input type="text" placeholder="Your Name" />
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <input type="email" placeholder="Your Email" />
                                                            </div>
                                                        </div>
                                                        <input type="text" placeholder="Review Title" />
                                                        {/* <div className="course-form-rating">
                                                            <span>Select Rating:</span>
                                                            <i className="fas fa-star" />
                                                            <i className="fas fa-star" />
                                                            <i className="fas fa-star" />
                                                            <i className="fas fa-star" />
                                                            <i className="fas fa-star" />
                                                        </div> */}
                                                        <textarea placeholder="Type Comments" />
                                                        <button className="btn">Submit your Review</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-lg-4">
<aside className="courses__details-sidebar">
    <div className="event-widget">
        <div className="thumb">
           <img
    src={
        course && course.featured_image_path
            ? process.env.NEXT_PUBLIC_API_BASE_URL + "/storage/" + course.featured_image_path
            : "/assets/img/courses/default.png"
    }
    alt={course ? course.title : "Course image"}
    style={{ maxWidth: 300, marginBottom: 20 }}
/>
            {/* <VideoPopup /> */}
        </div>
       <div className="event-cost-wrap">
    <h4 className="price">
        <strong>Costs:</strong> ${course && course.price ? course.price : "N/A"}
    </h4>
    <Link href={course ? `/enroll?course=${course.id}` : "#"} className="btn" aria-disabled={!course}>
        Enroll This Now
    </Link>
    <div className="event-information-wrap">
        <h6 className="title">Course Info</h6>
        <ul className="list-wrap">
            <li><i className="flaticon-bars" />Category <span>{categoryName}</span></li>
            <li><i className="flaticon-user-1" />Course ID <span>{course ? course.id : "N/A"}</span></li>
            {/* <li><i className="flaticon-calendar-date" />Created <span>{course ? course.created_at : "N/A"}</span></li> */}
            {/* <li><i className="flaticon-calendar-date" />Updated <span>{course ? course.updated_at : "N/A"}</span></li> */}
        </ul>
    </div>
</div>
    </div>
    <div className="blog-widget">
        <h4 className="widget-title">Related Courses</h4>
        {relatedCourses.length === 0 ? (
            <div>No related courses found.</div>
        ) : (
            relatedCourses.map(rc => (
                <div className="rc-post-item" key={rc.id}>
                    <div className="rc-post-thumb">
                        <Link href={`/course/${rc.id}`}>
                            <img
                                src={
                                    rc.featured_image_path
                                        ? process.env.NEXT_PUBLIC_API_BASE_URL + "/storage/" + rc.featured_image_path
                                        : "/assets/img/courses/default.png"
                                }
                                alt={rc.title}
                            />
                        </Link>
                    </div>
                    <div className="rc-post-content">
                        <h4 className="title"><Link href={`/course/${rc.id}`}>{rc.title}</Link></h4>
                        <span className="price">${rc.price}</span>
                    </div>
                </div>
            ))
        )}
    </div>
</aside>
                            </div>
                        </div>
                    </div>
                </section>
        </Layout>
    )
}

export default CourseSingle