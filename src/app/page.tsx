export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] px-6 text-center">
      <div className="max-w-2xl w-full space-y-6">
        {/* Glitch / cyber greeting */}
        <p className="text-sm font-mono text-cyber-green tracking-widest uppercase opacity-80">
          &gt; initializing portfolio...
        </p>
        <h1 className="text-4xl md:text-6xl font-bold font-mono tracking-tight">
          Hi, I&apos;m{' '}
          <span className="text-cyber-green [text-shadow:0_0_20px_rgba(57,255,20,0.5)]">
            PraDika
          </span>
        </h1>
        <p className="text-base md:text-lg font-mono opacity-60">
          Full Stack Developer · Pixel by pixel. ⚔️
        </p>
        <p className="text-sm font-mono opacity-40">
          Press{' '}
          <kbd className="px-2 py-0.5 rounded border border-current opacity-60 text-xs">
            ☰
          </kbd>{' '}
          to open navigation
        </p>
      </div>
    </div>
  );
}
