"use client";

import NextImage, { StaticImageData } from "next/image";
import Link from "next/link";
import ytLogo from "@/assets/yt-logo.png";
import ghLogo from "@/assets/github-mark-white.png";
import emailIcon from "@/assets/mui-mail.svg";
import localFont from "next/font/local";
import { ReactNode, Suspense } from "react";
import Script from "next/script";
import { MD5 } from "crypto-js";
import { GetColorName } from "hex-color-to-color-name";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
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
    <main className="100vw mb-32">
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

      <div className="px-16 w-screen flex justify-between pt-16 pb-12">
        <div className="flex flex-col gap-4 w-[50%] min-h-[50vh] justify-center">
          {/*<Image
            src={logoIcon}
            alt="Logo"
            style={{ width: "15%", height: "auto" }}
            className="mx-auto invert dark:invert-0"
            priority
          />*/}
          <h1
            className={`flex flex-col dark:text-white text-black text-5xl sm:text-6xl md:text-7xl ${GoodDogNew.className}`}
          >
            <span>Nicholas</span>
            <span>Fasching</span>
          </h1>
          <p className="dark:text-white text-black text-xl my-4">
            I have a passion for learning, and using that knowledge to create
            awesome projects. I'm part programmer, part content creator, part
            pilot, and part student.
          </p>
          <div className="flex gap-2">
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
        <div className="relative w-[35%]">
          <NextImage
            src="/me_assembling_breadboard_computer.jpeg"
            alt="Image of Nicholas assembling his 8-bit breadboard computer"
            fill={true}
            className="object-cover rounded-2xl"
          />
        </div>
      </div>

      <div className="h-72 min-h-72 w-screen bg-default-100 py-4">
        <BioImagesMarquee className="" />
      </div>

      <Bio />

      <Projects />

      <Skills />

      <Hobbies />

      <div
        id="cotd"
        className="hidden mt-4 mx-auto flex flex-col justify-center items-center align-middle max-w-xl"
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
      className="hover:scale-105"
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
