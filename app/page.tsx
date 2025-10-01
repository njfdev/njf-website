"use client";

import NextImage, { StaticImageData } from "next/image";
import Link from "next/link";
import ytLogo from "@/assets/yt-logo.png";
import ghLogo from "@/assets/github-mark-white.png";
import emailIcon from "@/assets/mui-mail.svg";
import localFont from "next/font/local";
import { ReactNode } from "react";
import Script from "next/script";
import { MD5 } from "crypto-js";
import { GetColorName } from "hex-color-to-color-name";
import { Button } from "@heroui/react";
import BioImagesMarquee from "@/components/BioImagesMarquee";
import Projects from "@/components/Projects";
import Bio from "@/components/Bio";
import Skills from "@/components/Skills";
import Hobbies from "@/components/Hobbies";

const GoodDogNew = localFont({ src: "gooddog-new.woff2" });

export default function Home() {
  const date = new Date().toLocaleDateString("en-us");
  const hashed = MD5(date).toString();
  const hexColor = hashed.substring(0, 6);

  const colorName = GetColorName(hexColor);

  return (
    <main className="100vw md:mb-32 mb-12">
      <Script id="easter-egg-script">{`
      let keylog = "";
      let specialPhrase = "cotd"
      document.onkeydown = function (e) {
          let keypressed = e.key;
          keylog += keypressed;
          if (!specialPhrase.startsWith(keylog)) {
            keylog = ""
            if (keypressed === specialPhrase[0]) {
              keylog += keypressed
            }
          }
          if (keylog === specialPhrase) {
            document.getElementById("cotd").classList.remove("hidden")
            keylog = ""
          }
      };
      `}</Script>

      <div className="h-screen flex flex-col">
        <div className="lg:px-16 md:px-10 px-6 md:gap-12 gap-6 grow w-screen h-screen md:h-auto flex landscape:flex-row flex-col-reverse justify-between md:pt-16 py-6 md:py-8 lg:py-12">
          <div className="flex flex-col md:gap-4 gap-2 landscape:w-[50%] justify-center">
            {/*<Image
            src={logoIcon}
            alt="Logo"
            style={{ width: "15%", height: "auto" }}
            className="mx-auto invert dark:invert-0"
            priority
          />*/}
            <h1
              className={`flex flex-col lg:w-auto min-w-[40vw] dark:text-white text-black text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl ${GoodDogNew.className} text-wrap`}
            >
              Nicholas Fasching
            </h1>
            <p className="dark:text-white text-black md:text-xl text-lg 2xl:text-3xl lg:my-4">
              I have a passion for learning, and using that knowledge to create
              awesome projects. I'm part programmer, part content creator, part
              pilot, and part student.
            </p>
            <div className="flex lg:flex-row flex-col gap-2 mt-2 md:mt-0">
              <SocialLink href="https://youtube.com/@njfdev" icon={ytLogo}>
                Nicholas Fasching
              </SocialLink>
              <SocialLink
                href="https://github.com/njfdev"
                icon={ghLogo}
                invertOnLight={true}
              >
                njfdev
              </SocialLink>
              <SocialLink
                href="mailto:contact@njf.dev"
                icon={emailIcon}
                invertOnLight={true}
              >
                contact@njf.dev
              </SocialLink>
            </div>
          </div>
          <div className="relative landscape:mx-0 mx-auto portrait:!max-w-none xl:max-w-[40vw] lg:max-w-[24rem] max-w-[32rem] w-full landscape:h-auto h-full md:portrait:min-h-[32rem]">
            <NextImage
              src="/me_assembling_breadboard_computer.webp"
              alt="Image of Nicholas assembling his 8-bit breadboard computer"
              fill={true}
              className="object-cover rounded-2xl"
              loading="eager"
              priority={true}
              fetchPriority="high"
            />
          </div>
        </div>

        <div className="h-full 2xl:max-h-[36rem] max-h-72 min-h-[12rem] w-screen dark:bg-default-100 bg-default-300 py-4 md:block hidden basis-0 grow mb-8 content-between">
          <BioImagesMarquee className="" />
        </div>
      </div>

      <Bio />

      <Projects />

      <Skills />

      <Hobbies />

      <div
        id="cotd"
        className="hidden mt-24 mx-auto flex flex-col justify-center items-center align-middle max-w-xl"
      >
        <h2
          className={`w-max text-5xl mb-4 ${GoodDogNew.className} dark:text-white text-black`}
        >
          Color of the Day
        </h2>
        <div
          className="w-full text rounded-3xl aspect-square flex flex-col justify-center items-center align-middle"
          style={{ backgroundColor: `#${hexColor}` }}
        >
          <div className="bg-[rgba(0,0,0,0.25)] text-white rounded-xl backdrop-blur p-8">
            <h3 className={`text-4xl ${GoodDogNew.className}`}>{colorName}</h3>
            <h4 className="text-xl mb-1">{date}</h4>
            <p>#{hexColor}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

function SocialLink({
  href,
  icon,
  invertOnLight,
  children,
}: {
  href: string;
  icon: StaticImageData;
  invertOnLight?: boolean;
  children: ReactNode;
}) {
  return (
    <Button
      as={Link}
      href={href}
      radius="lg"
      target="_blank"
      className="hover:scale-105 2xl:text-2xl 2xl:h-[3.5rem] 2xl:rounded-2xl"
      startContent={
        <NextImage
          src={icon}
          alt="Logo"
          className={`h-full w-auto py-2 ${
            invertOnLight ? "dark:invert-0 invert" : ""
          }`}
          priority
        />
      }
    >
      {children}
    </Button>
  );
}
