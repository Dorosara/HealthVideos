import React from "react";
import { Play, Sparkles, Zap, Video, ArrowRight } from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-zinc-950" />
          </div>
          <span className="text-xl font-bold tracking-tight">NutriToon AI</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-zinc-400 hover:text-zinc-50 transition-colors">
            Login
          </button>
          <button
            onClick={onStart}
            className="px-4 py-2 text-sm font-medium bg-zinc-50 text-zinc-950 rounded-full hover:bg-zinc-200 transition-colors"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-8 border border-emerald-500/20">
          <Sparkles className="w-4 h-4" />
          <span>The World's First AI Health Animation Engine</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 max-w-4xl mx-auto leading-tight">
          Turn Healthy Foods Into <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Viral Talking Characters
          </span>
        </h1>

        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12">
          Automatically generate viral health niche Shorts and Reels where
          fruits and vegetables become animated characters inside the human
          body.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 text-lg font-medium bg-emerald-500 text-zinc-950 rounded-full hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)]"
          >
            Start Creating Viral Videos
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 text-lg font-medium bg-zinc-900 text-zinc-50 rounded-full hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 border border-zinc-800">
            <Play className="w-5 h-5" />
            Watch Demo
          </button>
        </div>
      </main>

      {/* Features Grid */}
      <section className="bg-zinc-900/50 border-t border-zinc-800/50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to go viral
            </h2>
            <p className="text-zinc-400">
              Stop struggling with boring scripts and complicated animation
              tools.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6 text-emerald-400" />,
                title: "Viral Topic Generator",
                desc: "Get scroll-stopping ideas optimized for YouTube Shorts and TikTok retention.",
              },
              {
                icon: <Video className="w-6 h-6 text-cyan-400" />,
                title: "Cinematic Prompts",
                desc: "Auto-generate Pixar-style image and video prompts for consistent character design.",
              },
              {
                icon: <Sparkles className="w-6 h-6 text-purple-400" />,
                title: "Organ-Based Scripts",
                desc: "Structured 90-second talking-object scripts set inside the human body.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-950 flex items-center justify-center mb-6 border border-zinc-800">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
