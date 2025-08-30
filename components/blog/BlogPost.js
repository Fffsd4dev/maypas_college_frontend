import React, { useState, useEffect } from "react";
import BlogCard1 from "./BlogCard1";
import BlogCard2 from "./BlogCard2";
import Pagination from "./Pagination";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetchBlogs } from "@/util/blogApi";

export default function BlogPost({ style, showItem, showPagination }) {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = showItem || 3;
    const router = useRouter();

    useEffect(() => {
        fetchBlogs().then((data) => {
            let arr = Array.isArray(data) ? data : data.data || [];
            // Sort by updated_time descending
            arr = arr.sort((a, b) => new Date(b.updated_time) - new Date(a.updated_time));
            setBlogs(arr);
        });
    }, []);

    if (blogs.length === 0) return <h3>No Blogs Found</h3>;

    // Only limit to 3 if not on /blog page
    const isBlogPage = router.pathname === "/blog";
    const displayBlogs = isBlogPage ? blogs : blogs.slice(0, 3);

    return (
        <>
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