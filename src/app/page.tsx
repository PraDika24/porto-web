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
    // Play on load/refresh
    const timer = setTimeout(() => {
      playClick();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] px-6 text-center select-none">
      <div className="max-w-2xl w-full space-y-8 flex flex-col items-center justify-center">
        {/* Glitch / cyber greeting */}
        <p className="text-sm font-mono text-[var(--cyber-green)] tracking-widest uppercase opacity-80 select-none">
          &gt; initializing portfolio...
        </p>

        {/* Main Title */}
        <div className="text-4xl md:text-6xl font-bold font-mono tracking-tight text-[var(--cyber-green)] min-h-[60px] md:min-h-[80px]">
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
          <div className="flex flex-col space-y-3 min-h-[90px]">
            <div className="text-xl md:text-2xl font-mono opacity-80 text-[var(--text-primary)]">
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
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-base font-mono opacity-60 text-[var(--text-secondary)] max-w-lg mx-auto"
              >
                Building and Defending Systems with Code and AI
              </motion.p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {subtitleDone && (
          <motion.div 
            className="flex flex-wrap items-center justify-center gap-4 mt-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.3
                }
              }
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}
            >
              <Link href="/projects" onClick={() => playClick()}>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 15px var(--cyber-green)' }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-[var(--cyber-green)] text-[var(--cyber-green)] hover:bg-[var(--cyber-green)] hover:bg-opacity-10 font-mono text-base font-bold rounded-md tracking-wider transition-all duration-200"
                >
                  <Folder className="w-5 h-5 shrink-0" />
                  Projects
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}
            >
              <Link href="/cv" onClick={() => playClick()}>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 15px var(--cyber-cyan)' }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-[var(--cyber-cyan)] text-[var(--cyber-cyan)] hover:bg-[var(--cyber-cyan)] hover:bg-opacity-10 font-mono text-base font-bold rounded-md tracking-wider transition-all duration-200"
                >
                  <FileText className="w-5 h-5 shrink-0" />
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
