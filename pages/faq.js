import Layout from "@/components/layout/Layout"
import { useState, useEffect } from "react"
import { fetchFAQs } from "@/util/faqApi"

export default function Faq() {
    const [isActive, setIsActive] = useState({
        status: false,
        key: "",
    })
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchFAQs()
            .then(data => setFaqs(data))
            .catch(() => setError("Oops, something went wrong. Please try again later."))
            .finally(() => setLoading(false));
    }, []);

    const handleToggle = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
                key: "",
            })
        } else {
            setIsActive({
                status: true,
                key,
            })
        }
    }

    return (
        <>
            <Layout headerStyle={3} footerStyle={1} breadcrumbTitle="Find Answers Here">
                <section className="faq-area section-py-120">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-9 col-lg-10">
                                <div className="faq-wrap">
                                    <div className="accordion" id="accordionExample">
                                        {loading ? (
                                            <div style={{ textAlign: "center", margin: "2rem" }}>Loading...</div>
                                        ) : error ? (
                                            <div style={{ textAlign: "center", margin: "2rem", color: "#ff4f4f" }}>{error}</div>
                                        ) : faqs.length === 0 ? (
                                            <div style={{ textAlign: "center", margin: "2rem" }}>No FAQs found.</div>
                                        ) : (
                                            faqs.map((faq, idx) => (
                                                <div className="accordion-item" key={faq.id}>
                                                    <h2 className="accordion-header" onClick={() => handleToggle(idx)}>
                                                        <button
                                                            className={isActive.key === idx ? "accordion-button  collapsed" : "accordion-button"}
                                                            type="button"
                                                            data-bs-toggle="collapse"
                                                            aria-expanded={isActive.key === idx}
                                                            aria-controls={`collapse${idx}`}
                                                        >
                                                            {faq.question}
                                                        </button>
                                                    </h2>
                                                    <div
                                                        className={isActive.key === idx ? "accordion-collapse collapse show" : "accordion-collapse collapse"}
                                                        data-bs-parent="#accordionExample"
                                                    >
                                                        <div className="accordion-body">
                                                            <p>{faq.answer}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
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