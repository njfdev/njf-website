import { shuffle } from "fast-shuffle";
import { useState } from "react";
import ReactParallaxTilt from "react-parallax-tilt";
import NextImage from "next/image";

const imagePaths = [
  "/bio-images/astrophotography_setup.webp",
  "/bio-images/blue_angle_jet_at_duluth.webp",
  "/bio-images/cali_coast_drone.webp",
  "/bio-images/double_rainbow.webp",
  "/bio-images/epic_clouds.webp",
  "/bio-images/far_out_italy_waterfall_2.webp",
  "/bio-images/home_lab.webp",
  "/bio-images/italy_water_in_the_mountains.webp",
  "/bio-images/italy_waterfall.webp",
  "/bio-images/lego_electric_vehicle_adso.webp",
  "/bio-images/m1_disassembly.webp",
  "/bio-images/macbook_repair.webp",
  "/bio-images/me_looking_through_a_telescope.webp",
  "/bio-images/mit.webp",
  "/bio-images/post_first_solo.webp",
  "/bio-images/pumpkin_patch.webp",
  "/bio-images/rosette_nebula_which_is_my_favorite.webp",
  "/bio-images/solar_eclipse.webp",
  "/bio-images/spaghetti_tower.webp",
  "/bio-images/stuffed_animals.webp",
  "/bio-images/tounge_jackolantern.webp",
];

export default function BioImagesMarquee({
  className,
}: {
  className?: string;
}) {
  const [shuffledImages, setShuffledImages] = useState(shuffle(imagePaths));
  const [loadedCount, setLoadedCount] = useState(0);
  return (
    <div className="w-screen overflow-clip h-full">
      <div
        className={`flex gap-4 images-marquee w-max overflow h-full ${
          loadedCount < imagePaths.length * 2 ? "opacity-0" : ""
        } ${className}`}
        // gradient={false}
        // speed={75}
        // pauseOnClick={true}
        // className={`${className} py-2 gap-2`}
      >
        {shuffledImages.concat(shuffledImages).map((src, index) => {
          return (
            <ReactParallaxTilt
              key={src + index}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              tiltReverse={true}
              className="aspect-square h-full"
            >
              <NextImage
                src={src}
                className={`rounded-xl object-cover`}
                alt="Decorative image"
                quality={50}
                fill={true}
                sizes="72rem"
                onLoad={() => setLoadedCount((prev) => prev + 1)}
              />
            </ReactParallaxTilt>
          );
        })}
      </div>
    </div>
  );
}
