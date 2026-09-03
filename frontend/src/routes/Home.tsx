import React from "react";
import { MotionDiv } from "../../components/motion/MotionDiv";

export function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-bg">
      {/* Ambient glow backdrop */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-primary/20 via-secondary/15 to-accent/10 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <MotionDiv
        delay={0.15}
        className="max-w-xl w-full p-8 md:p-12 rounded-2xl bg-surface/80 backdrop-blur-xl border border-border shadow-glow text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          B2 Solutions • Skeleton Setup
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-text via-text-secondary to-primary mb-4 font-heading">
          Hello World
        </h1>

        <p className="text-muted text-base md:text-lg leading-relaxed mb-6 font-body">
          Next.js SPA + PocketBase Go Framework + Docker Compose skeleton is operational.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted font-body">
          <span className="px-2.5 py-1 rounded-md bg-surface-hover border border-border">SPA Export</span>
          <span className="px-2.5 py-1 rounded-md bg-surface-hover border border-border">PocketBase v0.40.2</span>
          <span className="px-2.5 py-1 rounded-md bg-surface-hover border border-border">Go 1.27</span>
          <span className="px-2.5 py-1 rounded-md bg-surface-hover border border-border">Motion Animations</span>
        </div>
      </MotionDiv>
    </main>
  );
}

export default Home;
