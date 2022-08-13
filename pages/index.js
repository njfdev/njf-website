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
        <title>Home | njf</title>
        <meta name="description" content="The homepage for hobbyist developer Nicholas Fasching. Come to learn more about computers and programming on my blog." />
      </Head>

      <div className="absolute top-0 bottom-0 h-full left-0 right-0 w-full overflow-hidden object-cover
        flex place-items-center">
          <div className="mx-auto" />
          <div className="flex flex-col justify-between h-full w-max">
            <div />
            <div className="flex flex-col center p-5">
              <H1 className="!text-5xl md:!text-7xl text-center font-bold">Nicholas Fasching</H1>
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

            <div className="flex justify-between pb-2">
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
                    <Icon path={mdiArrowDownThinCircleOutline}
                      ref={ref}
                      size={3}
                      onClick={(e) => { e.preventDefault(); window.scrollTo({ top: window.innerHeight, behavior: "smooth" }); }}
                      className="text-neutral-50 cursor-pointer animate-bounce"
                      style={{ WebkitTapHighlightColor: "transparent" }} />
                  </motion.div>
                ) : <div style={{ height: `${arrowHeight}px` }} />}
              </AnimatePresence>
              <div />
            </div>
          </div>
          <div className="mx-auto" />
      </div>

      <div className="absolute w-[100%] top-full">
        <div className="p-10">
          <P>Aliquip ad ullamco ipsum veniam incididunt tempor cillum mollit commodo eu et cupidatat proident cupidatat dolore dolore cillum. Consectetur quis laborum culpa dolore ad id incididunt ad mollit. Quis sed ullamco eu nostrud eu commodo nulla qui non adipiscing pariatur eiusmod deserunt duis. Anim nostrud anim incididunt eu id minim veniam velit eu ad. Ut aliqua veniam eiusmod aliquip incididunt anim proident voluptate in non consectetur duis. Ea occaecat et culpa anim est consectetur in qui anim aute. Fugiat est veniam consequat proident cupidatat ut mollit incididunt occaecat adipiscing officia lorem labore ex laborum. Lorem proident eiusmod ullamco sint velit occaecat amet culpa excepteur. Sunt commodo dolore nostrud proident dolore mollit aliquip enim pariatur sit ea commodo ullamco proident velit ut labore eiusmod commodo. Eiusmod enim ipsum enim pariatur aliquip ad enim dolor labore excepteur aliquip nisi id fugiat. Duis duis do consectetur dolor cupidatat do magna veniam laborum amet aute dolor sed nostrud aliquip labore laboris. Veniam irure aute reprehenderit consequat elit do labore sint mollit est eiusmod tempor. Nostrud tempor eiusmod eiusmod qui excepteur ut sint ipsum consequat ullamco eiusmod cillum voluptate culpa laboris. Sunt et mollit qui nisi pariatur duis exercitation est exercitation ullamco nulla ea incididunt et ullamco aute exercitation incididunt ad. Consectetur in non est incididunt nisi ad nulla tempor et qui exercitation nulla cillum consequat laborum officia. In ipsum eiusmod sed tempor excepteur aute laboris nulla ipsum exercitation ut ullamco. Et dolor pariatur non incididunt minim cupidatat occaecat excepteur eu. Minim non dolor minim laborum do aliquip aliquip commodo sunt velit reprehenderit culpa excepteur deserunt aute non. Adipiscing pariatur aute sunt anim labore proident excepteur officia eiusmod do. Labore aliquip qui aute sunt magna dolor sunt esse pariatur ea eiusmod esse. Reprehenderit adipiscing ullamco adipiscing cillum reprehenderit qui dolor minim proident ex nisi. Aliqua aliquip voluptate proident nisi ad eiusmod esse minim fugiat aute nulla sed dolor duis exercitation nisi voluptate nostrud eiusmod. Ipsum tempor minim ad dolore incididunt nulla incididunt fugiat aute fugiat magna qui commodo ullamco aute enim consectetur nisi. Elit aliqua ut fugiat ipsum occaecat quis fugiat elit veniam consectetur irure enim ullamco minim. Dolore ad veniam anim ullamco exercitation est eiusmod sint ea deserunt laborum adipiscing adipiscing do occaecat dolore cupidatat et. Est ex excepteur ex veniam ad minim excepteur magna incididunt commodo ullamco laboris ex ea aute cupidatat. Exercitation esse amet dolore non velit reprehenderit eiusmod tempor et consequat et pariatur magna labore lorem enim. Aliquip sed proident eu reprehenderit eu minim elit laboris aliqua aute deserunt consequat nostrud ut qui deserunt. Laborum irure voluptate consectetur id aliqua sint tempor velit irure. Cupidatat eiusmod aliqua quis qui eiusmod aliqua minim excepteur duis non veniam consectetur. Labore anim esse qui anim non ipsum deserunt sit consequat tempor laboris nulla magna duis laboris irure. Laboris ex laborum ullamco adipiscing nisi mollit ea minim amet duis eiusmod magna.</P>
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
      <H2 className="!text-3xl md:!text-4xl text-center">{textArray[0]}</H2>
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
        <H2 className="!text-3xl md:!text-4xl text-center">{textArray[index]}</H2>
      </motion.div>);

      setTimer(!timer);
    }, delay * 1000);
  }, [timer]);

  return content;
}

export default Home;

// This is used to tell Next.js to use static rendering (Required due to getInitialProps in _app.js)
export async function getStaticProps(context) {
    return {
        props: {},
    }
}