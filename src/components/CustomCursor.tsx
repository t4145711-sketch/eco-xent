import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    let trailId = 0;
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      trailId++;
      setTrail(prev => [...prev.slice(-12), { x: e.clientX, y: e.clientY, id: trailId }]);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  // Clean old trail particles
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => prev.slice(-8));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
        @media (pointer: coarse) {
          .custom-cursor { display: none !important; }
        }
      `}</style>

      {/* Trail particles */}
      {trail.map((point, i) => (
        <motion.div
          key={point.id}
          className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            x: point.x - 2,
            y: point.y - 2,
            width: 4,
            height: 4,
            background: `hsl(43 50% 55% / ${0.3 + (i / trail.length) * 0.3})`,
          }}
        />
      ))}

      {/* Main cursor dot */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[10000] rounded-full mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isClicking ? 6 : isHovering ? 14 : 8,
          height: isClicking ? 6 : isHovering ? 14 : 8,
          backgroundColor: isHovering ? "hsl(43, 50%, 55%)" : "hsl(43, 60%, 70%)",
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer ring */}
      <motion.div
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isClicking ? 24 : isHovering ? 50 : 36,
          height: isClicking ? 24 : isHovering ? 50 : 36,
          borderColor: isHovering 
            ? "hsl(43, 50%, 55%, 0.6)" 
            : "hsl(43, 50%, 55%, 0.2)",
          backgroundColor: isHovering 
            ? "hsl(43, 50%, 55%, 0.08)" 
            : "transparent",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </>
  );
};

export default CustomCursor;
