import React, { useState } from "react";
import {
  Sparkles,
  Loader2,
  Video,
  FileText,
  Download,
  Copy,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import {
  generateTopicIdeas,
  generateScriptAndPrompts,
  TopicIdea,
  ScriptProject,
} from "../services/ai";

export default function Dashboard({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [ideaCount, setIdeaCount] = useState<number>(3);
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false);
  const [ideas, setIdeas] = useState<TopicIdea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<TopicIdea | null>(null);

  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [project, setProject] = useState<ScriptProject | null>(null);

  const handleGenerateIdeas = async () => {
    setIsGeneratingIdeas(true);
    try {
      const generatedIdeas = await generateTopicIdeas(ideaCount);
      setIdeas(generatedIdeas);
    } catch (error) {
      console.error("Failed to generate ideas", error);
    } finally {
      setIsGeneratingIdeas(false);
    }
  };

  const handleSelectIdea = async (idea: TopicIdea) => {
    setSelectedIdea(idea);
    setStep(2);
    setIsGeneratingScript(true);
    try {
      const generatedProject = await generateScriptAndPrompts(idea);
      setProject(generatedProject);
      setStep(3);
    } catch (error) {
      console.error("Failed to generate script", error);
      setStep(1);
    } finally {
      setIsGeneratingScript(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast here
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-lg hover:bg-zinc-900 text-zinc-400 hover:text-zinc-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-zinc-950" />
              </div>
              <span className="font-bold tracking-tight">NutriToon Studio</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
            <span className={step >= 1 ? "text-emerald-400" : ""}>
              1. Ideas
            </span>
            <ChevronRight className="w-4 h-4" />
            <span className={step >= 2 ? "text-emerald-400" : ""}>
              2. Script
            </span>
            <ChevronRight className="w-4 h-4" />
            <span className={step >= 3 ? "text-emerald-400" : ""}>
              3. Export
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Step 1: Generate Ideas */}
        {step === 1 && (
          <div className="space-y-8 transition-all duration-500">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tight mb-4">
                Generate Viral Topic Ideas
              </h1>
              <p className="text-zinc-400">
                Select how many ideas you want to generate. We'll create
                scroll-stopping hooks for health niche Shorts.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-xl mx-auto">
              <div className="flex flex-col gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Number of Ideas
                  </label>
                  <div className="flex gap-2">
                    {[3, 5, 10].map((num) => (
                      <button
                        key={num}
                        onClick={() => setIdeaCount(num)}
                        className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all ${
                          ideaCount === num
                            ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400"
                            : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                        }`}
                      >
                        {num} Ideas
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleGenerateIdeas}
                  disabled={isGeneratingIdeas}
                  className="w-full py-4 bg-emerald-500 text-zinc-950 rounded-xl font-semibold hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isGeneratingIdeas ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating Ideas...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Topics
                    </>
                  )}
                </button>
              </div>
            </div>

            {ideas.length > 0 && (
              <div className="grid gap-4 mt-12">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  Select a topic to generate script
                </h2>
                {ideas.map((idea, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectIdea(idea)}
                    className="text-left p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800/50 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-zinc-100 mb-2 group-hover:text-emerald-400 transition-colors">
                          {idea.title}
                        </h3>
                        <p className="text-zinc-400 text-sm mb-4">
                          {idea.mainTakeaway}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-xs font-medium text-zinc-300">
                            Focus: {idea.healthFocus}
                          </span>
                          <span className="px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-xs font-medium text-zinc-300">
                            Character: {idea.foodType}
                          </span>
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-zinc-950 group-hover:border-emerald-500 transition-all shrink-0">
                        <Video className="w-4 h-4" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Generating Script */}
        {step === 2 && isGeneratingScript && (
          <div className="flex flex-col items-center justify-center py-32 transition-all duration-500">
            <div className="w-24 h-24 relative mb-8">
              <div className="absolute inset-0 border-4 border-zinc-800 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-emerald-500 animate-pulse" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">
              Crafting your viral script...
            </h2>
            <p className="text-zinc-400 text-center max-w-md">
              Generating Pixar-style prompts, organ backgrounds, and engaging
              dialogue for "{selectedIdea?.title}"
            </p>
          </div>
        )}

        {/* Step 3: View & Export */}
        {step === 3 && project && (
          <div className="space-y-8 transition-all duration-500">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium mb-4 border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" />
                  Generation Complete
                </div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {project.topic.title}
                </h1>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm font-medium hover:bg-zinc-800 transition-colors"
                >
                  Start Over
                </button>
                <button
                  onClick={() =>
                    copyToClipboard(JSON.stringify(project, null, 2))
                  }
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-zinc-950 text-sm font-semibold hover:bg-emerald-400 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export JSON
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column: Script & Dialogue */}
              <div className="lg:col-span-1 space-y-6">
                <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <FileText className="w-4 h-4 text-zinc-400" />
                      Script Overview
                    </h3>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div>
                      <span className="text-zinc-500 block mb-1">
                        Intro Hook
                      </span>
                      <p className="text-zinc-300 font-medium">
                        {project.intro}
                      </p>
                    </div>
                    <div>
                      <span className="text-zinc-500 block mb-1">
                        Main Takeaway
                      </span>
                      <p className="text-zinc-300">
                        {project.topic.mainTakeaway}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-zinc-400 px-2">
                    Scene Dialogue
                  </h3>
                  {project.scenes.map((scene, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/50"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">
                          {scene.sceneNumber}
                        </span>
                        <span className="font-medium text-emerald-400">
                          {scene.character}
                        </span>
                      </div>
                      <p className="text-zinc-100 text-lg font-medium leading-snug">
                        "{scene.dialogue}"
                      </p>
                      <p className="text-zinc-500 text-xs mt-3 italic">
                        Action: {scene.action}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Prompts & Visuals */}
              <div className="lg:col-span-2 space-y-6">
                <div className="p-6 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800">
                  <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                    <Video className="w-5 h-5 text-emerald-500" />
                    Cover Scene Assets
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                          Poster Prompt
                        </span>
                        <button
                          onClick={() =>
                            copyToClipboard(project.coverScene.posterPrompt)
                          }
                          className="text-zinc-500 hover:text-zinc-300"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-sm text-zinc-300 font-mono leading-relaxed">
                        {project.coverScene.posterPrompt}
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                          Title Overlay
                        </span>
                        <button
                          onClick={() =>
                            copyToClipboard(project.coverScene.titleOverlay)
                          }
                          className="text-zinc-500 hover:text-zinc-300"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-sm text-zinc-300 font-mono leading-relaxed">
                        {project.coverScene.titleOverlay}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-zinc-400 px-2">
                    Animation Prompts
                  </h3>
                  {project.scenes.map((scene, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800"
                    >
                      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-800/50">
                        <span className="px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-xs font-bold text-zinc-400">
                          Scene {scene.sceneNumber}
                        </span>
                        <span className="text-sm font-medium text-zinc-300">
                          Background: {scene.background}
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-emerald-500 uppercase tracking-wider">
                              Text-to-Image Prompt
                            </span>
                            <button
                              onClick={() =>
                                copyToClipboard(scene.textToImagePrompt)
                              }
                              className="text-zinc-500 hover:text-zinc-300"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-sm text-zinc-300 font-mono bg-zinc-950 p-3 rounded-lg border border-zinc-800/50">
                            {scene.textToImagePrompt}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-cyan-500 uppercase tracking-wider">
                              Image-to-Video Prompt
                            </span>
                            <button
                              onClick={() =>
                                copyToClipboard(scene.imageToVideoPrompt)
                              }
                              className="text-zinc-500 hover:text-zinc-300"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="text-sm text-zinc-300 font-mono bg-zinc-950 p-3 rounded-lg border border-zinc-800/50">
                            {scene.imageToVideoPrompt}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
