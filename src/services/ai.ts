import { GoogleGenAI, Type, Schema } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface TopicIdea {
  healthFocus: string;
  foodType: string;
  mainTakeaway: string;
  title: string;
}

export interface Scene {
  sceneNumber: number;
  character: string;
  action: string;
  dialogue: string;
  textToImagePrompt: string;
  imageToVideoPrompt: string;
  characterDescription: string;
  background: string;
}

export interface ScriptProject {
  topic: TopicIdea;
  intro: string;
  scenes: Scene[];
  coverScene: {
    posterPrompt: string;
    titleOverlay: string;
    animatedIntroPrompt: string;
    lipSyncLine: string;
  };
}

export async function generateTopicIdeas(count: number): Promise<TopicIdea[]> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Generate ${count} scroll-stopping viral topic ideas for health niche YouTube Shorts/Reels where fruits and vegetables become animated characters inside the human body.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            healthFocus: {
              type: Type.STRING,
              description:
                "The specific health benefit or organ focus (e.g., Gut Health, Heart Health).",
            },
            foodType: {
              type: Type.STRING,
              description:
                "The specific fruit or vegetable (e.g., Broccoli, Blueberry).",
            },
            mainTakeaway: {
              type: Type.STRING,
              description: "The core educational message.",
            },
            title: {
              type: Type.STRING,
              description: "A short-form optimized, viral hook title.",
            },
          },
          required: ["healthFocus", "foodType", "mainTakeaway", "title"],
        },
      },
      systemInstruction:
        "You are a viral content strategist specializing in health and wellness short-form video content.",
    },
  });

  try {
    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as TopicIdea[];
  } catch (e) {
    console.error("Failed to parse topic ideas", e);
    return [];
  }
}

export async function generateScriptAndPrompts(
  topic: TopicIdea,
): Promise<ScriptProject | null> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Create a structured 90-second talking-object script and animation prompts for a viral health Short/Reel based on this topic:
    Title: ${topic.title}
    Health Focus: ${topic.healthFocus}
    Food Type: ${topic.foodType}
    Main Takeaway: ${topic.mainTakeaway}
    
    Requirements:
    - The food should be an animated character inside the human body.
    - No narration, only character dialogue.
    - Include a viral cover scene with a group character poster prompt, title overlay styling, animated intro prompt, and a lip-sync line: "We are the [TOPIC]".
    - For each scene, provide text-to-image prompt (Pixar-style), image-to-video prompt, character description, organ-specific background, and symbolic action tool.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          topic: {
            type: Type.OBJECT,
            properties: {
              healthFocus: { type: Type.STRING },
              foodType: { type: Type.STRING },
              mainTakeaway: { type: Type.STRING },
              title: { type: Type.STRING },
            },
            required: ["healthFocus", "foodType", "mainTakeaway", "title"],
          },
          intro: {
            type: Type.STRING,
            description: "A brief intro or hook for the video.",
          },
          scenes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                sceneNumber: { type: Type.INTEGER },
                character: { type: Type.STRING },
                action: { type: Type.STRING },
                dialogue: { type: Type.STRING },
                textToImagePrompt: {
                  type: Type.STRING,
                  description: "Pixar-style text-to-image prompt.",
                },
                imageToVideoPrompt: {
                  type: Type.STRING,
                  description: "Image-to-video prompt.",
                },
                characterDescription: {
                  type: Type.STRING,
                  description: "Pixar-style character description.",
                },
                background: {
                  type: Type.STRING,
                  description: "Organ-specific background.",
                },
              },
              required: [
                "sceneNumber",
                "character",
                "action",
                "dialogue",
                "textToImagePrompt",
                "imageToVideoPrompt",
                "characterDescription",
                "background",
              ],
            },
          },
          coverScene: {
            type: Type.OBJECT,
            properties: {
              posterPrompt: { type: Type.STRING },
              titleOverlay: { type: Type.STRING },
              animatedIntroPrompt: { type: Type.STRING },
              lipSyncLine: { type: Type.STRING },
            },
            required: [
              "posterPrompt",
              "titleOverlay",
              "animatedIntroPrompt",
              "lipSyncLine",
            ],
          },
        },
        required: ["topic", "intro", "scenes", "coverScene"],
      },
      systemInstruction:
        "You are an expert scriptwriter and AI prompt engineer for viral 3D animated health content.",
    },
  });

  try {
    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as ScriptProject;
  } catch (e) {
    console.error("Failed to parse script and prompts", e);
    return null;
  }
}
