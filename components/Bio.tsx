import NextImage from "next/image";

export default function Bio() {
  return (
    <div className="max-w-[64rem] 2xl:max-w-[80rem] mx-auto px-8">
      <h2 className="mx-auto w-max text-4xl 2xl:text-6xl font-bold md:mt-24 mt-8 mb-4">
        About Me
      </h2>
      <div className="flex md:flex-row flex-col-reverse gap-8 md:items-stretch items-center">
        <div className="flex flex-col gap-4 lg:min-w-[60%] md:min-w-[50%] w-full">
          <p className="text-xl 2xl:text-4xl font-bold">
            👋 Hello! I'm Nicholas Fasching.
          </p>
          <p className="2xl:text-2xl">
            I strive to constantly improve what I know, and my abilities to
            create. I am most fulfilled when it comes to almost anything STEM,
            but I'm unsatisfied when I don't have a deep grasp of a topic. I
            love having a full understanding that makes <i>intuitive</i> sense,
            and then applying that understanding to do something <b>useful</b>{" "}
            and/or <b>powerful</b>.
            <br />
            <br />I also love to talk <i>philosophically</i> about big topics,
            and take on mental exercises. I find power in thinking about and
            asking questions that completely break and alter your viewpoint. I
            could go on, but in terms of my personal philosophy of life, it is
            to take one's life to its <b>fullest potential</b>, and to realize
            it is much more gratifying to not let little things ruin it.
            <br />
            <br />
            However, I feel it is hard to truly show the story of someone in
            such a short blurb. But, I hope the rest of this website will give
            you a better insight into who I am, and allow you to explore (what I
            think to be) some of my awesome projects!
          </p>
        </div>
        <div className="grow relative md:h-auto h-64 md:max-w-none max-w-[20rem] w-full sm:h-72">
          <NextImage
            src="/me_in_front_of_mit.jpeg"
            alt="Image of Nicholas assembling his 8-bit breadboard computer"
            fill={true}
            className="object-cover rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
