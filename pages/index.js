import Icon from "@mdi/react";
import { mdiArrowDownThinCircleOutline  } from "@mdi/js";
import { AnimatePresence, motion } from "framer-motion";
import { H1, H2, H3, P } from "components/CustomTags";
import Head from "next/head";
import { useState, useEffect, useRef } from "react";

function Home() {
  var [scrollHeight, setScrollHeight] = useState(0);
  const [arrowHeight, setArrowHeight] = useState(0);
  const ref = useRef(null);
  
  const handleScroll = () => {
    setScrollHeight(window.scrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    if (ref.current) { setArrowHeight(ref.current.clientHeight); }
    return () => window.removeEventListener("scroll", handleScroll);
  }), [];

  return (
    <>
      <Head>
        <title>njf - Home</title>
      </Head>

      <div className="absolute top-0 bottom-0 h-full left-0 right-0 w-full overflow-hidden object-cover
        bg-gradient-to-b from-yellow-400 via-red-600 to-blue-700
        flex place-items-center">
          <div className="mx-auto" />
          <div className="flex flex-col justify-between h-full w-max">
            <div />
            <div className="flex flex-col center">
              <H1 className="!text-7xl text-center">Nicholas Fasching</H1>
              <br className="select-none" />
              <div className="relative">
                <AnimatePresence>
                  {CycleText([
                    "Full Stack Web Dev",
                    "Software Engineer",
                    "Open Source Enthusiast",
                    "Programmer",
                    "Hardware Enthusiast",
                    "Tech Lover",
                  ], 2.5,
                  {
                    initial: { opacity: 0, y: 20, rotateX: -90 },
                    animate: { opacity: 1, y: 0, rotateX: 0 },
                    exit: { opacity: 0, y: -20, rotateX: 90 },
                    transition: { duration: 0.4, ease: "easeInOut" }
                  })}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex justify-between pb-10">
              <div />
              <AnimatePresence exitBeforeEnter>
                {scrollHeight <= 150 ? (
                  <motion.div
                    key={0}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                    <motion.div
                      animate={{ y: [0, 25, 0] }}
                      transition={{ ease: "easeInOut", duration: 1, repeat: Infinity }}
                      >
                      <Icon path={mdiArrowDownThinCircleOutline}
                        ref={ref}
                        size={3}
                        className="text-neutral-50" />
                    </motion.div>
                  </motion.div>
                ) : <div style={{ height: `${arrowHeight}px` }} />}
              </AnimatePresence>
              <div />
            </div>
          </div>
          <div className="mx-auto" />
      </div>

      <div className="absolute top-[100%] w-[100%]">
        <div className="bg-gradient-to-b from-blue-700 via-blue-700 h-[25vh] w-[100%]"/>
        <div className="p-10">
          <P>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo tempore necessitatibus exercitationem soluta ipsum consequuntur eligendi repellendus beatae veniam molestias distinctio laborum corrupti enim, recusandae cumque, pariatur natus? Quas, magni!</P>
        </div>
      </div>
    </>
  )
}

// A function that cycles through an array of strings
// and returns the next one every second
const CycleText = (textArray, delay, {initial, animate, exit, transition}) => {
  const [index, setIndex] = useState(1);
  const [timer, setTimer] = useState(false);
  const [content, setContent] = useState(<motion.div
      key={0}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      className="absolute left-0 top-0 w-full">
      <H2 className="!text-4xl text-center">{textArray[0]}</H2>
    </motion.div>);

  useEffect(() => {
    setTimeout(() => {
      setIndex(index => (index + 1) % textArray.length);
      
      var i = index;
      setContent(<motion.div
        key={index}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={transition}
        className="absolute left-0 top-0 w-full">
        <H2 className="!text-4xl text-center">{textArray[index]}</H2>
      </motion.div>);

      setTimer(!timer);
    }, delay * 1000);
  }, [timer]);

  return content;
}

export default Home;