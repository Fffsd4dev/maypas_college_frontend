import data from "@/util/courses"
import Isotope from "isotope-layout"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { getCategories } from '../../util/courseCategoryApi';
import { fetchCourses } from '@/util/courseApi';

export default function PortfolioFilter1() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((data) => {
        const arr = Array.isArray(data) ? data : data.data || [];
        setCategories(arr);
      })
      .catch(() => setCategories([]));
    fetchCourses()
      .then((data) => {
        const arr = Array.isArray(data) ? data : data.data || [];
        setCourses(arr);
      })
      .catch(() => setCourses([]));
  }, []);
      
    // Isotope
    const isotope = useRef()
    const [filterKey, setFilterKey] = useState("*")
    useEffect(() => {
        setTimeout(() => {
            isotope.current = new Isotope(".courses-active", {
                itemSelector: ".grid-item",
                percentPosition: true,
                masonry: {
                    columnWidth: ".grid-item",
                },
                animationOptions: {
                    duration: 750,
                    easing: "linear",
                    queue: false,
                },
            })
        }, 1000)
    }, [courses])
    useEffect(() => {
        if (isotope.current) {
            filterKey === "*"
                ? isotope.current.arrange({ filter: `*` })
                : isotope.current.arrange({ filter: `.${filterKey}` })
        }
    }, [filterKey])
    const handleFilterKeyChange = useCallback((key) => () => {
        setFilterKey(key)
    },
        []
    )
    const activeBtn = (value) => (value === filterKey ? "active" : "")
    return (
        <>
            <div className="section__title-wrap">
                <div className="row align-items-end">
                    <div className="col-lg-6">
                        <div className="section__title text-center text-lg-start">
                            <span className="sub-title">10,000+ Unique Online Courses</span>
                            <h2 className="title tg-svg">Our <span className="position-relative"><span className="svg-icon" id="svg-4" data-svg-icon="assets/img/icons/title_shape.svg" />Featured</span>
                                Courses</h2>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="courses__nav-active">
                            <button className={activeBtn("*")} onClick={handleFilterKeyChange("*")}>All Courses <span>New</span></button>
         {categories.map((cat) => (
    <button
      key={cat.id}
      className={activeBtn(`cat-${cat.id}`)}
      onClick={handleFilterKeyChange(`cat-${cat.id}`)}
    >
      {cat.name}
    </button>
  ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="row courses-active row-cols-1 row-cols-xl-3 row-cols-lg-2 row-cols-md-2 row-cols-sm-1">
                <div className="row courses-active row-cols-1 row-cols-xl-3 row-cols-lg-2 row-cols-md-2 row-cols-sm-1">
{courses.map((course) => (
          <div
            className={`col grid-item cat-${course.course_category_id}`}
            key={course.id}
          >
            <div className="courses__item shine__animate-item" style={{ minHeight: '450px',  }} >
              <div className="courses__item-thumb">
                <Link
                  href={`/course/${course.id}`}
                  className="courses__item-tag"
                  style={{ backgroundColor: '#4f8cff' }}
                >
                  {categories.find((cat) => String(cat.id) === String(course.course_category_id))?.name || 'Category'}
                </Link>
                <Link href={`/course/${course.id}`} className="shine__animate-link">
                  <img
                    src={
                      course.featured_image_path
                        ? process.env.NEXT_PUBLIC_API_BASE_URL + '/storage/' + course.featured_image_path
                        : '/assets/img/courses/default.png'
                    }
                    alt="img"
                                            style= {{ objectFit: 'cover', width: '370px', height: '300px' }}

                  />
                </Link>
              </div>
              <div className="courses__item-content">
                <div className="author">
                                        {/* <Link href="/instructor-details"><img src="/assets/img/courses/course_author.png" alt="img" /></Link>
                                        <Link href="/instructor-details">David Millar</Link> */}
                                    </div>
                <h5 className="title">
                  <Link href={`/course/${course.id}`}>{course.title}</Link>
                </h5>
                <div className="courses__item-bottom">
                    <div className="author">
                                        {/* <Link href="/instructor-details"><img src="/assets/img/courses/course_author.png" alt="img" /></Link>
                                        <Link href="/instructor-details">David Millar</Link> */}
                                    </div>
                  <h5 className="price">£ {course.price}</h5>
                </div>
              </div>
            </div>
          </div>
        ))}
</div>
            </div>
        </>
    )
}
