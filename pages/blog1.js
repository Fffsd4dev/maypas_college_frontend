import BlogPost from "@/components/blog/BlogPost"
import Layout from "@/components/layout/Layout"

export default function Blog() {
    return (
        <>
            <Layout 
                headerStyle={3} 
                footerStyle={1}
                headTitle="MayPas College - Professional Education & Training"
                description="MayPas College offers high-quality education and professional training courses. Discover our range of expert-led programs designed to advance your career."
                keywords="education, professional training, online courses, career development, MayPas College" breadcrumbTitle="title">
                <BlogPost showItem={6} style={1} showPagination />
            </Layout>
        </>
    )
}