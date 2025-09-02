import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchBlogs } from "@/util/blogApi";

export default function BlogDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [blogPost, setBlogPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        setError("");
        // Fetch all blogs to determine previous/next
        fetchBlogs()
            .then(allBlogs => {
                setBlogs(allBlogs);
                return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/blog/get/${id}`);
            })
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch blog");
                return res.json();
            })
            .then(data => setBlogPost(data))
            .catch(() => setError("Oops, something went wrong. Please try again later."))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div style={{ textAlign: "center", margin: "2rem" }}>Loading blog...</div>;
    if (error) return <div style={{ textAlign: "center", margin: "2rem", color: "#ff4f4f" }}>{error}</div>;
    if (!blogPost) return <div style={{ textAlign: "center", margin: "2rem" }}>Blog not found.</div>;

    // Find previous and next blog IDs
    const blogIds = blogs.map(b => b.id).sort((a, b) => a - b);
    const currentIndex = blogIds.indexOf(Number(id));
    const prevId = currentIndex > 0 ? blogIds[currentIndex - 1] : null;
    const nextId = currentIndex < blogIds.length - 1 ? blogIds[currentIndex + 1] : null;

    return (
        <Layout headerStyle={3} footerStyle={1} breadcrumbTitle="Blog Details">
            <section className="blog-standard-area section-py-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="blog__standard-post blog__details-wrapper">
                                <div className="blog__standard-thumb">
                                    <img
                                        src={
                                            blogPost.featured_image_path
                                                ? process.env.NEXT_PUBLIC_API_BASE_URL + "/storage/" + blogPost.featured_image_path
                                                : "/assets/img/blog/blog_thumb07.jpg"
                                        }
                                        className="w-100"
                                        alt={blogPost.title}
                                    />
                                </div>
                                <div className="blog__standard-content blog-details-content">
                                    <h3 className="title">{blogPost.title}</h3>
                                    <ul className="list-wrap blog__post-meta">
                                        <li><i className="flaticon-account" /> by
                                         {/* <Link href="#">User {blogPost.user_id}</Link> */}
                                         </li>
                                        <li><i className="flaticon-calendar-date" /> {blogPost.created_at?.slice(0, 10)}</li>
                                    </ul>
                                    <p>{blogPost.excerpt || ""}</p>
                                    <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
                                </div>
                            </div>
                            <div className="blog__next-prev mb-50">
                                <div className="row">
                                    {prevId && (
                                        <div className="col-md-6">
                                            <div className="blog__prev-item">
                                                <div className="blog__prev-thumb">
                                                    <Link href={`/blog/${prevId}`}>
                                                        <img src="/assets/img/blog/blog_standard04.jpg" alt="Previous Blog" />
                                                    </Link>
                                                </div>
                                                <div className="blog__prev-content">
                                                    <span className="caption">Previous Post</span>
                                                    <h5 className="title">
                                                        <Link href={`/blog/${prevId}`}>Previous Blog</Link>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {nextId && (
                                        <div className="col-md-6">
                                            <div className="blog__prev-item next">
                                                <div className="blog__prev-thumb">
                                                    <Link href={`/blog/${nextId}`}>
                                                        <img src="/assets/img/blog/blog_standard03.jpg" alt="Next Blog" />
                                                    </Link>
                                                </div>
                                                <div className="blog__prev-content">
                                                    <span className="caption">Next Post</span>
                                                    <h5 className="title">
                                                        <Link href={`/blog/${nextId}`}>Next Blog</Link>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <aside className="blog-sidebar">
                                <div className="blog-widget">
                                    <h4 className="widget-title">Recent Posts</h4>
                                    {blogs.slice(0, 3).map(b => (
                                        <div className="rc-post-item" key={b.id}>
                                            <div className="rc-post-thumb">
                                                <Link href={`/blog/${b.id}`}>
                                                    <img
                                                        src={
                                                            b.featured_image_path
                                                                ? process.env.NEXT_PUBLIC_API_BASE_URL + "/storage/" + b.featured_image_path
                                                                : "/assets/img/blog/blog_thumb07.jpg"
                                                        }
                                                        alt={b.title}
                                                    />
                                                </Link>
                                            </div>
                                            <div className="rc-post-content">
                                                <h4 className="title"><Link href={`/blog/${b.id}`}>{b.title}</Link></h4>
                                                <span className="date"><i className="flaticon-calendar-date" /> {b.created_at?.slice(0, 10)}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}