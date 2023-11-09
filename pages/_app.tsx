"use client";
import { store } from "@/redux/Store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 20);
      cursorY.set(e.clientY - 20);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <motion.div
          className="cursor"
          style={{
            translateX: cursorXSpring,
            translateY: cursorYSpring,
          }}
        ></motion.div>

        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}
