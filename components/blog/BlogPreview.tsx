import Image from "next/image";
import { H2, H3, P } from 'components/CustomTags'
import { useRouter } from "next/router";
import { isAuthenticated } from 'lib/helpers';
import { useState } from "react";

interface BlogPreviewProps {
    title?: any;
    description?: any;
    publish_date?: any;
    thumbnail?: any;
    link?: any;
    aboveFold?: any;
    onClick?: any;
    published?: any;
    paid?: any;
}

export default function BlogPreview({ title, description, publish_date, thumbnail, link, aboveFold, onClick, published, paid }: BlogPreviewProps) {
    const router = useRouter();

    const formatted_date = new Date(publish_date).toLocaleDateString();

    const [isAdmin, setAdmin] = useState(false);
    (async () => {
        setAdmin(await isAuthenticated(true));
    })();

    return <li className="flex flex-col gap-2 bg-neutral-800 rounded-xl h-full p-5 cursor-pointer" onClick={link ? () => {router.push(link)} : onClick}>
        <div className="flex flex-col h-[55%] md:h-[65%] rounded-[5px] overflow-hidden">
            <div className="relative overflow-hidden flex flex-col justify-center h-full w-full bg-neutral-700">
                {(thumbnail && thumbnail !== '') && 
                    // @ts-ignore
                    <Image className="" src={thumbnail} layout='fill' objectFit='cover' alt="image" priority={aboveFold} /> ||
                    <H2 className='w-max mx-auto'>No Image</H2>
                }
            </div>
        
            <div className="flex h-[0px] -translate-y-[20px] ">
                <div className="mx-auto" />
                {isAdmin &&
                    <P 
                        className={`
                            ${
                                published ? 'bg-green-700' : 
                                    publish_date ? 'bg-neutral-500' : 
                                        'bg-red-500'
                            }
                            w-fit h-fit rounded-[5px_0px_0px_0px] px-2 text-sm`
                        }>
                            {published ? 'Published' : publish_date ? 'Hidden' : 'Unpublished'}
                        </P>
                }

                {paid && <P className={`h-fit w-fit text-sm bg-blue-600 px-2 rounded-[${isAdmin ? '0' : '5'}px_0px_0px_0px]`}>Pro</P> }
            </div>
        </div>
        
        <div className="flex flex-col gap-1">
            <div>
                <H2>{title}</H2>
                {publish_date && <H3 className="!text-lg font-semibold">{formatted_date}</H3>}
            </div>

            <P>{description}</P>
        </div>
    </li>
}