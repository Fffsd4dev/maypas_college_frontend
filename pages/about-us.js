import CounterUp from "@/components/elements/CounterUp"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function AboutUs() {
          const factItems = [
        {
            img: "/assets/img/maypas_credentials/othm.png",
            title: "OTHM Qualifications Recognition",
            desc: "Organisation for Tourism and Hospitality Management is a UK based Awarding Organisation regulated by Ofqual. They have a network of numerous delivery centres globally to deliver their approved qualifications."
        },
        {
            img: "/assets/img/maypas_credentials/athe.jpg",
            title: "ATHE Recognition",
            desc: "Awards for Training and Higher Education provides centres with a wide variety of qualifications including, but not limited to; administration management, business, tourism, law, computing and health and social care. ATHE have made a name for themselves with exceptional customer service, excellent quality standards and rewarding qualifications with progression routes to university degrees."
        },
        {
            img: "/assets/img/maypas_credentials/coventry.jpg",
            title: "Coventry and Warwickshire Chamber of Commerce",
            desc: "The British Chambers of Commerce is the largest, most influential independent business voice in the UK who lobby tirelessly on behalf of members and the wider business community on the issues that matter – establishing the right conditions for business to thrive, promoting UK firms in key global markets and creating a dynamic business economy."
        },
        {
            img: "/assets/img/maypas_credentials/QualifiApproved-Final..jpeg",
            title: "Qualifi Recognition",
            desc: "As a recognised UK awarding organisation regulated in England by Office of Qualifications and Examinations Regulation (Ofqual), Council for the Curriculum, Examinations and Assessment (CCEA) in Northern Ireland and Qualifications Wales (QW), Qualifi is able to give assurances to registered centres and learners of consistent, rigorous, quality standards and valid, valued learning."
        },
        {
            img: "/assets/img/maypas_credentials/cyber-essentials-logo.jpg",
            title: "Cyber Essentials",
            desc: "The certificate certifies that the organization was assessed as meeting the Cyber Essentials implementation profile and thus that, at the time of testing, the organization’s ICT defences were assessed as satisfactory against commodity based cyber attack. However this certificate does not any way guarantee that the organization’s defences will remain satisfactory against a cyber attack."
        },
        {
            img: "/assets/img/maypas_credentials/IOD-logo-1.jpg",
            title: "Institute of Directors",
            desc: "The Institute of Directors is a business organisation for company directors, senior business leaders and entrepreneurs. It is the UK’s longest running organisation for professional leaders, having been founded in 1903 and incorporated by Royal Charter in 1906."
        },
        {
            img: "/assets/img/maypas_credentials/instHospital.jpeg",
            title: "Institute of Hospitality",
            desc: "Institute of Hospitality is the professional body for managers working and studying in the hospitality, leisure and tourism industry.​"
        },
        {
            img: "/assets/img/maypas_credentials/ersa.jpg",
            title: "Employment Related Services Association",
            desc: "The Employment Related Services Association (ERSA) is the membership body for the employment support sector.  Established in 2005, we campaign for and support the delivery of ever better services for the nation’s jobseekers and learners."
        },
        {
            img: "/assets/img/maypas_credentials/Matrix-QM-Black.jpg",
            title: "Matrix Standard",
            desc: "The matrix Standard is the Department for Education’s (DfE) standard for ensuring the quality of the delivery of high-quality information, advice and guidance. It is the international quality standard for organisations that deliver information, advice and/or guidance (IAG). Either as their sole purpose or as part of their service offering."
        },
        {
            img: "/assets/img/maypas_credentials/bcs.jpg",
            title: "BCS, The Chartered Institute for IT",
            desc: "BCS, The Chartered Institute for IT, is a professional body and a learned society that represents those working in information technology and computer science, both in the United Kingdom and internationally."
        },
        // {
        //     img: "/assets/img/",
        //     title: "OFQUAL Recognised Partnerships",
        //     desc: "All learning materials are designed and written by professional academic authors so that each interactive module is aligned against specific learning criteria specified by OFQUAL .The Office of Qualifications and Examinations Regulation regulates qualifications, examinations and assessments in England. Maypas College works with OFQUAL recognised Awarding Organisations for the verification of our programmes. These standards ensure those that learn with us receive a high quality education along with certification that is recognised universally by Universities and employers.",
        // }
    ];

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } }
        ]
    };

    return (
  

        <>
            <Layout headerStyle={3} footerStyle={1} breadcrumbTitle="About Us">
                <div>
                    <section className="about-area-two">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-xl-10 col-lg-12">
                                    <div className="about__title-wrap">
                                        <div className="section__title">
                                            <span className="sub-title">Who we are</span>
                                            <h2 className="title tg-svg">Your gateway to affordable, tailored study programs designed to <span className="position-relative"><span className="svg-icon" id="about-svg" data-svg-icon="assets/img/icons/title_shape.svg" />fast-track</span>You to a university qualification. </h2>
                                        </div>
                                        <p className="fw-medium">Welcome to Maypas College</p>
                                        <p>Our online modules are crafted to accommodate diverse learning styles, empowering you to learn at your own pace, and on your schedule.

Our commitment to excellence is evident in our comprehensive support services, including a 24/7 student networking platform, personal dashboards, online tutorials, webinars, and pre-recorded group webcasts. With Maypas College, you’ll have all the tools you need to excel in developing your professional skill set and achieving your academic goals.

Our dedicated team of advisers is here to ensure you choose the right course for your future. From enrolment assistance to exploring financing options, we’re here to support you every step of the way.

Behind the scenes, our Quality Monitoring Board (QMB) ensures that our courses meet the highest standards. Comprising respected academic and business leaders, the QMB guarantees transparency and accountability in our operations. We value your feedback and continuously strive to enhance our services through a rigorous and objective process.

Join us at Maypas College and embark on a journey of discovery and growth.Let’s shape your future together through our innovative learning pathways.</p>
                                        <div className="tg-button-wrap">
                                            <Link href="/courses" className="btn tg-svg"><span className="text">Explore Courses</span> <span className="svg-icon" id="about-btn" data-svg-icon="assets/img/icons/btn-arrow.svg" /></Link>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="col-xl-7 col-lg-6 col-md-11">
                                    <div className="about__images-wrap">
                                        <div className="column">
                                            <img src="/assets/img/others/about_img03.jpg" alt="img" />
                                        </div>
                                        <div className="column">
                                            <img src="/assets/img/others/about_img04.jpg" alt="img" />
                                            <img src="/assets/img/others/about_img05.jpg" alt="img" />
                                        </div>
                                        <div className="about__shapes">
                                            <img src="/assets/img/objects/about_shape01.png" alt="img" className="about-shape-01" data-aos="fade-down-left" />
                                            <img src="/assets/img/objects/about_shape02.png" alt="img" className="about-shape-02" data-aos="fade-up-right" />
                                            <img src="/assets/img/objects/about_shape03.png" alt="img" className="about-shape-03 rotateme" />
                                        </div>
                                    </div>  
                                </div> */}
                            </div>
                        </div>
                    </section>
                     <section className="fact-area fact-bg" data-background="/assets/img/bg/fact_bg.jpg">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-xl-12 col-lg-12 col-m d-9">
                                    <div className="section__title text-center mb-50">
                                        <span className="sub-title">Our Credentials</span>
                                        <h2 className="title tg-svg">Maypas College operates to the <span className="position-relative"><span className="svg-icon" id="fact-title" data-svg-icon="assets/img/icons/title_shape.svg" />highest academic standards</span>and has multiple structures in place that ensure the standard of education provided to its students is of the highest quality. Below is a list of Corporate bodies we belong to and associations we are a part of</h2>
                                    </div>
                                </div>
                            </div>
                            <Slider {...sliderSettings}>
                                {factItems.map((item, idx) => (
                                    <div key={idx}>
                                        <div className="fact__item-two text-center fact__item-equal">
                                            <div className="fact__icon-two">
                                                <img src={item.img} alt="img" />
                                            </div>
                                            <div className="fact__content-two">
                                                <h3 className="">{item.title}</h3>
                                                <p>{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </section>
                    <section className="mentors-area position-relative section-pt-120 section-pb-90">
                        <div className="container">
                            <div className="section__title-wrap mb-55">
                                <div className="row align-items-center gap-4 gap-md-0">
                                    <div className="col-md-8">
                                        <div className="section__title text-center text-md-start">
                                            <span className="sub-title">Our Qualified People Matter</span>
                                            <h2 className="title tg-svg">Top <span className="position-relative"><span className="svg-icon" id="svg-8" data-svg-icon="assets/img/icons/title_shape.svg" />Class</span> Mentors</h2>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        {/* <div className="tg-button-wrap justify-content-center justify-content-md-end">
                                            <Link href="/instructor" className="btn btn-border tg-svg"><span className="text">All Instructors</span> <span className="svg-icon" id="mentors-btn" data-svg-icon="assets/img/icons/btn-arrow.svg" /></Link>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-xl-3 col-lg-4 col-sm-6">
                                    <div className="mentors__item">
                                        <div className="mentors__img">
                                            
                                                <img src="/assets/img/tutors/mike-donald-min.jpg" alt="mentor" />
                                           
                                            {/* <div className="mentors__social">
                                                <span className="share"><i className="flaticon-share" /></span>
                                                <ul className="social-list list-wrap">
                                                    <li><Link href="#"><i className="fab fa-facebook-f" /></Link></li>
                                                    <li><Link href="#"><i className="fab fa-twitter" /></Link></li>
                                                    <li><Link href="#"><i className="fab fa-linkedin-in" /></Link></li>
                                                </ul>
                                            </div> */}
                                        </div>
                                        <div className="mentors__content">
                                            <div className="mentors__content-top">
                                                <h4 className="name">Mike Donald</h4>
                                                <span className="designation">Teaching for 30+ years to classes from primary to advanced level. Tutorial work with degree level and postgraduate students. Development of online courses for 16 years.

</span>
                                            </div>
                                            {/* <div className="mentors__content-bottom">
                                                <ul className="list-wrap">
                                                    <li className="students"><i className="flaticon-user-1" />1,135 Students</li>
                                                    <li className="rating">
                                                        <i className="fas fa-star" />
                                                        <span className="rating-count">(5.0)</span>
                                                    </li>
                                                </ul>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-sm-6">
                                    <div className="mentors__item">
                                        <div className="mentors__img">
                                            
                                                <img src="/assets/img/tutors/alan-sampson-min.jpg" alt="mentor" />
                                           
                                            {/* <div className="mentors__social">
                                                <span className="share"><i className="flaticon-share" /></span>
                                                <ul className="social-list list-wrap">
                                                    <li><Link href="#"><i className="fab fa-facebook-f" /></Link></li>
                                                    <li><Link href="#"><i className="fab fa-twitter" /></Link></li>
                                                    <li><Link href="#"><i className="fab fa-linkedin-in" /></Link></li>
                                                </ul>
                                            </div> */}
                                        </div>
                                        <div className="mentors__content">
                                            <div className="mentors__content-top">
                                                <h4 className="name">Alan Sampson</h4>
                                                <span className="designation">Alan has extensive experience in education, in different educational management positions including curriculum development, staff management and general educational operations.

</span>
                                            </div>
                                            {/* <div className="mentors__content-bottom">
                                                <ul className="list-wrap">
                                                    <li className="students"><i className="flaticon-user-1" />1,135 Students</li>
                                                    <li className="rating">
                                                        <i className="fas fa-star" />
                                                        <span className="rating-count">(4.9)</span>
                                                    </li>
                                                </ul>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-sm-6">
                                    <div className="mentors__item">
                                        <div className="mentors__img">
                                          
                                                <img src="/assets/img/tutors/fraser-min.jpg" alt="mentor" />
                                           
                                            {/* <div className="mentors__social">
                                                <span className="share"><i className="flaticon-share" /></span>
                                                <ul className="social-list list-wrap">
                                                    <li><Link href="#"><i className="fab fa-facebook-f" /></Link></li>
                                                    <li><Link href="#"><i className="fab fa-twitter" /></Link></li>
                                                    <li><Link href="#"><i className="fab fa-linkedin-in" /></Link></li>
                                                </ul>
                                            </div> */}
                                        </div>
                                        <div className="mentors__content">
                                            <div className="mentors__content-top">
                                                <h4 className="name">Fraser Kennedy

</h4>
                                                <span className="designation">Fraser has over 20 years experience in IT & Business covering such areas as Networking, Website Administration, Software Roll-outs, Financial Programme Management and policy network.</span>
                                            </div>
                                            {/* <div className="mentors__content-bottom">
                                                <ul className="list-wrap">
                                                    <li className="students"><i className="flaticon-user-1" />3,235 Students</li>
                                                    <li className="rating">
                                                        <i className="fas fa-star" />
                                                        <span className="rating-count">(4.7)</span>
                                                    </li>
                                                </ul>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-sm-6">
                                    <div className="mentors__item">
                                        <div className="mentors__img">
                                           
                                                <img src="/assets/img/tutors/glory-min.jpg" alt="mentor" />
                                           
                                            {/* <div className="mentors__social">
                                                <span className="share"><i className="flaticon-share" /></span>
                                                <ul className="social-list list-wrap">
                                                    <li><Link href="#"><i className="fab fa-facebook-f" /></Link></li>
                                                    <li><Link href="#"><i className="fab fa-twitter" /></Link></li>
                                                    <li><Link href="#"><i className="fab fa-linkedin-in" /></Link></li>
                                                </ul>
                                            </div> */}
                                        </div>
                                        <div className="mentors__content">
                                            <div className="mentors__content-top">
                                                <h4 className="name">Glory Eke</h4>
                                                <span className="designation">With more than ten years work experience in the Healthcare and Training sectors, Glory is a qualified assessor and lecturer, delivering programmes in Health and Social Care.</span>
                                            </div>
                                            {/* <div className="mentors__content-bottom">
                                                <ul className="list-wrap">
                                                    <li className="students"><i className="flaticon-user-1" />2,235 Students</li>
                                                    <li className="rating">
                                                        <i className="fas fa-star" />
                                                        <span className="rating-count">(4.2)</span>
                                                    </li>
                                                </ul>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>


                                 <div className="col-xl-3 col-lg-4 col-sm-6">
                                    <div className="mentors__item">
                                        <div className="mentors__img">
                                           
                                                <img src="/assets/img/tutors/joanna-min.jpg" alt="mentor" />
                                         
                                            {/* <div className="mentors__social">
                                                <span className="share"><i className="flaticon-share" /></span>
                                                <ul className="social-list list-wrap">
                                                    <li><Link href="#"><i className="fab fa-facebook-f" /></Link></li>
                                                    <li><Link href="#"><i className="fab fa-twitter" /></Link></li>
                                                    <li><Link href="#"><i className="fab fa-linkedin-in" /></Link></li>
                                                </ul>
                                            </div> */}
                                        </div>
                                        <div className="mentors__content">
                                            <div className="mentors__content-top">
                                                <h4 className="name">Joanna Hambridge</h4>
                                                <span className="designation">Joanna is an experienced professional within the Hospitality, Events and Marketing industries with 15 years of practical experience.</span>
                                            </div>
                                            {/* <div className="mentors__content-bottom">
                                                <ul className="list-wrap">
                                                    <li className="students"><i className="flaticon-user-1" />2,235 Students</li>
                                                    <li className="rating">
                                                        <i className="fas fa-star" />
                                                        <span className="rating-count">(4.2)</span>
                                                    </li>
                                                </ul>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>


                                 <div className="col-xl-3 col-lg-4 col-sm-6">
                                    <div className="mentors__item">
                                        <div className="mentors__img">
                                           
                                                <img src="/assets/img/tutors/jeremy-min.jpg" alt="mentor" />
                                          
                                            {/* <div className="mentors__social">
                                                <span className="share"><i className="flaticon-share" /></span>
                                                <ul className="social-list list-wrap">
                                                    <li><Link href="#"><i className="fab fa-facebook-f" /></Link></li>
                                                    <li><Link href="#"><i className="fab fa-twitter" /></Link></li>
                                                    <li><Link href="#"><i className="fab fa-linkedin-in" /></Link></li>
                                                </ul>
                                            </div> */}
                                        </div>
                                        <div className="mentors__content">
                                            <div className="mentors__content-top">
                                                <h4 className="name">Jeremy Oughton</h4>
                                                <span className="designation">Jeremy is an experienced educational and training manager, with a background in the Hospitality industry, who has gained experience of working with multi-cultural teams in UK & Asia.</span>
                                            </div>
                                            {/* <div className="mentors__content-bottom">
                                                <ul className="list-wrap">
                                                    <li className="students"><i className="flaticon-user-1" />2,235 Students</li>
                                                    <li className="rating">
                                                        <i className="fas fa-star" />
                                                        <span className="rating-count">(4.2)</span>
                                                    </li>
                                                </ul>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mentors__shapes">
                            <img src="/assets/img/objects/mentors_shape01.png" alt="shape" />
                            <img src="/assets/img/objects/mentors_shape02.png" alt="shape" />
                        </div>
                    </section>
                    {/* <section className="cta-area-two position-relative">
                        <div className="cta__bg" data-background="/assets/img/bg/cta_bg.jpg" />
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-xl-8 col-lg-10">
                                    <div className="cta__content">
                                        <p>ARE YOU READY FOR THIS OFFER</p>
                                        <h2 className="title">50% Offer For Very First 50</h2>
                                        <h5 className="sub-title">Student’s  Mentors</h5>
                                        <div className="tg-button-wrap justify-content-center">
                                            <Link href="/contact" className="btn tg-svg"><span className="text">Become a Student</span> <span className="svg-icon" id="cta-btn-2" data-svg-icon="assets/img/icons/btn-arrow.svg" /></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cta__shapes">
                            <img src="/assets/img/objects/cta_shape001.svg" alt="img" className="position-absolute" data-aos="fade-down-right" data-aos-delay={300} />
                            <img src="/assets/img/objects/cta_shape002.png" alt="img" className="position-absolute" />
                            <img src="/assets/img/objects/cta_shape003.svg" alt="img" className="position-absolute" data-aos="fade-up-left" data-aos-delay={300} />
                        </div>
                    </section> */}
                    {/* <section className="events-area position-relative section-pt-120 section-pb-90">
                        <div className="container">
                            <div className="section__title-wrap mb-55">
                                <div className="row align-items-center gap-4 gap-md-0">
                                    <div className="col-md-8">
                                        <div className="section__title text-center text-md-start">
                                            <span className="sub-title">Featured Events</span>
                                            <h2 className="title tg-svg">Upcoming <span className="position-relative"><span className="svg-icon" id="event-svg" data-svg-icon="assets/img/icons/title_shape.svg" />Events</span></h2>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="tg-button-wrap justify-content-center justify-content-md-end">
                                            <Link href="/events" className="btn btn-border tg-svg"><span className="text">Our All Events</span> <span className="svg-icon" id="events-btn" data-svg-icon="assets/img/icons/btn-arrow.svg" /></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-lg-4 col-md-6 col-sm-10">
                                    <div className="events__item shine__animate-item">
                                        <div className="events__item-thumb">
                                            <Link href="/events-details" className="shine__animate-link">
                                                <img src="/assets/img/events/event_thumb01.jpg" alt="img" />
                                            </Link>
                                            <span className="events__date"><i className="flaticon-calendar-date" /> 25 May, 2023</span>
                                        </div>
                                        <div className="events__item-content">
                                            <h4 className="title"><Link href="/events-details">Aewe Creating Futures Through
                                                Technology Conference</Link></h4>
                                            <span className="location"><i className="flaticon-pin-1" /> United Kingdom</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-10">
                                    <div className="events__item shine__animate-item">
                                        <div className="events__item-thumb">
                                            <Link href="/events-details" className="shine__animate-link">
                                                <img src="/assets/img/events/event_thumb02.jpg" alt="img" />
                                            </Link>
                                            <span className="events__date"><i className="flaticon-calendar-date" /> 25 May, 2023</span>
                                        </div>
                                        <div className="events__item-content">
                                            <h4 className="title"><Link href="/events-details">Exactly How Technology Can Make Reading Better</Link></h4>
                                            <span className="location"><i className="flaticon-pin-1" /> Tokyo Japan</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-10">
                                    <div className="events__item shine__animate-item">
                                        <div className="events__item-thumb">
                                            <Link href="/events-details" className="shine__animate-link">
                                                <img src="/assets/img/events/event_thumb03.jpg" alt="img" />
                                            </Link>
                                            <span className="events__date"><i className="flaticon-calendar-date" /> 25 May, 2023</span>
                                        </div>
                                        <div className="events__item-content">
                                            <h4 className="title"><Link href="/events-details">Aewe Creating Futures Through
                                                Technology Conference</Link></h4>
                                            <span className="location"><i className="flaticon-pin-1" /> New Work</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mentors__shapes">
                            <img src="/assets/img/objects/mentors_shape01.png" alt="shape" />
                            <img src="/assets/img/objects/events_shape.png" width={98} alt="shape" />
                        </div>
                    </section> */}
                </div>
                     <style jsx>{`
                    .fact__item-equal {
                        min-height: 420px;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: center;
                        background: #fff;
                        border-radius: 12px;
                        box-shadow: 0 2px 16px rgba(0,0,0,0.04);
                        padding: 2rem 1rem;
                        margin: 0 10px;
                    }
                    .fact__icon-two img {
                        max-width: 120px;
                        max-height: 120px;
                        object-fit: contain;
                        margin-bottom: 1rem;
                    }
                    .fact__content-two h3 {
                        font-size: 1.2rem;
                        font-weight: 600;
                        margin-bottom: 0.7rem;
                    }
                    .fact__content-two p {
                        font-size: 1rem;
                        color: #555;
                    }
                `}</style>   

            </Layout>
        </>
    )
}