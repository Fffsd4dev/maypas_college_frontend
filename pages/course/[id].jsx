import VideoPopup from "@/components/elements/VidepPopup";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCategories } from "@/util/courseCategoryApi";
import { fetchCourses } from "@/util/courseApi";

const countryList = [
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "Nigeria",
  "India",
  "Ghana",
  "South Africa",
  "Kenya",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "China",
  "Japan",
  "Brazil",
  "Other",
];

const CourseSingle = () => {
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [categories, setCategories] = useState([]);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEnroll, setShowEnroll] = useState(false);
  const id = router.query.id;

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError("");
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/course/get/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch course details");
        return res.json();
      })
      .then((data) => setCourse(data))
      .catch(() =>
        setError("Oops, something went wrong. Please try again later.")
      )
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    getCategories()
      .then((data) => {
        const arr = Array.isArray(data) ? data : data.data || [];
        setCategories(arr);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!course?.course_category_id) return;
    fetchCourses().then((data) => {
      const arr = Array.isArray(data) ? data : data.data || [];
      // Filter out current course and match category, limit to 4
      const related = arr
        .filter(
          (c) =>
            String(c.course_category_id) ===
              String(course.course_category_id) &&
            String(c.id) !== String(course.id)
        )
        .slice(0, 4);
      setRelatedCourses(related);
    });
  }, [course]);

  const categoryName =
    categories.find(
      (cat) => String(cat.id) === String(course?.course_category_id)
    )?.name || course?.course_category_id;
  const [activeIndex, setActiveIndex] = useState(1);
  const handleOnClick = (index) => {
    setActiveIndex(index);
  };
  const [isActive, setIsActive] = useState({
    status: false,
    key: 1,
  });

  // Enrollment Flow State
  const [step, setStep] = useState(1);
  const [entryReq, setEntryReq] = useState({
    age: false,
    qualification: false,
  });
  const [personal, setPersonal] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
  });
  const [countrySearch, setCountrySearch] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [stripeCard, setStripeCard] = useState("");
  const [enrollError, setEnrollError] = useState("");

  const filteredCountries = countryList.filter((c) =>
    c.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const handleNext = () => {
    setEnrollError("");
    if (step === 2 && (!entryReq.age || !entryReq.qualification)) {
      setEnrollError("Please confirm both entry requirements.");
      return;
    }
    if (
      step === 3 &&
      (!personal.firstName ||
        !personal.lastName ||
        !personal.email ||
        !personal.phone ||
        !personal.country)
    ) {
      setEnrollError("Please fill all personal details.");
      return;
    }
    if (step === 4 && !paymentMethod) {
      setEnrollError("Please select a payment method.");
      return;
    }
    setStep(step + 1);
  };

  const handlePrev = () => setStep(step - 1);

  // Enrollment Modal/Section
  const EnrollFlow = () => (
    <div className="enroll-modal">
      <div className="enroll-steps">
        <div
          className="enroll-step"
          style={{ display: step === 1 ? "block" : "none" }}
        >
          <h4>Course Information</h4>
          <p>
            <strong>Course:</strong> {course.title}
          </p>
          <p>
            <strong>Category:</strong> {categoryName}
          </p>
          <p>
            <strong>Price:</strong> ${course.price}
          </p>
          <button className="btn" onClick={handleNext}>
            Next
          </button>
        </div>
        <div
          className="enroll-step"
          style={{ display: step === 2 ? "block" : "none" }}
        >
          <h4>Entry Requirements</h4>
          <div>
            <label>
              <input
                type="checkbox"
                checked={entryReq.age}
                onChange={(e) =>
                  setEntryReq({ ...entryReq, age: e.target.checked })
                }
              />{" "}
              I confirm that I am 16 years or older.
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={entryReq.qualification}
                onChange={(e) =>
                  setEntryReq({ ...entryReq, qualification: e.target.checked })
                }
              />{" "}
              I confirm that I have a high school qualification or its
              equivalent.
            </label>
          </div>
          {enrollError && (
            <div style={{ color: "red", margin: "10px 0" }}>{enrollError}</div>
          )}
          <button className="btn" onClick={handlePrev}>
            Back
          </button>{" "}
          <button className="btn" onClick={handleNext}>
            Next
          </button>
        </div>
        <div
          className="enroll-step"
          style={{ display: step === 3 ? "block" : "none" }}
        >
          <h4>Personal Details</h4>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={personal.firstName}
              onChange={(e) =>
                setPersonal({ ...personal, firstName: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Last Name"
              value={personal.lastName}
              onChange={(e) =>
                setPersonal({ ...personal, lastName: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={personal.email}
              onChange={(e) =>
                setPersonal({ ...personal, email: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Phone Number"
              value={personal.phone}
              onChange={(e) =>
                setPersonal({ ...personal, phone: e.target.value })
              }
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Country"
              value={countrySearch}
              onChange={(e) => setCountrySearch(e.target.value)}
              style={{ marginBottom: 5 }}
            />
            <select
              value={personal.country}
              onChange={(e) =>
                setPersonal({ ...personal, country: e.target.value })
              }
            >
              <option value="">Select Country</option>
              {filteredCountries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          {enrollError && (
            <div style={{ color: "red", margin: "10px 0" }}>{enrollError}</div>
          )}
          <button className="btn" onClick={handlePrev}>
            Back
          </button>{" "}
          <button className="btn" onClick={handleNext}>
            Next
          </button>
        </div>
        <div
          className="enroll-step"
          style={{ display: step === 4 ? "block" : "none" }}
        >
          <h4>Payment Details</h4>
          <div>
            <label>
              Payment Method:{" "}
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="">Select</option>
                <option value="paypal">PayPal</option>
                <option value="stripe">Stripe</option>
                <option value="bank">Bank Transfer</option>
              </select>
            </label>
          </div>
          {paymentMethod === "paypal" && (
            <div style={{ margin: "15px 0" }}>
              <button className="btn">Pay with PayPal</button>
            </div>
          )}
          {paymentMethod === "stripe" && (
            <div style={{ margin: "15px 0" }}>
              <input
                type="text"
                placeholder="Card Number"
                value={stripeCard}
                onChange={(e) => setStripeCard(e.target.value)}
              />
              <button className="btn">Pay with Stripe</button>
            </div>
          )}
          {paymentMethod === "bank" && (
            <div
              style={{
                margin: "15px 0",
                background: "#f7f7f7",
                padding: 15,
                borderRadius: 8,
              }}
            >
              <strong>Bank Transfer</strong>
              <div>Account Name: Maypas College LTD</div>
              <div>Bank: Barclay’s Bank</div>
              <div>Account Number: 50800929</div>
              <div>Sort Code: 20-49-17</div>
              <div>Course Fee: £{course.price}</div>
              <div style={{ marginTop: 8, fontStyle: "italic" }}>
                Instruction: Email proof of payment to{" "}
                <a href="mailto:studentsupport@maypascollege.com">
                  studentsupport@maypascollege.com
                </a>
              </div>
            </div>
          )}
          {enrollError && (
            <div style={{ color: "red", margin: "10px 0" }}>{enrollError}</div>
          )}
          <button className="btn" onClick={handlePrev}>
            Back
          </button>
        </div>
      </div>
      <button
        className="btn btn-border"
        style={{ marginTop: 20 }}
        onClick={() => setShowEnroll(false)}
      >
        Cancel
      </button>
      <style jsx>{`
        .enroll-modal {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
          padding: 2rem;
          max-width: 420px;
          margin: 2rem auto;
          position: relative;
          z-index: 1000;
        }
        .enroll-steps input,
        .enroll-steps select {
          width: 100%;
          margin-bottom: 10px;
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #ddd;
        }
        .enroll-steps button.btn {
          margin-top: 10px;
        }
      `}</style>
    </div>
  );

  // Dynamic tabs for course_info_key
  const courseInfoTabs =
    course && Array.isArray(course.course_data) && course.course_data.length > 0
      ? course.course_data.map((info, idx) => ({
          key: 100 + idx,
          label: info.course_info_key,
          value: info.course_info_value,
        }))
      : [];

  return (
    <Layout headerStyle={3} footerStyle={1}>
      <section className="courses__breadcrumb-area">
        <div className="container">
          {loading ? (
            <div style={{ textAlign: "center", margin: "2rem" }}>
              Loading...
            </div>
          ) : error ? (
            <div
              style={{ textAlign: "center", margin: "2rem", color: "#ff4f4f" }}
            >
              {error}
            </div>
          ) : course ? (
            <div className="row">
              <div className="col-lg-8">
                <div className="courses__breadcrumb-content">
                  <span
                    className="category"
                    style={{ fontWeight: 600, color: "#4f8cff" }}
                  >
                    {categoryName}
                  </span>
                  <h3 className="title">{course.title}</h3>
                  <p>{course.excerpt}</p>
                  <img
                    src={
                      course && course.featured_image_path
                        ? process.env.NEXT_PUBLIC_API_BASE_URL +
                          "/storage/" +
                          course.featured_image_path
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
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", margin: "2rem" }}>
              Course not found.
            </div>
          )}
        </div>
      </section>
      {showEnroll && <EnrollFlow />}
      <section className="courses-details-area section-pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-8">
              <div className="courses__details-wrapper">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" onClick={() => handleOnClick(1)}>
                    <button
                      className={
                        activeIndex === 1 ? "nav-link active" : "nav-link"
                      }
                    >
                      Reviews
                    </button>
                  </li>
                  {/* Dynamically create a tab for each course_info_key */}
                  {courseInfoTabs.length > 0 &&
                    courseInfoTabs.map((tab) => (
                      <li
                        className="nav-item"
                        key={tab.key}
                        onClick={() => handleOnClick(tab.key)}
                      >
                        <button
                          className={
                            activeIndex === tab.key
                              ? "nav-link active"
                              : "nav-link"
                          }
                        >
                          {tab.label}
                        </button>
                      </li>
                    ))}
                </ul>
                <div className="tab-content" id="myTabContent">
                  {/* {activeIndex === 1 && (
                    <div className="tab-pane active">
                      <div className="courses__details-reviews">
                        <h4 className="title">Student Ratings Reviews</h4>
                        <div id="course-reviews">
                          <h4 className="course-review-head">Reviews (01)</h4>
                          <ul className="list-wrap">
                            <li>
                              <div className="review-author">
                                <img
                                  src="/assets/img/blog/comment01.png"
                                  alt="img"
                                />
                              </div>
                              <div className="review-author-info">
                                <h5 className="user-name">
                                  Admin{" "}
                                  <span className="date">August 5, 2023</span>
                                </h5>
                                <p>
                                  Sed ut perspiciatis unde omnis iste natus
                                  error sit voluptatem accusantium doloremque
                                  laudantiu meature areawtyt totam rem aperiam,
                                  eaque ipsa quae ab illo inventore veritatis.
                                </p>
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
                            <textarea placeholder="Type Comments" />
                            <button className="btn">Submit your Review</button>
                          </form>
                        </div>
                      </div>
                    </div>
                  )} */}
                  {/* Show each course_info_value in its own tab */}
                  {courseInfoTabs.length > 0 &&
                    courseInfoTabs.map((tab) =>
                      activeIndex === tab.key ? (
                        <div className="tab-pane active" key={tab.key}>
                          <div style={{ padding: "1rem" }}>{tab.value}</div>
                        </div>
                      ) : null
                    )}
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
                          ? process.env.NEXT_PUBLIC_API_BASE_URL +
                            "/storage/" +
                            course.featured_image_path
                          : "/assets/img/courses/default.png"
                      }
                      alt={course ? course.title : "Course image"}
                      style={{ maxWidth: 300, marginBottom: 20 }}
                    />
                  </div>
                  <div className="event-cost-wrap">
                    <h4 className="price">
                      <strong>Costs:</strong> $
                      {course && course.price ? course.price : "N/A"}
                    </h4>
                    <button
                      onClick={() => setShowEnroll(true)}
                      className="btn"
                      aria-disabled={!course}
                    >
                      Enroll This Now
                    </button>
                    <div className="event-information-wrap">
                      <h6 className="title">Course Info</h6>
                      <ul className="list-wrap">
                        <li>
                          <i className="flaticon-bars" />
                          Category <span>{categoryName}</span>
                        </li>
                        <li>
                          <i className="flaticon-user-1" />
                          Course ID <span>{course ? course.id : "N/A"}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="blog-widget">
                  <h4 className="widget-title">Related Courses</h4>
                  {relatedCourses.length === 0 ? (
                    <div>No related courses found.</div>
                  ) : (
                    relatedCourses.map((rc) => (
                      <div className="rc-post-item" key={rc.id}>
                        <div className="rc-post-thumb">
                          <Link href={`/course/${rc.id}`}>
                            <img
                              src={
                                rc.featured_image_path
                                  ? process.env.NEXT_PUBLIC_API_BASE_URL +
                                    "/storage/" +
                                    rc.featured_image_path
                                  : "/assets/img/courses/default.png"
                              }
                              alt={rc.title}
                            />
                          </Link>
                        </div>
                        <div className="rc-post-content">
                          <h4 className="title">
                            <Link href={`/course/${rc.id}`}>{rc.title}</Link>
                          </h4>
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
  );
};

export default CourseSingle;
