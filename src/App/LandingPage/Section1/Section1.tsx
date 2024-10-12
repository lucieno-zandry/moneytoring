import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
import classList from "../../../core/helpers/classList";
import useSectionIntersectionObserver from "../../../core/hooks/useSectionIntersectionObserver";
import { Link } from "react-router-dom";
import { signupPage } from "../../../core/config/links/pages";

type ImageSequenceConfig = {
  urls: string[]; // Array of image URLs
  canvas: string | HTMLCanvasElement; // Canvas selector or element
  fps?: number; // Optional FPS
  paused?: boolean; // Whether the animation is paused initially
  scrollTrigger?: ScrollTrigger.Vars; // GSAP ScrollTrigger configuration
  onUpdate?: (frame: number, image: string) => void; // Optional update callback
  clear?: boolean; // Optional flag to clear canvas between frames
  onComplete?: () => void,
};

let sequence: gsap.core.Tween | undefined;
let canvas: HTMLCanvasElement | null;

function imageSequence(config: ImageSequenceConfig) {
  let playhead = { frame: 0 };
  const canvas =
    typeof config.canvas === "string"
      ? document.querySelector<HTMLCanvasElement>(config.canvas)
      : config.canvas;

  if (!canvas) {
    console.warn("canvas not defined");
    return;
  }

  const ctx = canvas.getContext("2d");
  let curFrame = -1;
  const onUpdate = config.onUpdate;
  let images: HTMLImageElement[];

  const updateImage = function (this: unknown) {
    if (!ctx) return;
    const frame = Math.round(playhead.frame);
    if (frame !== curFrame) {
      config.clear && ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(images[frame], 0, 0);
      curFrame = frame;
      onUpdate && onUpdate.call(this, frame, config.urls[frame]);
    }
  };

  images = config.urls.map((url: string, i: number) => {
    const img = new Image();
    img.src = url;
    if (i === 0) {
      img.onload = updateImage;
    }
    return img;
  });

  return gsap.to(playhead, {
    frame: images.length - 1,
    ease: "none",
    onUpdate: updateImage,
    duration: images.length / (config.fps || 30),
    paused: !!config.paused,
    scrollTrigger: config.scrollTrigger,
  });
}

gsap.registerPlugin(ScrollTrigger);

const getSequence = () => {
  const frameCount = 78;
  const urls = new Array(frameCount)
    .fill(null)
    .map((_, i) => `/src/App/LandingPage/Section1/images/image-${(i + 1).toString().padStart(2, '0')}.jpg`);

  const sequence = imageSequence({
    urls,
    canvas: "#section1-canvas",
    scrollTrigger: {
      start: 0,
      end: "max",
      scrub: true,
    },
  });

  return sequence;
}

const setCanvasPosition = (active: boolean = false) => {
  if (!canvas) {
    canvas = document.querySelector<HTMLCanvasElement>("#section1-canvas");
  }

  if (!canvas) return;

  if (active) {
    canvas.style.position = 'fixed';
  } else {
    setTimeout(() => {
      canvas!.style.position = 'relative';
    }, 500);
  }
}

const ImageSequenceComponent: React.FC = () => {
  const { isIntersecting, ref } = useSectionIntersectionObserver<HTMLDivElement>();

  React.useEffect(() => {
    if (!ref.current) return;
    // console.log(isIntersecting);
    if (!sequence) {
      sequence = getSequence();
    };

    if (!sequence) return;
    if (isIntersecting) sequence.progress(.7);

    setCanvasPosition(isIntersecting);
  }, [isIntersecting, ref, sequence]);

  return (
    <div className={`section1-container activable ${classList(isIntersecting, 'active')}`} ref={ref}>
      <canvas
        id="section1-canvas"
        width={window.screen.width}
        height={window.screen.height} />

      <div className="gradient"></div>

      <div
        className="section1 py-5 d-flex flex-column align-items-center justify-content-center gap-4 text-align-center">
        <h2 className="display-2">
          Ready to Transform <br />
          Your Finances?</h2>
        <p>
          Start managing your money smarter today with MoneyToring.
        </p>
        <Link to={signupPage} className="btn btn-light col-6 col-sm-3">Sign Up Now</Link>
      </div>
    </div>
  );
};

export default React.memo(ImageSequenceComponent);
