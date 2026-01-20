import Preloader from "@/components/elements/Preloader"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect, useState } from "react"
// import Cursor from "@/components/elements/CursorEffect"
import { Provider } from "react-redux"
import "slick-carousel/slick/slick.css"
import { store } from "../features/store"
import "@/styles/assets/css/animate.min.css"
import "@/styles/assets/css/aos.css"
import "@/styles/assets/css/bootstrap.min.css"
import "@/styles/assets/css/default-icons.css"
import "@/styles/assets/css/flaticon-eduvalt.css"
import "@/styles/assets/css/fontawesome-all.min.css"
import "@/styles/assets/css/magnific-popup.css"
import "@/styles/assets/css/main.css"
import "@/styles/assets/css/odometer.css"
import "@/styles/assets/css/select2.min.css"
import "@/styles/assets/css/spacing.css"
// import "/public/assets/css/tg-cursor.css"

function MyApp({ Component, pageProps }) {

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
        AOS.init({
            duration: 1000,
            mirror: true,
            once: true,
            disable: 'mobile',
        })
    }, [])
    return (<>
        {/* <Cursor /> */}
        {!loading ? (
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        ) : (
            <Preloader />
        )}
    </>)
}

export default MyApp
