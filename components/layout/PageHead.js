import Head from 'next/head'
import { useRouter } from 'next/router'

const PageHead = ({ 
    headTitle,
    description = "MayPas College offers high-quality education and professional training courses. Join our diverse learning community and advance your career with expert-led programs.",
    keywords = "education, college, professional training, courses, learning, MayPas College",
    ogImage = "/assets/img/logo/logo2.png",
    ogType = "website",
    siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'MayPas College',
    canonical // optional override
}) => {
    const router = useRouter()
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://maypascollege.com'
    const fullTitle = headTitle ? `${headTitle} | ${siteName}` : `${siteName} - Professional Education & Training`
    const pageUrl = canonical || `${siteUrl}${router.asPath === '/' ? '' : router.asPath}`
    // handle absolute or relative ogImage
    const ogImageUrl = ogImage && (ogImage.startsWith('http://') || ogImage.startsWith('https://'))
        ? ogImage
        : `${siteUrl}${ogImage}`
    
    return (
        <>
            <Head>
                <title>{fullTitle}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                
                {/* Favicon (use files that exist in /public) */}
                <link rel="icon" href="/favicon.ico" />
                {/* fallback apple-touch icon - this project has /favicon.png in public */}
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
                
                {/* Open Graph */}
                <meta property="og:title" content={fullTitle} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content={ogType} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:image" content={ogImageUrl} />
                <meta property="og:site_name" content={siteName} />
                
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={fullTitle} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={ogImageUrl} />
                
                {/* Additional SEO */}
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
                
                {/* Canonical URL */}
                <link rel="canonical" href={pageUrl} />
            </Head>
        </>
    )
}

export default PageHead