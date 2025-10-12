import Link from "next/link";

export default function CourseCard({ item, categories }) {
    const categoryName =
        categories?.find((cat) => String(cat.id) === String(item.course_category_id))?.name || "Category";
    return (
        <div className="courses__item shine__animate-item"  style={{ minHeight: '500px',  }} >
            <div className="courses__item-thumb">
                <Link href={`/course/${item.id}`} className="courses__item-tag" style={{ backgroundColor: '#4f8cff' }}>
                    {categoryName}
                </Link>
                <Link href={`/course/${item.id}`} className="shine__animate-link">
                    <img
                        src={
                            item.featured_image_path
                                ? process.env.NEXT_PUBLIC_API_BASE_URL + '/storage/' + item.featured_image_path
                                : '/assets/img/courses/default.png'
                        }
                        alt="img"
                        style= {{ objectFit: 'cover', width: '300px', height: '300px' }}
                    />
                </Link>
            </div>
            <div className="courses__item-content">
                <h5 className="title">
                    <Link href={`/course/${item.id}`} dangerouslySetInnerHTML={{ __html: item.title }} />
                </h5>
                <div className="courses__item-bottom">
                    <h5 className="price">£ {item.price}</h5>
                </div>
            </div>
        </div>
    );
}