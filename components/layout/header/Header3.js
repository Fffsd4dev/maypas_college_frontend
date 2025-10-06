import Link from "next/link"
import { useRouter } from "next/router"
        
import MobileMenu from "../MobileMenu"
import { Menu } from '@headlessui/react'
export default function Header3({ scroll, isMobileMenu, handleMobileMenu }) {
     const router = useRouter();

    // Helper to check if route is active
    const isActive = (href) => router.pathname === href;
    return (
        <>
            <div id="header-fixed-height" />
            <header className="tg-header__style-three">
                <div className="tg-header__top">
                    <div className="container custom-container">
                        <div className="row">
                            <div className="col-md-6">
                                <ul className="tg-header__top-info list-wrap">
                                    <li><i className="flaticon-pin" /> <span>Ground flr, 3 Merus Court, Meridian Business Park, Leicester, LE19 1RJ</span></li>
                                    <li><i className="flaticon-email" /> <Link href="mailto:info@maypascollege.com"> info@maypascollege.com</Link></li>
                                </ul>
                            </div>
                            <div className="col-md-6">
                                <ul className="tg-header__top-social list-wrap">
                                    <li>Follow Us On :</li>
                                    <li><Link href="#"><i className="fab fa-facebook-f" /></Link></li>
                                    <li><Link href="#"><i className="fab fa-twitter" /></Link></li>
                                    <li><Link href="#"><i className="fab fa-whatsapp" /></Link></li>
                                    <li><Link href="#"><i className="fab fa-linkedin-in" /></Link></li>
                                    <li><Link href="#"><i className="fab fa-youtube" /></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="sticky-header" className={`tg-header__area ${scroll ? "sticky-menu" : ""}`}>
                    <div className="container custom-container">
                        <div className="row">
                            <div className="col-12">
                                <div className="mobile-nav-toggler" onClick={handleMobileMenu}><i className="tg-flaticon-menu-1" /></div>
                                <div className="tgmenu__wrap">
                                    <nav className="tgmenu__nav">
                                        <div className="logo">
                                            <Link href="/"><img src="/assets/img/logo/logo.png" alt="Logo" /></Link>
                                        </div>
                                        <div className="tgmenu__categories d-none d-md-block">
                                            {/* <Menu as="div" className="dropdown">
                                                <Menu.Button as="button" className="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <svg width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 12H6.85714V6.85714H12V12ZM5.14286 12H0V6.85714H5.14286V12ZM12 5.14286H6.85714V0H12V5.14286ZM5.14286 5.14286H0V0H5.14286V5.14286Z" fill="currentcolor" />
                                                    </svg>
                                                    Categories
                                                </Menu.Button>
                                                <Menu.Items as="ul" className="dropdown-menu d-block" aria-labelledby="dropdownMenuButton1">
                                                    <li><Link className="dropdown-item" href="/courses">Business</Link></li>
                                                    <li><Link className="dropdown-item" href="/courses">Data Science</Link></li>
                                                    <li><Link className="dropdown-item" href="/courses">Art  Design</Link></li>
                                                    <li><Link className="dropdown-item" href="/courses">Marketing</Link></li>
                                                    <li><Link className="dropdown-item" href="/courses">Finance</Link></li>
                                                </Menu.Items>
                                            </Menu> */}
                                        </div>
                                          <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-xl-flex">
                <ul className="navigation">
                    <li className={isActive("/") ? "active sub-menu" : "sub-menu"}>
                        <Link href="/">Home</Link>
                    </li>
                    <li className={isActive("/courses") ? "active" : ""}>
                        <Link href="/courses">Courses</Link>
                    </li>
                    <li className={isActive("/about-us") ? "active sub-menu" : "sub-menu"}>
                        <Link href="/about-us">About Us</Link>
                    </li>
                    <li className={isActive("/blog") ? "active sub-menu" : "sub-menu"}>
                        <Link href="/blog">Blog</Link>
                    </li>
                    <li className={isActive("/faq") ? "active sub-menu" : "sub-menu"}>
                        <Link href="/faq">FAQs</Link>
                    </li>
                </ul>
            </div>
                                        <div className="tgmenu__search-bar">
                                            {/* <form action="#">
                                                <input type="text" placeholder="Search For Course . . ." />
                                                <button type="submit"><i className="flaticon-searching" /></button>
                                            </form> */}
                                        </div>
                                        <div className="tgmenu__action">
                                            <ul className="list-wrap">
                                                <li className="header-btn login-btn"><Link href="https://maypas.classportal.online/customer/account/login" className="btn">Log in</Link>
                                                </li>
                                                <li className="header-btn"><Link href="/contact" className="btn">Contact Us</Link></li>
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                                {/* Mobile Menu  */}
                                <div className="tgmobile__menu">
                                    <nav className="tgmobile__menu-box">
                                        <div className="close-btn" onClick={handleMobileMenu}><i className="tg-flaticon-close-1" /></div>
                                        <div className="nav-logo">
                                            <Link href="/"><img src="/assets/img/logo/logo.png" alt="Logo" /></Link>
                                        </div>
                                        <div className="tgmobile__search">
                                            <form action="#">
                                                <input type="text" placeholder="Search here..." />
                                                <button><i className="fas fa-search" /></button>
                                            </form>
                                        </div>
                                        <div className="tgmobile__menu-outer">
    <MobileMenu handleMobileMenu={handleMobileMenu} />
                                        </div>
                                        <div className="tgmenu__action">
                                            <ul className="list-wrap">
                                                <li className="header-btn login-btn"><Link href="https://maypas.classportal.online/customer/account/login" className="btn">Log in</Link></li>
                                                <li className="header-btn"><Link href="/contact" className="btn">Try For Free</Link></li>
                                            </ul>
                                        </div>
                                        <div className="social-links">
                                            <ul className="list-wrap">
                                                <li><Link href="#"><i className="fab fa-facebook-f" /></Link></li>
                                                <li><Link href="#"><i className="fab fa-twitter" /></Link></li>
                                                <li><Link href="#"><i className="fab fa-instagram" /></Link></li>
                                                <li><Link href="#"><i className="fab fa-linkedin-in" /></Link></li>
                                                <li><Link href="#"><i className="fab fa-youtube" /></Link></li>
                                            </ul>
                                        </div>
                                    </nav>
                                </div>
                                <div className="tgmobile__menu-backdrop" onClick={handleMobileMenu} />
                                {/* End Mobile Menu */}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
