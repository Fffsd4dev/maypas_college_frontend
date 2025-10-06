import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Select from "react-select";
import countriesData from "./countries.json";
import { getCategories } from "@/util/courseCategoryApi";
import { fetchCourses } from "@/util/courseApi";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";



function ThankYouPopup({ onClose }) {
  return (
    <div className="thankyou-popup-overlay" onClick={onClose}>
      <div className="thankyou-popup-content" onClick={e => e.stopPropagation()}>
        <h2>Thank You!</h2>
        <p>Your payment was successful. You are now enrolled in the course.</p>
        <button className="btn" onClick={onClose}>Close</button>
      </div>
      <style jsx>{`
        .thankyou-popup-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.45);
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .thankyou-popup-content {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.08);
          padding: 2rem;
          max-width: 420px;
          margin: 2rem auto;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

// Stripe public key (replace with your actual key)
const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_API_STRIPE_PUBLIC_KEY}`);



// Stripe payment form component with spinner
function StripePaymentForm({ personal, course, setEnrollError, resetEnrollForm, showThankYou, setShowThankYou }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleStripePayment = async (e) => {
    e.preventDefault();
    setEnrollError("");
    setLoading(true);
    if (!stripe || !elements) {
      setEnrollError("Stripe is not loaded yet.");
      setLoading(false);
      return;
    }
    try {
      // 1. Create payment intent on your backend
     const createRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/stripe/payment/intent/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: personal.email,
          firstName: personal.firstName,
          lastName: personal.lastName,
          phone: personal.phone,
          country: personal.country,
          country_code: personal.country_code,
          fee: String(course.price),
          currency: "gbp",
          off_session: false,
          confirm: false,
          course_id: String(course.id),
          description: `${course.title} Fee`,
          receipt_email: personal.email,
          metadata_student_name: `${personal.firstName} ${personal.lastName}`,
        }),
      });

      const createData = await createRes.json();
      if (!createRes.ok || !createData?.secretKey) throw new Error(createData.message || "Failed to create payment");

      // 2. Confirm card payment with Stripe.js
      const cardElement = elements.getElement(CardElement);

      console.log("Got here");

      const result = await stripe.confirmCardPayment(createData.secretKey, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${personal.firstName} ${personal.lastName}`,
            email: personal.email,
          },
        },
      });

      if (result.error) throw new Error(result.error.message);

      console.log(result);

      if (result.paymentIntent.status === "succeeded") {
        // 3. Confirm payment on your backend (optional, if needed)
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/stripe/payment/intent/confirm`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: personal.email,
            firstName: personal.firstName,
            lastName: personal.lastName,
            phone: personal.phone,
            country_code: personal.country_code,
            fee: String(course.price),
            currency: "gbp",
            off_session: false,
            payment_intent_id: result.paymentIntent.id,
            confirm: true,
            course_id: String(course.id),
            description: `${course.title} Fee`,
            receipt_email: personal.email,
            metadata_student_name: `${personal.firstName} ${personal.lastName}`,
          }),
        });
        toast.success("Stripe payment successful!");
        resetEnrollForm();
        setShowThankYou(true); // Show thank you popup
      }
    } catch (err) {
      setEnrollError(err.message || "Stripe payment failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleStripePayment}>
      <div style={{ marginBottom: 16 }}>
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </div>
      <button className="btn" type="submit" style={{ marginTop: 8 }} disabled={loading}>
        {loading ? (
          <span>
            <span className="spinner" style={{
              display: "inline-block",
              width: 18,
              height: 18,
              border: "2px solid #fff",
              borderTop: "2px solid #4f8cff",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              marginRight: 8,
              verticalAlign: "middle"
            }} />
            Processing...
          </span>
        ) : "Pay with Stripe"}
      </button>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </form>
  );
}

// Dynamic EnrollFlow as a separate component
function EnrollFlow({
  step,
  setStep,
  entryReq,
  setEntryReq,
  personal,
  setPersonal,
  paymentMethod,
  setPaymentMethod,
  stripeCard,
  setStripeCard,
  enrollError,
  setEnrollError,
  countryOptions,
  course,
  categoryName,
  resetEnrollForm,
   showThankYou,
  setShowThankYou,
}) {
  // Country select using react-select and countries.json
  const CountrySelect = ({ countryOptions, personal, setPersonal }) => (
    <Select
      options={countryOptions}
      value={countryOptions.find(opt => opt.value === personal.country_code) || null}
      onChange={selected =>
        setPersonal({
          ...personal,
          country: selected ? selected.label : "",
          country_code: selected ? selected.value : ""
        })
      }
      placeholder="Select or type a country..."
      isSearchable
    />
  );

  // PayPal Payment Flow
  const handlePaypalPayment = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/paypal/payment/intent/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: personal.email,
          firstName: personal.firstName,
          lastName: personal.lastName,
          phone: personal.phone,
          country: personal.country,
          country_code: personal.country_code,
          fee: String(course.price),
          currency: "gbp",
          description: `${course.title} Fee`,
          receipt_email: personal.email,
          metadata_student_name: `${personal.firstName} ${personal.lastName}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to initiate PayPal");

      if (data?.approval_url) {
        window.location.href = data.approval_url;
      } else {
        alert("PayPal payment successful!");
        resetEnrollForm();
      }
    } catch (err) {
      console.error(err);
      setEnrollError(err.message || "PayPal payment failed.");
    }
  };

  return (
    <div className="enroll-modal">
      <div className="enroll-steps">
        <div className="enroll-step" style={{ display: step === 1 ? "block" : "none" }}>
          <h4>Course Information</h4>
          <p><strong>Course:</strong> {course.title}</p>
          {/* <p><strong>Course:</strong> {course.id}</p> */}
          <p><strong>Category:</strong> {categoryName}</p>
          <p><strong>Price:</strong> ${course.price}</p>
          <button className="btn" onClick={() => setStep(2)}>Next</button>
        </div>
        <div className="enroll-step" style={{ display: step === 2 ? "block" : "none" }}>
          <h4>Entry Requirements</h4>
          <div>
            <label>
              <input
                type="checkbox"
                checked={entryReq.age}
                onChange={e => setEntryReq({ ...entryReq, age: e.target.checked })}
              />{" "}
              I confirm that I am 16 years or older.
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={entryReq.qualification}
                onChange={e => setEntryReq({ ...entryReq, qualification: e.target.checked })}
              />{" "}
              I confirm that I have a high school qualification or its equivalent.
            </label>
          </div>
          {enrollError && <div style={{ color: "red", margin: "10px 0" }}>{enrollError}</div>}
          <button className="btn" onClick={() => setStep(1)}>Back</button>{" "}
          <button className="btn" onClick={() => {
            if (!entryReq.age || !entryReq.qualification) {
              setEnrollError("Please confirm both entry requirements.");
              return;
            }
            setEnrollError("");
            setStep(3);
          }}>Next</button>
        </div>
        <div className="enroll-step" style={{ display: step === 3 ? "block" : "none" }}>
          <h4>Personal Details</h4>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={personal.firstName}
              onChange={e => setPersonal({ ...personal, firstName: e.target.value })}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Last Name"
              value={personal.lastName}
              onChange={e => setPersonal({ ...personal, lastName: e.target.value })}
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={personal.email}
              onChange={e => setPersonal({ ...personal, email: e.target.value })}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Phone Number"
              value={personal.phone}
              onChange={e => setPersonal({ ...personal, phone: e.target.value })}
            />
          </div>
          <div>
            <CountrySelect
              countryOptions={countryOptions}
              personal={personal}
              setPersonal={setPersonal}
            />
          </div>
          {enrollError && <div style={{ color: "red", margin: "10px 0" }}>{enrollError}</div>}
          <button className="btn" onClick={() => setStep(2)}>Back</button>{" "}
          <button className="btn" onClick={() => {
            if (
              !personal.firstName ||
              !personal.lastName ||
              !personal.email ||
              !personal.phone ||
              !personal.country ||
              !personal.country_code
            ) {
              setEnrollError("Please fill all personal details.");
              return;
            }
            setEnrollError("");
            setStep(4);
          }}>Next</button>
        </div>
        <div className="enroll-step" style={{ display: step === 4 ? "block" : "none" }}>
          <h4>Payment Details</h4>
          <div>
            <label>
              Payment Method:{" "}
              <select
                value={paymentMethod}
                onChange={e => setPaymentMethod(e.target.value)}
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
              <button className="btn" onClick={handlePaypalPayment}>
                Pay with PayPal
              </button>
            </div>
          )}
          {paymentMethod === "stripe" && (
          <div style={{ margin: "15px 0" }}>
            <Elements stripe={stripePromise}>
              <StripePaymentForm
                personal={personal}
                course={course}
                setEnrollError={setEnrollError}
                resetEnrollForm={resetEnrollForm}
                showThankYou={showThankYou}
                setShowThankYou={setShowThankYou}
              />
            </Elements>
          </div>
        )}
          {paymentMethod === "bank" && (
            <div style={{
              margin: "15px 0",
              background: "#f7f7f7",
              padding: 15,
              borderRadius: 8,
            }}>
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
          {enrollError && <div style={{ color: "red", margin: "10px 0" }}>{enrollError}</div>}
          <button className="btn" onClick={() => setStep(3)}>Back</button>
        </div>
      </div>
      <button
        className="btn btn-border"
        style={{ marginTop: 20 }}
        onClick={resetEnrollForm}
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
}

const CourseSingle = () => {
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [categories, setCategories] = useState([]);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEnroll, setShowEnroll] = useState(false);
  const id = router.query.id;
  const [showThankYou, setShowThankYou] = useState(false);

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
      .catch(() => setError("Oops, something went wrong. Please try again later."))
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
      const related = arr
        .filter(
          (c) =>
            String(c.course_category_id) === String(course.course_category_id) &&
            String(c.id) !== String(course.id)
        )
        .slice(0, 4);
      setRelatedCourses(related);
    });
  }, [course]);

  const categoryName =
    categories.find((cat) => String(cat.id) === String(course?.course_category_id))?.name || course?.course_category_id;
  const [activeIndex, setActiveIndex] = useState(1);
  const handleOnClick = (index) => setActiveIndex(index);

  // Enrollment Flow State
  const [step, setStep] = useState(1);
  const [entryReq, setEntryReq] = useState({ age: false, qualification: false });
  const [personal, setPersonal] = useState({ firstName: "", lastName: "", email: "", phone: "", country: "", country_code: "" });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [stripeCard, setStripeCard] = useState("");
  const [enrollError, setEnrollError] = useState("");

  // Prepare country options from countries.json
  const countryOptions = countriesData.map(c => ({
    value: String(c.country_code),
    label: c.country_name
  }));

  // Reset enroll form and close popup
  const resetEnrollForm = () => {
    setStep(1);
    setEntryReq({ age: false, qualification: false });
    setPersonal({ firstName: "", lastName: "", email: "", phone: "", country: "", country_code: "" });
    setPaymentMethod("");
    setStripeCard("");
    setEnrollError("");
    setShowEnroll(false);
  };

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
            <div style={{ textAlign: "center", margin: "2rem" }}>Course not found.</div>
          )}
        </div>
      </section>
      {/* Popup for enroll */}
      {showEnroll && !showThankYou && (
        <div className="enroll-popup-overlay" onClick={resetEnrollForm}>
          <div className="enroll-popup-content" onClick={e => e.stopPropagation()}>
            <EnrollFlow
              step={step}
              setStep={setStep}
              entryReq={entryReq}
              setEntryReq={setEntryReq}
              personal={personal}
              setPersonal={setPersonal}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              stripeCard={stripeCard}
              setStripeCard={setStripeCard}
              enrollError={enrollError}
              setEnrollError={setEnrollError}
              countryOptions={countryOptions}
              course={course}
              categoryName={categoryName}
              resetEnrollForm={resetEnrollForm}
              showThankYou={showThankYou}
              setShowThankYou={setShowThankYou}
            />
          </div>
          <style jsx>{`
            .enroll-popup-overlay {
              position: fixed;
              top: 0; left: 0; right: 0; bottom: 0;
              background: rgba(0,0,0,0.45);
              z-index: 9999;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .enroll-popup-content {
              max-width: 440px;
              width: 100%;
              background: transparent;
              border-radius: 12px;
              box-shadow: none;
              position: relative;
            }
          `}</style>
        </div>
      )}
      {showThankYou && (
        <ThankYouPopup
          onClose={() => {
            setShowThankYou(false);
            setShowEnroll(false);
          }}
        />
      )}
      <section className="courses-details-area section-pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xl-9 col-lg-8">
              <div className="courses__details-wrapper">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" onClick={() => handleOnClick(1)}>
                    <button className={activeIndex === 1 ? "nav-link active" : "nav-link"}>Reviews</button>
                  </li>
                  {courseInfoTabs.length > 0 &&
                    courseInfoTabs.map((tab) => (
                      <li className="nav-item" key={tab.key} onClick={() => handleOnClick(tab.key)}>
                        <button className={activeIndex === tab.key ? "nav-link active" : "nav-link"}>
                          {tab.label}
                        </button>
                      </li>
                    ))}
                </ul>
                <div className="tab-content" id="myTabContent">
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
                      <strong>Costs:</strong> ${course && course.price ? course.price : "N/A"}
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
                          Programme <span>{categoryName}</span>
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