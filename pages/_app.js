import Preloader from "@/components/elements/Preloader"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect, useState } from "react"
import Cursor from "@/components/elements/CursorEffect"
import { Provider } from "react-redux"
import "slick-carousel/slick/slick.css"
import { store } from "../features/store"
import "/public/assets/css/animate.min.css"
import "/public/assets/css/aos.css"
import "/public/assets/css/bootstrap.min.css"
import "/public/assets/css/default-icons.css"
import "/public/assets/css/flaticon-eduvalt.css"
import "/public/assets/css/fontawesome-all.min.css"
import "/public/assets/css/magnific-popup.css"
import "/public/assets/css/main.css"
import "/public/assets/css/odometer.css"
import "/public/assets/css/select2.min.css"
import "/public/assets/css/spacing.css"
import "/public/assets/css/tg-cursor.css"
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
        <Cursor />
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
