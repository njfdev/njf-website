import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@heroui/react";
import { ReactNode } from "react";
import ReactParallaxTilt from "react-parallax-tilt";
import NextImage from "next/image";
import Link from "next/link";

/*
Other Hobbies/Interests

Model rocketry (HPR, Rocketry class, openrocket)
Aviation (1st solo, KTTA)
YouTube
Videography & Video Editing
Photography
Astrophotography
Aerospace Engineering
Electrical Engineering
Traveling

*/

export default function Hobbies() {
  return (
    <div className="mx-auto max-w-[64rem] flex flex-col gap-8">
      <h2 className="mx-auto w-max text-4xl font-bold mt-24">Hobbies</h2>
      <HobbyCard
        title="Model Rocketry"
        startDate="January, 2025"
        imgHref="/crossfire_on_pad.png"
      >
        Being one of my most recent hobbies, I haven't yet had too much time
        with it. My first time launching was with the 2 Estes Tandem-X model
        rockets, both on a class C motor. I am currently in a rocketry class,
        and a part of the High-Powered Rockety (HPR) club at my school where I
        am to work on electronic payloads and get my level 1 HPR certification.
      </HobbyCard>
      <HobbyCard
        title="Aviation"
        startDate="October, 2024"
        imgHref="/bio-images/post_first_solo.jpeg"
      >
        Fueled by previous interests in aviation, I decided to go on a
        "Discovery Flight" with a flight school at a nearby regional airport
        called the Raleigh Executive Jetport (KTTA). I decided to continue
        flight training, with each flight being more gratifying than the last.
        Eventually, I was ready for my first solo, which I completed on March
        1st, 2025. Now, I am working towards getting my full private pilot
        certificate.
      </HobbyCard>
      <HobbyCard
        title="Video Editing & Videography"
        imgHref="/me_taking_photo_of_person_taking_photo.jpeg"
      >
        I have come to love the challenge of telling stories via videos. Thus,
        I'm both interested in the process of recording videos (e.g., the
        technical aspects of cameras, how/what to film, etc.) and actually
        collecting those recordings into a cohesive video (e.g., trimming clips,
        color grading, audio mastering, adding sound and visual effects, etc.).
        I primarily use DaVinci Resolve, and try to practice and share this
        hobby through my{" "}
        <Link
          href="https://www.youtube.com/@njfdev"
          target="_blank"
          className="hover:opacity-80 active:opacity-50 underline"
        >
          YouTube
        </Link>{" "}
        channel!
      </HobbyCard>
      <HobbyCard
        title="Photography"
        startDate="August, 2023"
        imgHref="/bio-images/italy_water_in_the_mountains.jpeg"
      >
        Similarly with videography, I love the power of photography to capture a
        moment. It has its own unique value and purpose. As I've come to get
        more experienced with it, I have found it allows me to capture moments
        in a quality and way that I can't always do with video. I tend to take
        photos on my trips, and some of my favorites come from my trip to Italy.
      </HobbyCard>
      <HobbyCard
        title="Astrophotography"
        startDate="January, 2024"
        imgHref="/rosette_nebula.webp"
      >
        Astrophotography has got to be one of my most unique hobbies, and it is
        just as fulfilling. If you aren't familiar, it is just taking photos of
        objects in the sky, but it is especially cool when trying to photograph
        faint objects like galaxies and nebulae. I love both the technical
        aspect of the hardware/software involved to make it happen, and the
        artistic aspect in processing and editing the image to look awesome. You
        can view my images on{" "}
        <Link
          href="https://astronomy.njf.dev"
          target="_blank"
          className="hover:opacity-80 active:opacity-50 underline"
        >
          my astronomy website
        </Link>
        .
      </HobbyCard>
      <HobbyCard
        title="Aerospace Engineering"
        imgHref="/artemis_1_on_launchpad.jpg"
      >
        If you couldn't tell, I love things that travel through the air, and
        being a STEM nerd, I naturally am interested in aerospace engineering. I
        am particularly interested in the astronautical side of it (basically
        rockets and space stuff), but I could also see myself working on planes.
        I think working at someplace like NASA making rockets to launch into
        space would be awesome!
      </HobbyCard>
      <HobbyCard
        title="Electrical Engineering"
        startDate="August, 2021"
        imgHref="/lit_up_breadboard_computer_section.jpeg"
      >
        My first experimentation into electrical engineering was when I
        assembled 3 of the Ben Eater breadboard kits over the summer of 2021. I
        have always had interest in the hardware of computers, and electrical
        engineering fits this. I've worked on things like FPGAs and
        microcontrollers to continue to explore this interest. And, fun fact:
        I've been wishing for an oscilloscope for the past 4 years!
      </HobbyCard>
      <HobbyCard title="Traveling" imgHref="/view_of_mountains_from_plane.jpeg">
        I find traveling to be quite enjoyable. Firstly, it breaks the monotony
        of everyday life. Second, it allows for me to explore quite unique
        places. I also enjoy the process of traveling, and getting able to go on
        airliners. 2 of my favorite trips I've ever gone on was to Boston
        (summer of 2023) and to Italy (summer of 2024).
      </HobbyCard>
    </div>
  );
}

function HobbyCard({
  children,
  title,
  startDate,
  imgHref,
}: {
  children: ReactNode;
  title: string;
  startDate?: string;
  imgHref: string;
}) {
  return (
    <Card className="bg-default-100 p-2">
      <CardHeader className="flex items-center gap-4 !pb-0">
        <h3 className="font-bold text-2xl">{title}</h3>
        {startDate && (
          <span className="text-xl">
            (since <b>{startDate}</b>)
          </span>
        )}
      </CardHeader>
      <CardBody>
        <div className="flex text-lg items-center">
          <Image
            loading="lazy"
            src={imgHref}
            className="aspect-square min-w-48 h-48 object-cover"
          />
          <p className="mx-4 h-max">{children}</p>
        </div>
      </CardBody>
    </Card>
  );
}
