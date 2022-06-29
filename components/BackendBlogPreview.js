import { H2, P } from 'components/CustomTags'
import { mdiChevronRight } from '@mdi/js'
import Icon from '@mdi/react'

export default function BackendBlogPreview({ onClick }) {
    return (
        <>
            <div className="flex bg-neutral-700 rounded-md w-full p-5 pr-1 cursor-pointer select-none" onClick={onClick}>
                <div className="grow">
                    <H2>Test Blog</H2>
                    <P>This is a description for the test blog.</P>
                </div>

                <Icon className='shrink-0' path={mdiChevronRight} size={2} />
            </div>  
        </>
    );
}