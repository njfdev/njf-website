"use client";

import Image, { StaticImageData } from "next/image";
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

const GoodDogNew = localFont({ src: "gooddog-new.woff2" });

export default function Home() {
  const date = new Date().toLocaleDateString("en-us");
  const hashed = MD5(date).toString();
  const hexColor = hashed.substring(0, 6);

  const colorName = GetColorName(hexColor);

  return (
    <main className="100vw sm:p-8 p-2">
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

      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        <Image
          src={logoIcon}
          alt="Logo"
          style={{ width: "38%", height: "auto" }}
          className="mx-auto invert dark:invert-0"
          priority
        />
        <h1
          className={`dark:text-white text-black mx-auto w-max text-5xl sm:text-6xl md:text-7xl ${GoodDogNew.className}`}
        >
          Nicholas Fasching
        </h1>
        <div className="flex mx-auto gap-6">
          <SocialLink href="https://youtube.com/@njfdev" icon={ytLogo} />
          <SocialLink
            href="https://github.com/njfdev"
            icon={ghLogo}
            invertOnLight={true}
          />
          <SocialLink href="https://twitter.com/njfdev" icon={twitterLogo} />
          <SocialLink
            href="https://techhub.social/@njfdev"
            icon={mastodonLogo}
          />
          <SocialLink href="https://blog.njf.dev" icon={blogLogo} />
          <SocialLink
            href="mailto:contact@njf.dev"
            icon={emailIcon}
            invertOnLight={true}
          />
        </div>

        <p className="dark:text-white text-black text-xl my-4 text-center">
          Hey there! I am Nicholas Fasching and this is my personal website! You
          can find my social links above and my blog/newsletter/podcast is at{" "}
          <Link
            href="https://blog.njf.dev"
            target="_blank"
            className="bold underline"
          >
            blog.njf.dev
          </Link>
          . I have plans to update this page soon!
        </p>
      </div>

      <h2 className="mx-auto w-max text-4xl font-bold mt-6 mb-4">Projects</h2>
      <div className="grid gap-4 grid-cols-[repeat(auto-fit,_minmax(20rem,_1fr))]">
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
    <Card isFooterBlurred={true} className="w-full aspect-square">
      <Button
        as={Link}
        href={href}
        target="_blank"
        className="w-full h-full px-0"
      >
        {imageHref ? (
          <Image
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
        <span className="mx-auto w-max font-semibold text-lg">{children}</span>
      </CardFooter>
    </Card>
  );
}

function SocialLink({
  href,
  icon,
  invertOnLight,
}: {
  href: Url;
  icon: StaticImageData;
  invertOnLight?: boolean;
}) {
  return (
    <Link href={href} target="_blank">
      <Image
        src={icon}
        alt="Logo"
        className={`w-auto sm:h-[35px] h-[25px] mx-auto ${
          invertOnLight ? "dark:invert-0 invert" : ""
        }`}
        priority
      />
    </Link>
  );
}
