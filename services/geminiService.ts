
import { GoogleGenAI, Type } from "@google/genai";

// ガイドラインに従い、process.env.API_KEY を直接使用して初期化
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGameSummary = async (gameName: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `ビデオゲーム「${gameName}」について、簡潔でプロフェッショナルな概要と主要な機能を日本語で提供してください。マークダウン形式で、Luminaスコア（10点満点）も含めてください。`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "申し訳ありません。現在情報を取得できません。";
  }
};

export const chatWithAssistant = async (history: { role: 'user' | 'model', parts: { text: string }[] }[], message: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role, parts: h.parts })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: "あなたはLumina AIです。博識で熱心なゲーム専門家として、攻略のヒント、ニュースの背景、おすすめのゲームなどを日本語で回答してください。簡潔で親しみやすい口調を心がけてください。",
      }
    });

    return response.text;
  } catch (error) {
    console.error("Chat Error:", error);
    return "接続に問題が発生しました。もう一度お試しください。";
  }
};

export const getAIPicks = async () => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "今週のトレンドゲーム3つを日本語で推薦し、その理由を1文で添えてください。JSON配列で返してください。",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              reason: { type: Type.STRING }
            },
            required: ["title", "reason"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Picks Error:", error);
    return [
      { title: "エルデンリング", reason: "オープンワールドの金字塔として今なお圧倒的な人気を誇ります。" },
      { title: "バルダーズ・ゲート3", reason: "究極のロールプレイング体験を提供し、世界中で絶賛されています。" },
      { title: "VALORANT", reason: "競技シーンが最高潮に達しており、eスポーツ界を牽引しています。" }
    ];
  }
};
