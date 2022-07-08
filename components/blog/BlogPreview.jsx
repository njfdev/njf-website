import Image from "next/image";
import { H2, H3, P } from 'components/CustomTags'
import { useRouter } from "next/router";

export default function BlogPreview({ title, description, publish_date, thumbnail, link, aboveFold, disableImage, onClick }) {
    const router = useRouter()

    const formatted_date = new Date(publish_date).toLocaleDateString()

    return <li className="flex flex-col gap-2 bg-neutral-800 rounded-xl h-full p-5 cursor-pointer" onClick={link ? () => {router.push(link)} : onClick}>
        {disableImage &&
            <div className="relative flex flex-col justify-center h-[55%] md:h-[65%] w-full bg-neutral-700">
                {thumbnail && 
                    <Image src={thumbnail || ''} layout='fill' objectFit='cover' alt="image" priority={aboveFold} /> ||
                    <H2 className='w-max mx-auto'>No Image</H2>
                }
            </div>
        }
        
        <div className="flex flex-col gap-2">
            <div>
                <H2>{title}</H2>
                <H3 className="!text-lg font-semibold">{formatted_date}</H3>
            </div>

            <P>{description}</P>
        </div>
    </li>
}