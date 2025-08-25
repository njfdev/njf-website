"use client";

import NextImage, { StaticImageData } from "next/image";
import Link from "next/link";
import logoIcon from "@/assets/logo-icon.png";
import ytLogo from "@/assets/yt-logo.png";
import ghLogo from "@/assets/github-mark-white.png";
import twitterLogo from "@/assets/twitter-logo.png";
import mastodonLogo from "@/assets/mastodon-logo.svg";
import blogLogo from "@/assets/njf-logo-rounded.png";
import emailIcon from "@/assets/mui-mail.svg";
import localFont from "next/font/local";
import { Url } from "next/dist/shared/lib/router/router";
import SocialActivity from "@/components/SocialActivity";
import { ReactNode, Suspense } from "react";
import Script from "next/script";
import { MD5 } from "crypto-js";
import { GetColorName } from "hex-color-to-color-name";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import BioImagesMarquee from "@/components/BioImagesMarquee";
import { Image } from "@heroui/react";
import ReactParallaxTilt from "react-parallax-tilt";

const GoodDogNew = localFont({ src: "gooddog-new.woff2" });

export default function Home() {
  const date = new Date().toLocaleDateString("en-us");
  const hashed = MD5(date).toString();
  const hexColor = hashed.substring(0, 6);

  const colorName = GetColorName(hexColor);

  return (
    <main className="100vw">
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

      <div className="h-64 min-h-64 w-screen mt-8">
        <BioImagesMarquee className="" />
      </div>

      <h2 className="mx-auto w-max text-4xl font-bold mt-24 mb-4">Projects</h2>
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,_minmax(20rem,_1fr))] mx-4 mb-4">
        <ProjectCard href="https://astronomy.njf.dev">
          Astronomy Website
        </ProjectCard>
        <ProjectCard
          href="https://github.com/njfdev/tacocopter#cover-image"
          imageAltText="Profile image of the Tacocopter drone flying"
          imageHref="https://github.com/user-attachments/assets/a1dcea42-80fc-410e-b058-85001ea650b9"
        >
          Tacocopter Drone
        </ProjectCard>
        <ProjectCard href="https://arla.njf.dev/">
          Aircraft Registration Lookup API
        </ProjectCard>
        <ProjectCard
          href="https://github.com/njfdev/rtlsdr-radio?tab=readme-ov-file#rtl-sdr-radio"
          imageStyle="contain"
          imageAltText="Image of RTL-SDR Radio desktop app"
          imageHref="https://camo.githubusercontent.com/43a3931a2ba0ea7b2c9d0940dd2fc08af7a60d364e331a19219822cca08e52a1/68747470733a2f2f636c6f75642d35617a71707a36347a2d6861636b2d636c75622d626f742e76657263656c2e6170702f3073637265656e73686f745f323032342d30392d30315f61745f382e33312e35395f5f5f616d2e706e67"
        >
          RTL-SDR Radio
        </ProjectCard>
        <ProjectCard href="https://mseguin.njf.dev?autofocus=false">
          Ms. Eguin&apos;s Spanish Practice
        </ProjectCard>
        <ProjectCard
          href="https://github.com/njfdev/indi_lumix"
          imageAltText="Image of Lumix S5II camera"
          imageHref="https://cdn.mos.cms.futurecdn.net/up3JafHogw6ho2V2QswmjZ-1400-80.jpg.webp"
        >
          Lumix Camera Driver for INDI
        </ProjectCard>
      </div>

      {/* Show feed of recent activity on social platforms 
      NOTE: This has stopped working for a while, and I plan on redoing this
      site soon, so I am removing this for the time being.
      <div>
        <h2
          className={`dark:text-white text-black text-4xl text-center ${GoodDogNew.className}`}
        >
          Recent Activity
        </h2>
        <Suspense fallback={<div>Loading...</div>}>
          <SocialActivity />
        </Suspense>
      </div>
      */}
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

function ProjectCard({
  href,
  imageHref,
  imageAltText,
  imageStyle,
  children,
}: {
  href: string;
  imageHref?: string;
  imageAltText?: string;
  imageStyle?: "cover" | "contain";
  children: ReactNode;
}) {
  return (
    <ReactParallaxTilt tiltMaxAngleX={10} tiltMaxAngleY={10} tiltReverse={true}>
      <Card isFooterBlurred={true} className="w-full aspect-square">
        <Button
          as={Link}
          href={href}
          target="_blank"
          className="w-full h-full px-0"
        >
          {imageHref ? (
            <NextImage
              src={imageHref!}
              fill={true}
              className={`${
                imageStyle == "contain" ? "object-contain" : "object-cover"
              }`}
              alt={imageAltText || "Image of a project"}
            />
          ) : (
            <iframe
              src={href}
              className="h-full w-full pointer-events-none"
              style={{
                zoom: "0.5",
              }}
            />
          )}
        </Button>
        <CardFooter className="absolute bottom-1 mx-1 border-1 border-gray-800/25 w-[calc(100%_-_8px)]">
          <span className="mx-auto w-max font-semibold text-lg">
            {children}
          </span>
        </CardFooter>
      </Card>
    </ReactParallaxTilt>
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
