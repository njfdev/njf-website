import { motion, AnimatePresence } from 'framer-motion';
import { CircularProgress } from '@mui/material';
import { Input } from 'components/CustomTags';

export function SubmitButtonWithProgressSpinner({ buttonClassName, buttonText, spinnerClassName, loading }) {
    return (
        <div className='flex w-full justify-center'>
            <div className='w-[20px] mx-1'/>
            <Input type="submit" value={buttonText} className={`${buttonClassName} my-1 justify-self-center`}/>
            <AnimatePresence exitBeforeEnter>
                {loading &&
                    <motion.div
                        key={"loading-screen"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.05 } }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`${spinnerClassName} text-neutral-800 dark:text-neutral-100 justify-self-end my-auto mx-1 h-max w-max flex justify-center`}
                        >
                            <CircularProgress size={20} color={'inherit'} />
                    </motion.div>
                }
                {!loading && <div key="not-loading" className='w-[20px] mx-1'/>}
            </AnimatePresence>
        </div>
    );
}