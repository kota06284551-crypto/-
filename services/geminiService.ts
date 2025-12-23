
// AI機能は無効化されました。静的なレスポンスのみを返します。
// import { GoogleGenAI, Type } from "@google/genai"; // 削除

export const getGameSummary = async (gameName: string) => {
  // 固定テキストを返す
  return `「${gameName}」の詳細情報は現在準備中です。AI生成機能は現在オフラインです。`;
};

export const chatWithAssistant = async (history: any[], message: string) => {
  // 固定応答を返す
  return "現在AIチャット機能はメンテナンス中です。後ほど再度お試しいただくか、記事一覧をご覧ください。";
};

export const getAIPicks = async () => {
  // 常に固定のおすすめデータを返す（APIエラー回避）
  return [
    { title: "エルデンリング", reason: "オープンワールドの金字塔として今なお圧倒的な人気を誇ります。" },
    { title: "バルダーズ・ゲート3", reason: "究極のロールプレイング体験を提供し、世界中で絶賛されています。" },
    { title: "VALORANT", reason: "競技シーンが最高潮に達しており、eスポーツ界を牽引しています。" }
  ];
};
