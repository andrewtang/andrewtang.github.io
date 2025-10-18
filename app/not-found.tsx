"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/sections/Footer";

export default function NotFound() {
  return (
    <>
      <main id="main-content" className="flex-1 flex items-center justify-center">
        <section className="px-6 md:px-16 w-full" style={{ paddingTop: '40px' }}>
          <div className="max-w-2xl mx-auto text-center">
            {/* Split 404 Animation */}
            <div className="relative mb-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="relative w-[70%] md:w-full max-w-md mx-auto"
              >
                {/* Top Half - clips bottom 50% */}
                <motion.div
                  className="overflow-hidden absolute top-0 left-0 w-full"
                  style={{ clipPath: 'inset(0 0 50% 0)' }}
                  initial={{ x: 0 }}
                  animate={{ x: 12 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: 0.3
                  }}
                >
                  <svg viewBox="0 0 408 166" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                    <path d="M287.09 131.383V111.785L356.466 2.19458H371.909V31.0424H362.11L312.489 109.59V110.844H407.577V131.383H287.09ZM363.208 162.739V125.425L363.365 116.488V2.19458H386.333V162.739H363.208Z" fill="currentColor"></path>
                    <path d="M203.698 165.404C191.313 165.352 180.73 162.086 171.95 155.605C163.17 149.125 156.455 139.692 151.804 127.306C147.153 114.921 144.827 100 144.827 82.5452C144.827 65.1425 147.153 50.2744 151.804 37.9409C156.507 25.6074 163.249 16.2005 172.029 9.72022C180.861 3.23991 191.417 -0.000244141 203.698 -0.000244141C215.98 -0.000244141 226.51 3.26604 235.29 9.7986C244.07 16.2789 250.785 25.6858 255.436 38.0193C260.14 50.3005 262.491 65.1425 262.491 82.5452C262.491 100.053 260.166 114.999 255.515 127.385C250.863 139.718 244.148 149.151 235.368 155.684C226.588 162.164 216.032 165.404 203.698 165.404ZM203.698 144.474C214.569 144.474 223.061 139.17 229.175 128.561C235.342 117.952 238.425 102.613 238.425 82.5452C238.425 69.2188 237.014 57.9567 234.192 48.7588C231.423 39.5087 227.425 32.5058 222.199 27.7501C217.025 22.9421 210.858 20.5381 203.698 20.5381C192.88 20.5381 184.388 25.8687 178.221 36.5299C172.055 47.191 168.945 62.5295 168.893 82.5452C168.893 95.9239 170.278 107.238 173.048 116.488C175.87 125.686 179.868 132.663 185.041 137.419C190.215 142.122 196.434 144.474 203.698 144.474Z" fill="currentColor"></path>
                    <path d="M0 131.383V111.785L69.3758 2.19458H84.8188V31.0424H75.02L25.3986 109.59V110.844H120.487V131.383H0ZM76.1174 162.739V125.425L76.2742 116.488V2.19458H99.2427V162.739H76.1174Z" fill="currentColor"></path>
                  </svg>
                </motion.div>

                {/* Bottom Half - clips top 50% */}
                <motion.div
                  className="overflow-hidden relative"
                  style={{ clipPath: 'inset(50% 0 0 0)' }}
                  initial={{ x: 0 }}
                  animate={{ x: -12 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: 0.3
                  }}
                >
                  <svg viewBox="0 0 408 166" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                    <path d="M287.09 131.383V111.785L356.466 2.19458H371.909V31.0424H362.11L312.489 109.59V110.844H407.577V131.383H287.09ZM363.208 162.739V125.425L363.365 116.488V2.19458H386.333V162.739H363.208Z" fill="currentColor"></path>
                    <path d="M203.698 165.404C191.313 165.352 180.73 162.086 171.95 155.605C163.17 149.125 156.455 139.692 151.804 127.306C147.153 114.921 144.827 100 144.827 82.5452C144.827 65.1425 147.153 50.2744 151.804 37.9409C156.507 25.6074 163.249 16.2005 172.029 9.72022C180.861 3.23991 191.417 -0.000244141 203.698 -0.000244141C215.98 -0.000244141 226.51 3.26604 235.29 9.7986C244.07 16.2789 250.785 25.6858 255.436 38.0193C260.14 50.3005 262.491 65.1425 262.491 82.5452C262.491 100.053 260.166 114.999 255.515 127.385C250.863 139.718 244.148 149.151 235.368 155.684C226.588 162.164 216.032 165.404 203.698 165.404ZM203.698 144.474C214.569 144.474 223.061 139.17 229.175 128.561C235.342 117.952 238.425 102.613 238.425 82.5452C238.425 69.2188 237.014 57.9567 234.192 48.7588C231.423 39.5087 227.425 32.5058 222.199 27.7501C217.025 22.9421 210.858 20.5381 203.698 20.5381C192.88 20.5381 184.388 25.8687 178.221 36.5299C172.055 47.191 168.945 62.5295 168.893 82.5452C168.893 95.9239 170.278 107.238 173.048 116.488C175.87 125.686 179.868 132.663 185.041 137.419C190.215 142.122 196.434 144.474 203.698 144.474Z" fill="currentColor"></path>
                    <path d="M0 131.383V111.785L69.3758 2.19458H84.8188V31.0424H75.02L25.3986 109.59V110.844H120.487V131.383H0ZM76.1174 162.739V125.425L76.2742 116.488V2.19458H99.2427V162.739H76.1174Z" fill="currentColor"></path>
                  </svg>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-2xl md:text-3xl font-serif">
                Page not found
              </h2>

              <p className="text-lg text-muted dark:text-muted-dark leading-relaxed">
                If you're reading this, something has gone terribly, terribly wrong.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
              className="mt-8"
            >
              <Link
                href="/"
                className="inline-block px-6 py-3 text-lg font-medium hover:opacity-60 transition-opacity underline decoration-1 underline-offset-4"
              >
                Return home
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
