import { Image } from "@heroui/react";
import arrayShuffle from "array-shuffle";
import { useRef } from "react";
import Marquee from "react-fast-marquee";
import ReactParallaxTilt from "react-parallax-tilt";

const imagePaths = [
  "/bio-images/astrophotography_setup.jpeg",
  "/bio-images/blue_angle_jet_at_duluth.jpeg",
  "/bio-images/cali_coast_drone.jpeg",
  "/bio-images/double_rainbow.jpeg",
  "/bio-images/epic_clouds.jpeg",
  "/bio-images/far_out_italy_waterfall_2.jpeg",
  "/bio-images/home_lab.jpeg",
  "/bio-images/italy_water_in_the_mountains.jpeg",
  "/bio-images/italy_waterfall.jpeg",
  "/bio-images/lego_electric_vehicle_adso.jpeg",
  "/bio-images/m1_disassembly.jpeg",
  "/bio-images/macbook_repair.jpeg",
  "/bio-images/me_looking_through_a_telescope.jpeg",
  "/bio-images/mit.jpeg",
  "/bio-images/post_first_solo.jpeg",
  "/bio-images/pumpkin_patch.jpeg",
  "/bio-images/rosette_nebula_which_is_my_favorite.jpeg",
  "/bio-images/solar_eclipse.jpeg",
  "/bio-images/spaghetti_tower.jpeg",
  "/bio-images/stuffed_animals.JPG",
  "/bio-images/tounge_jackolantern.jpeg",
];

export default function BioImagesMarquee({
  className,
}: {
  className?: string;
}) {
  return (
    <Marquee
      gradient={false}
      speed={75}
      pauseOnClick={true}
      className={`${className} py-2`}
    >
      {arrayShuffle(imagePaths).map((src) => {
        return (
          <ReactParallaxTilt
            key={src}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            tiltReverse={true}
          >
            <Image
              src={src}
              className={`h-64 object-cover mx-2 aspect-square`}
              alt="Decorative image"
              loading="lazy"
            />
          </ReactParallaxTilt>
        );
      })}
    </Marquee>
  );
}
