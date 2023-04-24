import Iframe from "react-iframe";
import { Tweet } from "react-tweet";
import localFont from "next/font/local";
import Image from "next/image";
import ytLogo from "@/assets/yt-logo.png";
import ghLogo from "@/assets/github-mark-white.png";
import twitterLogo from "@/assets/twitter-logo.png";
import mastodonLogo from "@/assets/mastodon-logo.svg";
import blogLogo from "@/assets/njf-logo-rounded.png";
import Link from "next/link";

const GoodDogNew = localFont({ src: "../app/gooddog-new.woff2" });

let Parser = require("rss-parser");
let parser = new Parser({
  customFields: {
    item: ["media:content"],
  },
});

let raw_feeds: any = {};
let promise: any = {};

let rssUrls = [
  "https://www.youtube.com/feeds/videos.xml?channel_id=UCzJid0aLvJiNCQYCYAvU9XQ",
  "https://github.com/njfdev.atom",
  "https://rss.app/feeds/cszZ7XqrQZQKSoTl.xml",
  "https://techhub.social/@njfdev.rss",
  "https://blog.njf.dev/rss/",
];

// https://www.youtube.com/feeds/videos.xml?channel_id=UCzJid0aLvJiNCQYCYAvU9XQ
// https://github.com/njfdev.atom
// https://rss.app/feeds/cszZ7XqrQZQKSoTl.xml
// https://techhub.social/@njfdev.rss
// https://blog.njf.dev/rss/

interface Activity {
  type: string;
  title?: string;
  id?: string;
  date: Date;
  link?: string;
  description?: string;
  content?: string;
  contentSnippet?: string;
  category?: string;
  creator?: string;
  imageUrl?: string | undefined;
}

export default function SocialActivity() {
  const waitForFetch = (url: URL) => {
    if (raw_feeds[url.toString()] !== undefined)
      return raw_feeds[url.toString()];

    if (promise[url.toString()] === undefined)
      promise[url.toString()] = parser
        .parseURL(url.toString())
        .then((feed: any) => (raw_feeds[url.toString()] = feed));

    throw promise[url.toString()];
  };

  let activity: any = [];

  for (let url of rssUrls) {
    let feed_url = new URL(url);

    let feed = waitForFetch(feed_url);

    if (feed_url.hostname === "www.youtube.com") {
      for (let item of feed.items) {
        let activity_item: Activity = {
          type: "youtube",
          title: item.title,
          id: item.id.replace("yt:video:", ""),
          date: new Date(item.isoDate),
        };
        activity.push(activity_item);
      }
    } else if (feed_url.hostname === "github.com") {
      for (let item of feed.items) {
        let activity_item: Activity = {
          type: "github",
          title: item.title,
          date: new Date(item.isoDate),
          link: item.link,
          contentSnippet: item.contentSnippet,
        };
        activity.push(activity_item);
      }
    } else if (feed_url.hostname === "rss.app") {
      for (let item of feed.items) {
        let activity_item: Activity = {
          type: "twitter",
          id: item.link.match(/[^/]+$/),
          link: item.link,
          content: item.content,
          creator: item.creator,
          date: new Date(item.isoDate),
        };
        activity.push(activity_item);
      }
    } else if (feed_url.hostname === "techhub.social") {
      for (let item of feed.items) {
        let activity_item: Activity = {
          type: "mastodon",
          link: item.link,
          content: item.content,
          date: new Date(item.isoDate),
        };
        activity.push(activity_item);
      }
    } else if (feed_url.hostname === "blog.njf.dev") {
      for (let item of feed.items) {
        let activity_item: Activity = {
          type: "blog",
          title: item.title,
          contentSnippet: item.contentSnippet,
          link: item.link,
          date: new Date(item.isoDate),
          category: item.categories[0],
          imageUrl: item["media:content"] && item["media:content"]["$"].url,
        };
        activity.push(activity_item);
      }
    }
  }

  // Sort activity by date
  activity.sort((a: any, b: any) => {
    return b.date - a.date;
  });

  // Trim to 25 items
  activity = activity.slice(0, 25);

  return (
    <div className="timeline">
      {activity.map((item: any) => {
        let index = activity.indexOf(item);

        let side = index % 2 === 0 ? "left" : "right";

        if (item.type === "youtube") {
          return (
            <div className={`container ${side}`} key={item.id}>
              <div className="content">
                <div className="flex justify-start gap-4 items-center">
                  <Image
                    src={ytLogo}
                    alt="Logo"
                    style={{ width: "auto", height: "25px" }}
                  />
                  <h3
                    className={`dark:text-[#eeeeee] text-[#111111] text-2xl ${GoodDogNew.className} whitespace-normal hover:underline`}
                  >
                    {item.title}
                  </h3>
                </div>
                <h4 className="dark:text-[#eeeeee] text-[#111111] text-lg font-medium pt-1 pb-2">
                  {item.date.toLocaleString()}
                </h4>
                <Iframe
                  url={"https://www.youtube.com/embed/" + item.id}
                  width="100%"
                  className="aspect-video"
                />
              </div>
            </div>
          );
        } else if (item.type === "github") {
          return (
            <div className={`container ${side}`} key={item.link}>
              <div className="content">
                <div className="flex justify-start gap-4 items-center">
                  <Image
                    src={ghLogo}
                    alt="Logo"
                    style={{ width: "auto", height: "25px" }}
                    className="w-max invert dark:invert-0"
                  />
                  <Link href={item.link} target="_blank">
                    <h3
                      className={`dark:text-[#eeeeee] text-[#111111] text-2xl ${GoodDogNew.className} whitespace-normal hover:underline`}
                    >
                      {item.title}
                    </h3>
                  </Link>
                </div>
                <h4 className="dark:text-[#eeeeee] text-[#111111] text-lg font-medium pt-1">
                  {item.date.toLocaleString()}
                </h4>
              </div>
            </div>
          );
        } else if (item.type === "twitter") {
          // If item.content (html) has a script, then return empty jsx (because it might be malicious)
          if (item.content.includes("<script>")) return <></>;

          return (
            <div className={`container ${side}`} key={item.id}>
              <div className="content" style={{ paddingBlock: "0.1px" }}>
                <div>
                  <Tweet id={item.id} />
                </div>
              </div>
            </div>
          );
        } else if (item.type === "mastodon") {
          // If item.content (html) has a script, then return empty jsx (because it might be malicious)
          if (item.content.includes("<script>")) return <></>;

          return (
            <div className={`container ${side}`} key={item.link}>
              <div className="content">
                <div className="flex justify-start gap-4 items-center">
                  <Image
                    src={mastodonLogo}
                    alt="Logo"
                    style={{ width: "auto", height: "25px" }}
                    className="w-max"
                  />
                  <Link href={item.link} target="_blank">
                    <h3
                      className={`dark:text-[#eeeeee] text-[#111111] text-2xl ${GoodDogNew.className} whitespace-normal hover:underline`}
                    >
                      Nicholas Fasching Posted on Mastodon
                    </h3>
                  </Link>
                </div>
                <h4 className="dark:text-[#eeeeee] text-[#111111] text-lg font-medium pt-1">
                  {item.date.toLocaleString()}
                </h4>
                <div
                  className="mastodon-content"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
            </div>
          );
        } else if (item.type === "blog") {
          return (
            <div className={`container ${side}`} key={item.link}>
              <div className="content">
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    width={1920}
                    height={1080}
                    alt="Logo"
                    style={{ width: "auto", height: "auto" }}
                    className="w-max"
                  />
                )}
                <div className="flex justify-start gap-4 mt-4 items-center">
                  <Image
                    src={blogLogo}
                    alt="Logo"
                    style={{ width: "auto", height: "25px" }}
                    className="w-max"
                  />
                  <Link href={item.link} target="_blank">
                    <h3
                      className={`dark:text-[#eeeeee] text-[#111111] text-2xl ${GoodDogNew.className} whitespace-normal hover:underline`}
                    >
                      {item.title}
                    </h3>
                  </Link>
                </div>
                <h4 className="dark:text-[#eeeeee] text-[#111111] text-lg font-medium pb-1">
                  {item.date.toLocaleString()}
                </h4>

                <p className="dark:text-[#eeeeee] text-[#111111]">
                  {item.contentSnippet}
                </p>
              </div>
            </div>
          );
        }

        return <></>;
      })}
    </div>
  );
}
