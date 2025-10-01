import { shuffle } from "fast-shuffle";
import { useState } from "react";
import ReactParallaxTilt from "react-parallax-tilt";
import NextImage from "next/image";

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
  const [shuffledImages, setShuffledImages] = useState(shuffle(imagePaths));
  const [loadedCount, setLoadedCount] = useState(0);
  return (
    <div className="w-screen overflow-clip">
      <div
        className={`flex gap-4 images-marquee w-max overflow ${
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
              className="h-64 w-64"
            >
              <NextImage
                src={src}
                className={`rounded-xl object-cover`}
                alt="Decorative image"
                quality={50}
                fill={true}
                onLoad={() => setLoadedCount((prev) => prev + 1)}
              />
            </ReactParallaxTilt>
          );
        })}
      </div>
    </div>
  );
}
