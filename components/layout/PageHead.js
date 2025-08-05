import Head from 'next/head'

const PageHead = ({ headTitle }) => {
    return (
        <>
            <Head>
                <title>
                    {headTitle ? headTitle : "MayPas College"}
                </title>
            </Head>
        </>
    )
}

export default PageHead