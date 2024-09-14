
// "use client";
// import React, { useState } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useScroll,
//   useMotionValueEvent,
// } from "framer-motion";
// import Link from "next/link";
// import { cn } from "@/utils/cn";
// import { Button} from "./MovingBorder";

// export const FloatingNav = ({
//   navItems,
//   className,
// }: {
//   navItems: {
//     name: string;
//     link: string;
//     icon?: JSX.Element;
//   }[];
//   className?: string;
// }) => {
//   const { scrollYProgress } = useScroll();

//   // Set true for the initial state so that nav bar is visible in the hero section
//   const [visible, setVisible] = useState(true);

//   useMotionValueEvent(scrollYProgress, "change", (current) => {
//     // Check if current is not undefined and is a number
//     if (typeof current === "number") {
//       let direction = current! - scrollYProgress.getPrevious()!;


//       if (scrollYProgress.get() < 0.05) {
//         // Also set true for the initial state
//         setVisible(true);
//       } else {
//         if (direction < 0) {
//           setVisible(true);
//         } else {
//           setVisible(false);
//         }
//       }
//     }
//   });

//   return (
//     <div>
//       {/* Logo in the left corner */}
//       <img
//         src={"./Webfoxshield.png"}
//         alt="Logo"
//         className="absolute top-0 left-2 h-60 z-500" // Adjust size and margin as needed
//       />
//       <AnimatePresence mode="wait">
//         <motion.div
//           initial={{
//             opacity: 1,
//             y: -100,
//           }}
//           animate={{
//             y: visible ? 0 : -100,
//             opacity: visible ? 1 : 0,
//           }}
//           transition={{
//             duration: 0.2,
//           }}
//           className={cn(
//             "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-10 py-5 rounded-full border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center space-x-4 border-white/[0.2] bg-black-100 text-2xl", // Increased from text-xl to text-2xl
//             className
//           )}
//           style={{
//             backdropFilter: "blur(16px) saturate(180%)",
//             backgroundColor: "rgba(17, 25, 40, 0.75)",
//             borderRadius: "12px",
//             border: "2px solid rgba(255, 255, 255, 0.125)",
//           }}
//         >
//           {navItems.map((navItem: any, idx: number) => (
//             <Link
//               key={`link=${idx}`}
//               href={navItem.link}
//               className={cn(
//                 "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 text-2xl" // Increased from text-xl to text-2xl
//               )}
//             >
//               <span className="block sm:hidden">{navItem.icon}</span>
//               <span className="text-lg !cursor-pointer">{navItem.name}</span> {/* Increased from text-sm to text-lg */}
//             </Link>
//           ))}
//         </motion.div>
//       </AnimatePresence>
//       {/* Login and Register Buttons */}
//       <div className="absolute top-10 right-10 flex space-x-4">
//         <Link href="/login">
//           <Button className="top-1 border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-3 rounded-full">
//             Login
//           </Button>
//         </Link>
//         <Link href="/register">
//           <Button  className=" top-1 border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-3 rounded-full">
//             Register
//           </Button>
//         </Link>
//       </div>
//     </div>
//   );
// };


"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { cn } from "@/src/utils/cn";
import { Button } from "./MovingBorder";
export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  // Set true for the initial state so that nav bar is visible in the hero section
  const [visible, setVisible] = useState(true);
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        // also set true for the initial state
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  

  return (
    <div>
      {/* Logo in the left corner */}
      <img
        src={"/Webfoxshield.png"} // Use an absolute path if the image is in the public directory
        alt="Logo"
        className="fixed top-0 left-3 h-40 z-[900]" // Adjust size and margin as needed
      />
      <AnimatePresence mode="wait">
        <motion.div
          initial={{
            opacity: 1,
            y: -100,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-10 py-5 rounded-full border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center space-x-4 border-white/[0.2] bg-black-100 text-2xl", // Increased from text-xl to text-2xl
            className
          )}
          style={{
            backdropFilter: "blur(16px) saturate(180%)",
            backgroundColor: "rgba(17, 25, 40, 0.75)",
            borderRadius: "12px",
            border: "2px solid rgba(255, 255, 255, 0.125)",
          }}
        >
          {navItems.map((navItem: any, idx: number) => (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className={cn(
                "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 text-2xl" // Increased from text-xl to text-2xl
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="text-lg !cursor-pointer">{navItem.name}</span> {/* Increased from text-sm to text-lg */}
            </Link>
          ))}
        </motion.div>
      </AnimatePresence>
      {/* Login and Register Buttons */}
      <div className="fixed top-10 right-10 flex space-x-4 z-[5000]"> {/* Ensure high Z-index */}
        <Link href="/login">
          <Button className="border text-sm font-medium border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-3 rounded-full">
            Login
          </Button>
        </Link>
        <Link href="/DataHero">
          <Button className="border text-sm font-medium border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-3 rounded-full">
            Register
          </Button>
        </Link>
      </div>
    </div>
  );
};

