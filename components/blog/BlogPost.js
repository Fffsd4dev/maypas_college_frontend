import React, { useState, useEffect } from "react";
import BlogCard1 from "./BlogCard1";
import BlogCard2 from "./BlogCard2";
import Pagination from "./Pagination";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetchBlogs } from "@/util/blogApi";

export default function BlogPost({ style, showItem, showPagination }) {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const limit = showItem || 3;
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        setError("");
        fetchBlogs()
            .then((data) => {
                let arr = Array.isArray(data) ? data : data.data || [];
                arr = arr.sort((a, b) => new Date(b.updated_time) - new Date(a.updated_time));
                setBlogs(arr);
            })
            .catch(() => {
                setError("Oops, something went wrong. Please try again later.");
                setBlogs([]);
            })
            .finally(() => setLoading(false));
    }, []);

    const isBlogPage = router.pathname === "/blog";
    const displayBlogs = isBlogPage ? blogs : blogs.slice(0, 3);

    if (loading) return <div style={{ textAlign: "center", margin: "2rem" }}>Loading blogs...</div>;
    if (error) return <div style={{ textAlign: "center", margin: "2rem", color: "#ff4f4f" }}>{error}</div>;
    if (blogs.length === 0) return <h3 style={{ textAlign: "center", margin: "2rem" }}>No Blogs Found</h3>;

    return (
        <>
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                We found {blogs.length} blog{blogs.length !== 1 ? "s" : ""} for you
            </div>
            {displayBlogs.map(item => (
                <React.Fragment key={item.id}>
                    {style !== 2 ? <BlogCard1 item={item} /> : <BlogCard2 item={item} />}
                </React.Fragment>
            ))}
            {!isBlogPage && blogs.length > 3 && (
                <div style={{ textAlign: "center", marginTop: "2rem" }}>
                    <Link href="/blog" className="btn btn-primary">
                        View More
                    </Link>
                </div>
            )}
        </>
    );
}