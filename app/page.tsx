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

const GoodDogNew = localFont({ src: "gooddog-new.woff2" });

export default function Home() {
  return (
    <main className="100vw sm:p-8 p-2">
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
        {}
        <Suspense fallback={<div>Loading...</div>}>
          <SocialActivity />
        </Suspense>
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
