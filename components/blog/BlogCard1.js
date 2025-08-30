import Link from "next/link"

export default function BlogCard1({ item }) {
    return (
        <div className="col-lg-4 col-md-6 col-sm-9">
            <div className="blog__post-item shine__animate-item">
                <div className="blog__post-thumb">
                    <Link href={`/blog/${item.id}`} className="shine__animate-link">
                        <img
                            src={
                                item.featured_image_path
                                    ? process.env.NEXT_PUBLIC_API_BASE_URL + "/storage/" + item.featured_image_path
                                    : "/assets/img/blog/blog_thumb07.jpg"
                            }
                            alt={item.title}
                        />
                    </Link>
                </div>
                <div className="blog__post-content">
                    <Link href="#" className="cat">{item.slug || "Uncategorized"}</Link>
                    <h4 className="title"><Link href={`/blog/${item.id}`}>{item.title}</Link></h4>
                    <ul className="list-wrap blog__post-meta">
                        <li><i className="flaticon-account" /> by <Link href="#">{item.author || "Admin"}</Link></li>
                        <li><i className="flaticon-calendar-date" /> {item.updated_time ? new Date(item.updated_time).toLocaleDateString() : ""}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}