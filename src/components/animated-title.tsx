import dompurify from "dompurify";
import gsap from "gsap";
import { useEffect, useRef } from "react";

type Props = {
  title: string;
  containerClass: string;
};

function AnimatedTitle({ title, containerClass }: Props) {
  const sanitizer = dompurify.sanitize;
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.to(
        ".animated-word",
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
          ease: "power2.inOut",
          stagger: 0.02,
        },
        0,
      );
    }, containerRef);

    return () => ctx.revert(); // Clean up on unmount
  }, []);

  return (
    <div ref={containerRef} className={`animated-title ${containerClass}`}>
      {title.split("<br />").map(line => (
        <div
          key={`${line.trim}-${Math.random()}`}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {line.split(" ").map(word => (
            <span
              key={`${sanitizer(word)}-${Math.random()}`}
              className="animated-word"
              // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
              dangerouslySetInnerHTML={{ __html: sanitizer(word) }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default AnimatedTitle;
