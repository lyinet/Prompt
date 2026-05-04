// Curated list of common AI models grouped by medium.
// Users may always add custom names — this is only a starting palette.

export type ModelType = "text" | "image" | "video";

export const SUGGESTED_MODELS: Record<ModelType, string[]> = {
  text: [
    "Claude Opus 4.7",
    "Claude Sonnet 4.6",
    "Claude Haiku 4.5",
    "GPT-5",
    "GPT-4o",
    "GPT-4 Turbo",
    "Gemini 2.5 Pro",
    "Gemini 2.0 Flash",
    "DeepSeek V3",
    "Qwen 2.5 Max",
    "Llama 3.3",
    "Mistral Large",
    "Grok 3",
  ],
  image: [
    "Midjourney v7",
    "Midjourney v6.1",
    "DALL·E 3",
    "Stable Diffusion 3.5",
    "Flux Pro",
    "Flux Dev",
    "Imagen 3",
    "Recraft v3",
    "Ideogram 2.0",
    "Leonardo Phoenix",
  ],
  video: [
    "Sora",
    "Runway Gen-4",
    "Runway Gen-3 Alpha",
    "Pika 2.0",
    "Kling 2.0",
    "Veo 2",
    "Hailuo 02",
    "Luma Dream Machine",
    "Hunyuan Video",
    "Wan 2.1",
  ],
};

export function suggestionsFor(type: string | undefined): string[] {
  if (type === "text" || type === "image" || type === "video") {
    return SUGGESTED_MODELS[type];
  }
  return [
    ...SUGGESTED_MODELS.text,
    ...SUGGESTED_MODELS.image,
    ...SUGGESTED_MODELS.video,
  ];
}
