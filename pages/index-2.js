import Layout from "@/components/layout/Layout"
import Banner2 from "@/components/sections/Banner2"
import Blog2 from "@/components/sections/Blog2"
import Brand2 from "@/components/sections/Brand2"
import Categories2 from "@/components/sections/Categories2"
import Course2 from "@/components/sections/Course2"
import Cta2 from "@/components/sections/Cta2"
import Cta3 from "@/components/sections/Cta3"
import Fact1 from "@/components/sections/Fact1"
import Mentors1 from "@/components/sections/Mentors1"
import Online1 from "@/components/sections/Online1"
import Testimonial2 from "@/components/sections/Testimonial2"

export default function Home2() {
    return (
        <>
            <Layout headerStyle={2} footerStyle={1}>
                <Banner2 />
                <Fact1 />
                <Categories2 />
                <Course2 />
                <Online1 />
                <Cta2 />
                <Mentors1 />
                <div className="area-bg" data-background="/assets/img/bg/area_bg.jpg">
                    <Testimonial2 />
                    <Brand2 />
                </div>
                <Blog2 />
                <Cta3 />
            </Layout>
        </>
    )
}