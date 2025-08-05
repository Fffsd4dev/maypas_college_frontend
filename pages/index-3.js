import Layout from "@/components/layout/Layout"
import Blog3 from "@/components/sections/Blog3"
import Brand2 from "@/components/sections/Brand2"
import Categories3 from "@/components/sections/Categories3"
import Course3 from "@/components/sections/Course3"
import Cta2 from "@/components/sections/Cta2"
import Cta4 from "@/components/sections/Cta4"
import Events1 from "@/components/sections/Events1"
import Fact2 from "@/components/sections/Fact2"
import QuickAction1 from "@/components/sections/QuickAction1"
import Slider1 from "@/components/sections/Slider1"
import Testimonial3 from "@/components/sections/Testimonial3"

export default function Home3() {
    return (
        <>
            <Layout headerStyle={3} footerStyle={1}>
                <Slider1 />
                <QuickAction1 />
                <Course3 />
                <Fact2 />
                <Categories3 />
                <Cta2 />
                <Events1 />
                <div className="area-bg" data-background="/assets/img/bg/area_bg.jpg">
                    <Testimonial3 />
                    <Brand2 />
                </div>
                <Blog3 />
                <Cta4 />
            </Layout>
        </>
    )
}