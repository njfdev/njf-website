import { H1, H2, P } from 'components/CustomTags';
import Head from 'next/head'
import { useState } from 'react'

function Contact() {
    const [hover, setHover] = useState(false);

    return (
        <>
            <Head>
                <title>Contact | njf</title>
                <meta name="description" content="The contact information for hobbyist developer Nicholas Fasching." />
            </Head>
            <div className="flex flex-col gap-5 py-10 px-5 md:px-24 lg:px-96">
                <H1 className="mx-auto w-max text-center align-middle !text-4xl">Contact Page</H1>
                <P className="mx-auto text-center align-middle w-full" style={{ overflowWrap: "break-word" }}>
                    If you would like to contact{" "}
                    <span 
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        className="bg-neutral-700 px-1 pb-1 align-bottom text-center rounded-md text-neutral-100 font-bold">
                        {hover ? 
                            <span className="bg-gradient-to-r from-yellow-600 via-red-500 to-blue-500 text-transparent" style={{ WebkitBackgroundClip: "text" }}>Nicholas Fasching</span> 
                        : 
                            "me"
                        }
                    </span>
                    , you may send an email to{" "}
                    <b className='bg-gradient-to-r from-yellow-600 via-red-500 to-blue-500 text-transparent' style={{ WebkitBackgroundClip: "text" }}>
                        contact@njf.dev
                    </b>
                    .
                </P>
            </div>
        </>
    )
}

export default Contact;