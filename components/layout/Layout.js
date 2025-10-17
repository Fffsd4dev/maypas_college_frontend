import { useEffect, useState } from "react"
import BackToTop from '../elements/BackToTop'
import DataBg from "../elements/DataBg"
import Breadcrumb from './Breadcrumb'
import PageHead from './PageHead'
import Footer1 from './footer/Footer1'
import Header1 from "./header/Header1"
import Header2 from './header/Header2'
import Header3 from "./header/Header3"

export default function Layout({ headerStyle, footerStyle, headTitle, breadcrumbTitle, children }) {
    const [scroll, setScroll] = useState(false)
    const [isMobileMenu, setMobileMenu] = useState(false)

    const handleMobileMenu = () => {
        setMobileMenu(prev => {
            const next = !prev
            document.body.classList.toggle("mobile-menu-visible", next)
            return next
        })
    }

    useEffect(() => {
        const onScroll = () => {
            setScroll(window.scrollY > 100)
        }
        // attach and run once to initialize
        document.addEventListener("scroll", onScroll)
        onScroll()
        return () => {
            document.removeEventListener("scroll", onScroll)
        }
    }, [])

    return (
        <>
            <PageHead headTitle={headTitle} />

            {!headerStyle && <Header1 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} />}
            {headerStyle == 1 ? <Header1 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} /> : null}
            {headerStyle == 2 ? <Header2 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} /> : null}
            {headerStyle == 3 ? <Header3 scroll={scroll} isMobileMenu={isMobileMenu} handleMobileMenu={handleMobileMenu} /> : null}

            <main className="main-area fix">
                {breadcrumbTitle && <Breadcrumb breadcrumbTitle={breadcrumbTitle} />}
                {children}
            </main>

            {!footerStyle && <Footer1 />}
            {footerStyle == 1 ? <Footer1 /> : null}

            <BackToTop />
            <DataBg />

            {/* WhatsApp chat button */}
            <a
                href="https://wa.me/447417473233"
                className="whatsapp-btn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
            >
                <i className="fab fa-whatsapp" />
            </a>

            <style jsx>{`
                .whatsapp-btn {
                    position: fixed;
                    right: 20px;
                    bottom: 80px;
                    width: 56px;
                    height: 56px;
                    background: #25D366;
                    color: #fff;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 6px 18px rgba(37,211,102,0.25);
                    z-index: 9000;
                    transition: transform 0.15s ease, box-shadow 0.15s ease;
                }
                .whatsapp-btn:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 10px 24px rgba(37,211,102,0.28);
                }
                .whatsapp-btn i {
                    font-size: 22px;
                }
                @media (max-width: 600px) {
                    .whatsapp-btn {
                        right: 16px;
                        bottom: 70px;
                        width: 48px;
                        height: 48px;
                    }
                    .whatsapp-btn i { font-size: 20px; }
                }
            `}</style>
        </>
    )
}
