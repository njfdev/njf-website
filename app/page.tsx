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
import { Suspense } from "react";
import Script from "next/script";
import { MD5 } from "crypto-js";
import { GetColorName } from "hex-color-to-color-name";

const GoodDogNew = localFont({ src: "gooddog-new.woff2" });

export default function Home() {
  const date = new Date().toLocaleDateString("en-us");
  const hashed = MD5(date).toString();
  const hexColor = hashed.substring(0, 6);

  const colorName = GetColorName(hexColor);

  return (
    <main className="100vw sm:p-8 p-2">
      <Script>{`
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
          can find my social links above and my activity below. My
          blog/newsletter/podcast is at{" "}
          <Link href="https://blog.njf.dev" legacyBehavior>
            <a target="_blank" className="bold underline">
              blog.njf.dev
            </a>
          </Link>
          .
        </p>
      </div>

      {/* Show feed of recent activity on social platforms */}
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
