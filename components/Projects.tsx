import { Button, Card, CardFooter, Link } from "@heroui/react";
import { ReactNode } from "react";
import ReactParallaxTilt from "react-parallax-tilt";
import NextImage from "next/image";

export default function Projects() {
  return (
    <div className="mx-auto max-w-[80rem]">
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
    </div>
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
