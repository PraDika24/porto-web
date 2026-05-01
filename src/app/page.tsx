'use client';

import { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
import { Folder, FileText } from 'lucide-react';
import Link from 'next/link';
import useSound from 'use-sound';

export default function Home() {
  const [titleDone, setTitleDone] = useState(false);
  const [subtitleDone, setSubtitleDone] = useState(false);
  const [playClick] = useSound('/assets/sounds/click.wav', { volume: 0.5 });

  useEffect(() => {
    // Play bubble pop on load/refresh
    const timer = setTimeout(() => {
      playClick();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] px-6 text-center select-none">
      <div className="max-w-xl w-full flex flex-col items-center justify-center gap-4">

        {/* Main Title */}
        <div className="text-3xl md:text-5xl font-bold font-mono tracking-tight text-[var(--cyber-green)] min-h-[40px] md:min-h-[56px]">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("Hi, I'm Agus Handika")
                .callFunction(() => {
                  setTitleDone(true);
                })
                .start();
            }}
            options={{
              autoStart: true,
              loop: false,
              delay: 50,
              cursor: '_'
            }}
          />
        </div>

        {/* Subtitle */}
        {titleDone && (
          <div className="flex flex-col gap-2">
            <div className="text-base md:text-lg font-mono opacity-80 text-[var(--text-primary)]">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString("SecAIOps Engineer")
                    .pauseFor(300)
                    .callFunction(() => {
                      setSubtitleDone(true);
                    })
                    .start();
                }}
                options={{
                  autoStart: true,
                  loop: false,
                  delay: 40,
                  cursor: ''
                }}
              />
            </div>

            {subtitleDone && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-sm font-mono opacity-50 text-[var(--text-secondary)] max-w-sm mx-auto"
              >
                Building and Defending Systems with Code and AI
              </motion.p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {subtitleDone && (
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 mt-2"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.25
                }
              }
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.85 },
                visible: { opacity: 1, scale: 1 }
              }}
            >
              <Link href="/projects" onClick={() => playClick()}>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 14px var(--cyber-green)' }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-transparent border-2 border-[var(--cyber-green)] text-[var(--cyber-green)] hover:bg-[rgba(57,255,20,0.08)] font-mono text-sm font-bold rounded-md tracking-wider transition-all duration-200"
                >
                  <Folder className="w-4 h-4 shrink-0" />
                  Projects
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.85 },
                visible: { opacity: 1, scale: 1 }
              }}
            >
              <Link href="/cv" onClick={() => playClick()}>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 14px var(--cyber-cyan)' }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-transparent border-2 border-[var(--cyber-cyan)] text-[var(--cyber-cyan)] hover:bg-[rgba(0,245,255,0.08)] font-mono text-sm font-bold rounded-md tracking-wider transition-all duration-200"
                >
                  <FileText className="w-4 h-4 shrink-0" />
                  Download CV
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
