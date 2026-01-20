import BlogPost from "@/components/blog/BlogPost"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function BlogGrid() {
    return (
        <>
            <Layout 
                headerStyle={3} 
                footerStyle={1}
                headTitle="MayPas College - Professional Education & Training"
                description="MayPas College offers high-quality education and professional training courses. Discover our range of expert-led programs designed to advance your career."
                keywords="education, professional training, online courses, career development, MayPas College" breadcrumbTitle="Blog Post">
                <section className="blog-grid-area section-py-120">
                    <div className="container">
                        <div className="row justify-content-center">
                            <BlogPost showItem={6} style={1} showPagination />
                        </div>
                    </div>
                </section>

            </Layout>
        </>
    )
}