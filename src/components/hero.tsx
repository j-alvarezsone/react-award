import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrowOutline } from "react-icons/ti";

import Button from "./button";

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  gsap.registerPlugin(ScrollTrigger);

  const totalVideos = 4;
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;
  const nextVideoRef = useRef<HTMLVideoElement | null>(null);

  const handleMiniVideoClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  const handleVideoLoaded = () => {
    setLoadedVideos(prev => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
      setIsLoading(false);
    }
  }, [loadedVideos]);

  useGSAP(() => {
    if (!hasClicked) {
      return;
    }

    gsap.set("#next-video", { visibility: "visible" });

    gsap.to("#next-video", {
      transformOrigin: "center center",
      scale: 1,
      width: "100%",
      height: "100%",
      duration: 1,
      ease: "power1.inOut",
      onStart: () => {
        const video = nextVideoRef.current;
        if (video) {
          video.play().catch((err) => {
            throw new Error(`Error playing video: ${err}`);
          });
        }
      },
    });

    gsap.from("#current-video", {
      transformOrigin: "center center",
      scale: 0,
      duration: 1.5,
      ease: "power1.inOut",
    });
  }, { revertOnUpdate: true, dependencies: [currentIndex] });

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  }, {});

  const getVideoSrc = (index: number) => `videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}
      <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75">
        <div>
          <div className="mask-clip-path absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100" onClick={handleMiniVideoClick}>
              <video
                ref={nextVideoRef}
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                onLoadedData={handleVideoLoaded}
              />
            </div>
          </div>
          <video
            ref={nextVideoRef}
            id="next-video"
            className="absolute-center invisible z-20 size-64 object-cover object-center"
            src={getVideoSrc(currentIndex)}
            loop
            muted
            onLoadedData={handleVideoLoaded}
          />
          <video
            className="absolute left-0 top-0 size-full object-cover object-center"
            src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
            autoPlay
            loop
            muted
            onLoadedData={handleVideoLoaded}
          />
        </div>
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G
          <b>a</b>
          ming
        </h1>
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-75">
              Redefi
              <b>n</b>
              e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer
              <br />
              {" "}
              Unleash the play Economy
            </p>
            <Button id="watch-trailer" containerClass="bg-yellow-300 flex-center gap-1" leftIcon={<TiLocationArrowOutline />}>
              Watch Trailer
            </Button>
          </div>
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G
        <b>a</b>
        ming
      </h1>
    </div>
  );
}

export default Hero;
