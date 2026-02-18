import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageHeight, setPageHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setPageHeight(containerRef.current.scrollHeight);
      }
    };
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { damping: 50, stiffness: 300, mass: 0.5 });
  const y = useTransform(smoothY, (v) => -v);

  // Check if it's mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  if (isMobile) {
    return <>{children}</>;
  }

  return (
    <>
      <div style={{ height: pageHeight }} />
      <motion.div
        ref={containerRef}
        style={{ y, position: "fixed", top: 0, left: 0, right: 0 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default SmoothScroll;
