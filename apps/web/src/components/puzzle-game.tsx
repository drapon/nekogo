import { useState, useEffect, useCallback, useRef } from "react";

// ピクセルアート風SVGアイコン定義
const Icons = {
  cat: (
    <svg
      viewBox="0 0 32 32"
      className="w-10 h-10"
      style={{ imageRendering: "pixelated" }}
    >
      {/* 耳 */}
      <rect x="6" y="4" width="4" height="4" fill="#E8A45C" />
      <rect x="22" y="4" width="4" height="4" fill="#E8A45C" />
      <rect x="7" y="5" width="2" height="2" fill="#FFD1DC" />
      <rect x="23" y="5" width="2" height="2" fill="#FFD1DC" />
      {/* 頭 */}
      <rect x="8" y="6" width="16" height="12" fill="#E8A45C" />
      <rect x="6" y="8" width="2" height="8" fill="#E8A45C" />
      <rect x="24" y="8" width="2" height="8" fill="#E8A45C" />
      {/* 目 */}
      <rect x="10" y="10" width="4" height="4" fill="#333" />
      <rect x="18" y="10" width="4" height="4" fill="#333" />
      <rect x="11" y="11" width="2" height="2" fill="#fff" />
      <rect x="19" y="11" width="2" height="2" fill="#fff" />
      {/* 鼻 */}
      <rect x="14" y="14" width="4" height="2" fill="#FF6B6B" />
      {/* 口 */}
      <rect x="13" y="16" width="2" height="2" fill="#333" />
      <rect x="17" y="16" width="2" height="2" fill="#333" />
      {/* 体 */}
      <rect x="10" y="18" width="12" height="8" fill="#E8A45C" />
      {/* 足 */}
      <rect x="10" y="26" width="4" height="2" fill="#E8A45C" />
      <rect x="18" y="26" width="4" height="2" fill="#E8A45C" />
      {/* しっぽ */}
      <rect x="22" y="20" width="4" height="2" fill="#E8A45C" />
      <rect x="24" y="18" width="2" height="2" fill="#E8A45C" />
    </svg>
  ),
  goal: (
    <svg
      viewBox="0 0 32 32"
      className="w-10 h-10"
      style={{ imageRendering: "pixelated" }}
    >
      {/* ポール */}
      <rect x="8" y="6" width="2" height="22" fill="#8B8B8B" />
      <rect x="8" y="28" width="6" height="2" fill="#6B6B6B" />
      {/* 旗（チェッカー模様） */}
      <rect x="10" y="6" width="16" height="12" fill="#fff" />
      <rect x="10" y="6" width="4" height="4" fill="#1a1a1a" />
      <rect x="18" y="6" width="4" height="4" fill="#1a1a1a" />
      <rect x="14" y="10" width="4" height="4" fill="#1a1a1a" />
      <rect x="22" y="10" width="4" height="4" fill="#1a1a1a" />
      <rect x="10" y="14" width="4" height="4" fill="#1a1a1a" />
      <rect x="18" y="14" width="4" height="4" fill="#1a1a1a" />
      {/* 旗の枠 */}
      <rect x="10" y="6" width="16" height="2" fill="#333" />
      <rect x="10" y="16" width="16" height="2" fill="#333" />
    </svg>
  ),
  camera: (rotation: number) => (
    <svg
      viewBox="0 0 32 32"
      className="w-10 h-10"
      style={{
        imageRendering: "pixelated",
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* カメラ本体（長方形） */}
      <rect x="8" y="10" width="16" height="18" fill="#4B4B4B" />
      <rect x="10" y="12" width="12" height="14" fill="#5B5B5B" />
      {/* レンズ（上端に配置 = 向いている方向） */}
      <rect x="12" y="4" width="8" height="8" fill="#222" />
      <rect x="13" y="5" width="6" height="6" fill="#333" />
      <rect x="14" y="6" width="4" height="4" fill="#1a1a1a" />
      <rect x="15" y="7" width="2" height="2" fill="#6CF" />
      {/* 赤いランプ */}
      <rect x="18" y="14" width="2" height="2" fill="#FF0000" />
    </svg>
  ),
  onigiri: (
    <svg
      viewBox="0 0 32 32"
      className="w-10 h-10"
      style={{ imageRendering: "pixelated" }}
    >
      {/* おにぎり本体（白） */}
      <rect x="14" y="4" width="4" height="2" fill="#fff" />
      <rect x="12" y="6" width="8" height="2" fill="#fff" />
      <rect x="10" y="8" width="12" height="2" fill="#fff" />
      <rect x="8" y="10" width="16" height="2" fill="#fff" />
      <rect x="6" y="12" width="20" height="4" fill="#fff" />
      <rect x="6" y="16" width="20" height="4" fill="#fff" />
      <rect x="8" y="20" width="16" height="4" fill="#fff" />
      <rect x="10" y="24" width="12" height="2" fill="#fff" />
      {/* 海苔（黒） */}
      <rect x="10" y="18" width="12" height="6" fill="#1a1a1a" />
      <rect x="12" y="24" width="8" height="2" fill="#1a1a1a" />
      {/* 輪郭 */}
      <rect x="14" y="2" width="4" height="2" fill="#333" />
      <rect x="12" y="4" width="2" height="2" fill="#333" />
      <rect x="18" y="4" width="2" height="2" fill="#333" />
      <rect x="10" y="6" width="2" height="2" fill="#333" />
      <rect x="20" y="6" width="2" height="2" fill="#333" />
      <rect x="8" y="8" width="2" height="2" fill="#333" />
      <rect x="22" y="8" width="2" height="2" fill="#333" />
      <rect x="6" y="10" width="2" height="2" fill="#333" />
      <rect x="24" y="10" width="2" height="2" fill="#333" />
      <rect x="4" y="12" width="2" height="8" fill="#333" />
      <rect x="26" y="12" width="2" height="8" fill="#333" />
      <rect x="6" y="20" width="2" height="2" fill="#333" />
      <rect x="24" y="20" width="2" height="2" fill="#333" />
      <rect x="8" y="22" width="2" height="2" fill="#333" />
      <rect x="22" y="22" width="2" height="2" fill="#333" />
      <rect x="10" y="24" width="2" height="2" fill="#333" />
      <rect x="20" y="24" width="2" height="2" fill="#333" />
      <rect x="12" y="26" width="8" height="2" fill="#333" />
    </svg>
  ),
  block: (
    <svg
      viewBox="0 0 32 32"
      className="w-10 h-10"
      style={{ imageRendering: "pixelated" }}
    >
      {/* ブロック本体（石風） */}
      <rect x="2" y="2" width="28" height="28" fill="#7B7B8B" />
      {/* ハイライト */}
      <rect x="4" y="4" width="24" height="4" fill="#9B9BAB" />
      <rect x="4" y="4" width="4" height="24" fill="#9B9BAB" />
      {/* シャドウ */}
      <rect x="24" y="8" width="4" height="20" fill="#5B5B6B" />
      <rect x="8" y="24" width="20" height="4" fill="#5B5B6B" />
      {/* ひび割れ模様 */}
      <rect x="12" y="10" width="2" height="4" fill="#4B4B5B" />
      <rect x="14" y="12" width="4" height="2" fill="#4B4B5B" />
      <rect x="16" y="14" width="2" height="4" fill="#4B4B5B" />
      <rect x="18" y="16" width="4" height="2" fill="#4B4B5B" />
      <rect x="8" y="18" width="2" height="2" fill="#4B4B5B" />
      <rect x="20" y="8" width="2" height="2" fill="#4B4B5B" />
      {/* 枠線 */}
      <rect x="0" y="0" width="32" height="2" fill="#3B3B4B" />
      <rect x="0" y="30" width="32" height="2" fill="#3B3B4B" />
      <rect x="0" y="0" width="2" height="32" fill="#3B3B4B" />
      <rect x="30" y="0" width="2" height="32" fill="#3B3B4B" />
    </svg>
  ),
  wanwan: (
    <svg
      viewBox="0 0 32 32"
      className="w-10 h-10"
      style={{ imageRendering: "pixelated" }}
    >
      {/* 鎖 */}
      <rect x="2" y="22" width="4" height="4" fill="#6B6B6B" />
      <rect x="4" y="24" width="2" height="2" fill="#9B9B9B" />
      <rect x="6" y="20" width="4" height="4" fill="#6B6B6B" />
      <rect x="8" y="22" width="2" height="2" fill="#9B9B9B" />
      {/* 球体 */}
      <rect x="10" y="6" width="16" height="20" fill="#2B2B4B" />
      <rect x="12" y="4" width="12" height="2" fill="#2B2B4B" />
      <rect x="12" y="26" width="12" height="2" fill="#2B2B4B" />
      <rect x="8" y="8" width="2" height="16" fill="#2B2B4B" />
      <rect x="26" y="8" width="2" height="16" fill="#2B2B4B" />
      {/* ハイライト */}
      <rect x="12" y="6" width="6" height="4" fill="#4B4B6B" />
      {/* 目（白目） */}
      <rect x="12" y="10" width="6" height="6" fill="#fff" />
      <rect x="20" y="10" width="6" height="6" fill="#fff" />
      {/* 目（黒目） */}
      <rect x="14" y="12" width="4" height="4" fill="#000" />
      <rect x="22" y="12" width="4" height="4" fill="#000" />
      {/* 口 */}
      <rect x="14" y="18" width="10" height="6" fill="#000" />
      {/* 牙 */}
      <rect x="14" y="18" width="2" height="4" fill="#fff" />
      <rect x="22" y="18" width="2" height="4" fill="#fff" />
    </svg>
  ),
  // こわれない壁（青いブロック）
  wall: (
    <svg
      viewBox="0 0 32 32"
      className="w-10 h-10"
      style={{ imageRendering: "pixelated" }}
    >
      {/* ブロック本体（青/氷風） */}
      <rect x="2" y="2" width="28" height="28" fill="#4B9BDB" />
      {/* ハイライト */}
      <rect x="4" y="4" width="24" height="4" fill="#7BCBFB" />
      <rect x="4" y="4" width="4" height="24" fill="#7BCBFB" />
      {/* シャドウ */}
      <rect x="24" y="8" width="4" height="20" fill="#2B6B9B" />
      <rect x="8" y="24" width="20" height="4" fill="#2B6B9B" />
      {/* 光沢 */}
      <rect x="8" y="8" width="4" height="4" fill="#ABEBFF" />
      <rect x="20" y="12" width="2" height="2" fill="#ABEBFF" />
      {/* 枠線 */}
      <rect x="0" y="0" width="32" height="2" fill="#1B4B6B" />
      <rect x="0" y="30" width="32" height="2" fill="#1B4B6B" />
      <rect x="0" y="0" width="2" height="32" fill="#1B4B6B" />
      <rect x="30" y="0" width="2" height="32" fill="#1B4B6B" />
    </svg>
  ),
  // 動かせるブロック（木箱風）
  pushable: (
    <svg
      viewBox="0 0 32 32"
      className="w-10 h-10"
      style={{ imageRendering: "pixelated" }}
    >
      {/* 木箱本体（茶色） */}
      <rect x="2" y="2" width="28" height="28" fill="#8B5A2B" />
      {/* ハイライト */}
      <rect x="4" y="4" width="24" height="4" fill="#A67B4B" />
      <rect x="4" y="4" width="4" height="24" fill="#A67B4B" />
      {/* シャドウ */}
      <rect x="24" y="8" width="4" height="20" fill="#6B4A1B" />
      <rect x="8" y="24" width="20" height="4" fill="#6B4A1B" />
      {/* 木目模様（横線） */}
      <rect x="6" y="10" width="20" height="2" fill="#7B4A1B" />
      <rect x="6" y="18" width="20" height="2" fill="#7B4A1B" />
      {/* 矢印マーク（押せることを示す） */}
      <rect x="13" y="12" width="6" height="2" fill="#FFD700" />
      <rect x="14" y="14" width="4" height="2" fill="#FFD700" />
      <rect x="15" y="16" width="2" height="2" fill="#FFD700" />
      {/* 枠線 */}
      <rect x="0" y="0" width="32" height="2" fill="#4B3A1B" />
      <rect x="0" y="30" width="32" height="2" fill="#4B3A1B" />
      <rect x="0" y="0" width="2" height="32" fill="#4B3A1B" />
      <rect x="30" y="0" width="2" height="32" fill="#4B3A1B" />
    </svg>
  ),
  pickaxe: (
    <svg
      viewBox="0 0 32 32"
      className="w-8 h-8"
      style={{ imageRendering: "pixelated" }}
    >
      {/* 柄 */}
      <rect x="6" y="20" width="4" height="4" fill="#8B5A2B" />
      <rect x="10" y="16" width="4" height="4" fill="#8B5A2B" />
      <rect x="14" y="12" width="4" height="4" fill="#8B5A2B" />
      <rect x="18" y="8" width="4" height="4" fill="#8B5A2B" />
      <rect x="4" y="24" width="4" height="4" fill="#6B4A1B" />
      {/* ヘッド */}
      <rect x="20" y="4" width="8" height="4" fill="#9B9BAB" />
      <rect x="24" y="8" width="4" height="4" fill="#9B9BAB" />
      <rect x="22" y="2" width="6" height="2" fill="#BBBBC" />
      <rect x="26" y="4" width="2" height="2" fill="#BBBBC" />
      {/* シャドウ */}
      <rect x="20" y="6" width="8" height="2" fill="#7B7B8B" />
      <rect x="26" y="8" width="2" height="4" fill="#7B7B8B" />
    </svg>
  ),
  // 鍵
  key: (
    <svg
      viewBox="0 0 32 32"
      className="w-10 h-10"
      style={{ imageRendering: "pixelated" }}
    >
      {/* 鍵の頭（円形） */}
      <rect x="6" y="4" width="12" height="12" fill="#FFD700" />
      <rect x="8" y="2" width="8" height="2" fill="#FFD700" />
      <rect x="8" y="16" width="8" height="2" fill="#FFD700" />
      <rect x="4" y="6" width="2" height="8" fill="#FFD700" />
      <rect x="18" y="6" width="2" height="8" fill="#FFD700" />
      {/* 穴 */}
      <rect x="10" y="8" width="4" height="4" fill="#8B6914" />
      {/* 軸 */}
      <rect x="14" y="14" width="4" height="14" fill="#FFD700" />
      {/* 歯 */}
      <rect x="18" y="20" width="4" height="4" fill="#FFD700" />
      <rect x="18" y="26" width="6" height="4" fill="#FFD700" />
      {/* ハイライト */}
      <rect x="8" y="4" width="4" height="2" fill="#FFF8DC" />
      <rect x="6" y="6" width="2" height="4" fill="#FFF8DC" />
    </svg>
  ),
  // ドア
  door: (
    <svg
      viewBox="0 0 32 32"
      className="w-10 h-10"
      style={{ imageRendering: "pixelated" }}
    >
      {/* ドア枠 */}
      <rect x="4" y="2" width="24" height="28" fill="#8B4513" />
      {/* ドア本体 */}
      <rect x="6" y="4" width="20" height="24" fill="#A0522D" />
      {/* パネル上 */}
      <rect x="8" y="6" width="16" height="8" fill="#8B4513" />
      <rect x="10" y="8" width="12" height="4" fill="#CD853F" />
      {/* パネル下 */}
      <rect x="8" y="16" width="16" height="10" fill="#8B4513" />
      <rect x="10" y="18" width="12" height="6" fill="#CD853F" />
      {/* ドアノブ */}
      <rect x="20" y="14" width="4" height="4" fill="#FFD700" />
      <rect x="21" y="15" width="2" height="2" fill="#FFF8DC" />
      {/* 鍵穴 */}
      <rect x="21" y="19" width="2" height="3" fill="#333" />
    </svg>
  ),
  // テレポート（色付き版）
  teleport: (color: string) => (
    <svg
      viewBox="0 0 32 32"
      className="w-10 h-10"
      style={{ imageRendering: "pixelated" }}
    >
      {/* 外側の円 */}
      <rect x="8" y="2" width="16" height="4" fill={color} />
      <rect x="4" y="6" width="4" height="4" fill={color} />
      <rect x="24" y="6" width="4" height="4" fill={color} />
      <rect x="2" y="10" width="4" height="12" fill={color} />
      <rect x="26" y="10" width="4" height="12" fill={color} />
      <rect x="4" y="22" width="4" height="4" fill={color} />
      <rect x="24" y="22" width="4" height="4" fill={color} />
      <rect x="8" y="26" width="16" height="4" fill={color} />
      {/* 内側（渦巻き風） */}
      <rect x="10" y="8" width="12" height="2" fill={color} opacity="0.7" />
      <rect x="18" y="10" width="4" height="4" fill={color} opacity="0.7" />
      <rect x="10" y="14" width="12" height="2" fill={color} opacity="0.5" />
      <rect x="10" y="16" width="4" height="4" fill={color} opacity="0.7" />
      <rect x="10" y="20" width="12" height="2" fill={color} opacity="0.5" />
      {/* 中心 */}
      <rect x="14" y="14" width="4" height="4" fill="#fff" />
    </svg>
  ),
  eraser: (
    <svg
      viewBox="0 0 32 32"
      className="w-8 h-8"
      style={{ imageRendering: "pixelated" }}
    >
      {/* 消しゴム本体 */}
      <rect x="4" y="10" width="24" height="16" fill="#FFB6C1" />
      {/* ラベル */}
      <rect x="4" y="10" width="24" height="6" fill="#4169E1" />
      {/* ハイライト */}
      <rect x="6" y="12" width="20" height="2" fill="#6189FF" />
      {/* 使用跡 */}
      <rect x="4" y="22" width="24" height="4" fill="#FF9999" />
      {/* 枠 */}
      <rect x="2" y="8" width="28" height="2" fill="#333" />
      <rect x="2" y="26" width="28" height="2" fill="#333" />
      <rect x="2" y="8" width="2" height="20" fill="#333" />
      <rect x="28" y="8" width="2" height="20" fill="#333" />
    </svg>
  ),
  soundOn: (
    <svg
      viewBox="0 0 32 32"
      className="w-6 h-6"
      style={{ imageRendering: "pixelated" }}
    >
      {/* スピーカー本体 */}
      <rect x="4" y="10" width="6" height="12" fill="#333" />
      <rect x="10" y="6" width="4" height="20" fill="#333" />
      <rect x="14" y="4" width="2" height="24" fill="#333" />
      {/* 音波 */}
      <rect x="18" y="12" width="2" height="8" fill="#333" />
      <rect x="22" y="8" width="2" height="16" fill="#333" />
      <rect x="26" y="4" width="2" height="24" fill="#333" />
    </svg>
  ),
  soundOff: (
    <svg
      viewBox="0 0 32 32"
      className="w-6 h-6"
      style={{ imageRendering: "pixelated" }}
    >
      {/* スピーカー本体 */}
      <rect x="4" y="10" width="6" height="12" fill="#666" />
      <rect x="10" y="6" width="4" height="20" fill="#666" />
      <rect x="14" y="4" width="2" height="24" fill="#666" />
      {/* 斜線（ミュート） */}
      <rect
        x="20"
        y="6"
        width="3"
        height="22"
        fill="#FF4444"
        transform="rotate(45, 22, 16)"
      />
      <rect x="18" y="10" width="2" height="2" fill="#FF4444" />
      <rect x="20" y="12" width="2" height="2" fill="#FF4444" />
      <rect x="22" y="14" width="2" height="2" fill="#FF4444" />
      <rect x="24" y="16" width="2" height="2" fill="#FF4444" />
      <rect x="26" y="18" width="2" height="2" fill="#FF4444" />
      <rect x="28" y="20" width="2" height="2" fill="#FF4444" />
    </svg>
  ),
};

// 白黒印刷用SVGアイコン
const PrintIcons = {
  cat: `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect x="6" y="4" width="4" height="4" fill="#000"/>
    <rect x="22" y="4" width="4" height="4" fill="#000"/>
    <rect x="8" y="6" width="16" height="12" fill="#000"/>
    <rect x="6" y="8" width="2" height="8" fill="#000"/>
    <rect x="24" y="8" width="2" height="8" fill="#000"/>
    <rect x="10" y="10" width="4" height="4" fill="#fff"/>
    <rect x="18" y="10" width="4" height="4" fill="#fff"/>
    <rect x="11" y="11" width="2" height="2" fill="#000"/>
    <rect x="19" y="11" width="2" height="2" fill="#000"/>
    <rect x="14" y="14" width="4" height="2" fill="#fff"/>
    <rect x="10" y="18" width="12" height="8" fill="#000"/>
    <rect x="10" y="26" width="4" height="2" fill="#000"/>
    <rect x="18" y="26" width="4" height="2" fill="#000"/>
  </svg>`,
  goal: `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect x="8" y="6" width="2" height="22" fill="#000"/>
    <rect x="8" y="28" width="6" height="2" fill="#000"/>
    <rect x="10" y="6" width="16" height="12" fill="#fff" stroke="#000" stroke-width="1"/>
    <rect x="10" y="6" width="4" height="4" fill="#000"/>
    <rect x="18" y="6" width="4" height="4" fill="#000"/>
    <rect x="14" y="10" width="4" height="4" fill="#000"/>
    <rect x="22" y="10" width="4" height="4" fill="#000"/>
    <rect x="10" y="14" width="4" height="4" fill="#000"/>
    <rect x="18" y="14" width="4" height="4" fill="#000"/>
  </svg>`,
  camera: (dir: Direction) => {
    const rotation: Record<Direction, number> = {
      up: 0,
      right: 90,
      down: 180,
      left: 270,
    };
    return `<svg viewBox="0 0 32 32" width="32" height="32" style="transform:rotate(${rotation[dir]}deg)">
      <rect x="8" y="10" width="16" height="18" fill="#000"/>
      <rect x="10" y="12" width="12" height="14" fill="#666"/>
      <rect x="12" y="4" width="8" height="8" fill="#000"/>
      <rect x="13" y="5" width="6" height="6" fill="#333"/>
      <rect x="14" y="6" width="4" height="4" fill="#000"/>
      <circle cx="16" cy="8" r="1.5" fill="#fff"/>
    </svg>`;
  },
  onigiri: `<svg viewBox="0 0 32 32" width="32" height="32">
    <polygon points="16,4 4,26 28,26" fill="#fff" stroke="#000" stroke-width="2"/>
    <rect x="10" y="18" width="12" height="8" fill="#000"/>
  </svg>`,
  block: `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect x="2" y="2" width="28" height="28" fill="#999" stroke="#000" stroke-width="2"/>
    <line x1="8" y1="8" x2="14" y2="16" stroke="#666" stroke-width="2"/>
    <line x1="14" y1="16" x2="20" y2="12" stroke="#666" stroke-width="2"/>
    <line x1="20" y1="12" x2="24" y2="20" stroke="#666" stroke-width="2"/>
  </svg>`,
  wanwan: `<svg viewBox="0 0 32 32" width="32" height="32">
    <circle cx="18" cy="16" r="12" fill="#000"/>
    <rect x="2" y="22" width="4" height="4" fill="#666" stroke="#000"/>
    <rect x="6" y="20" width="4" height="4" fill="#666" stroke="#000"/>
    <rect x="12" y="10" width="5" height="5" fill="#fff"/>
    <rect x="20" y="10" width="5" height="5" fill="#fff"/>
    <rect x="14" y="12" width="3" height="3" fill="#000"/>
    <rect x="22" y="12" width="3" height="3" fill="#000"/>
    <rect x="14" y="18" width="10" height="5" fill="#fff"/>
    <rect x="14" y="18" width="2" height="4" fill="#000"/>
    <rect x="22" y="18" width="2" height="4" fill="#000"/>
  </svg>`,
  wall: `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect x="2" y="2" width="28" height="28" fill="#000"/>
    <rect x="4" y="4" width="8" height="6" fill="#333"/>
    <rect x="14" y="4" width="8" height="6" fill="#333"/>
    <rect x="24" y="4" width="4" height="6" fill="#333"/>
    <rect x="4" y="12" width="5" height="6" fill="#333"/>
    <rect x="11" y="12" width="8" height="6" fill="#333"/>
    <rect x="21" y="12" width="7" height="6" fill="#333"/>
    <rect x="4" y="20" width="8" height="6" fill="#333"/>
    <rect x="14" y="20" width="8" height="6" fill="#333"/>
    <rect x="24" y="20" width="4" height="6" fill="#333"/>
  </svg>`,
  pushable: `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect x="2" y="2" width="28" height="28" fill="#fff" stroke="#000" stroke-width="2"/>
    <line x1="6" y1="10" x2="26" y2="10" stroke="#000" stroke-width="1"/>
    <line x1="6" y1="18" x2="26" y2="18" stroke="#000" stroke-width="1"/>
    <polygon points="16,8 12,14 20,14" fill="#000"/>
    <polygon points="16,24 12,18 20,18" fill="#000"/>
  </svg>`,
  key: `<svg viewBox="0 0 32 32" width="32" height="32">
    <circle cx="12" cy="10" r="7" fill="#fff" stroke="#000" stroke-width="2"/>
    <circle cx="12" cy="10" r="3" fill="#000"/>
    <rect x="14" y="14" width="4" height="14" fill="#000"/>
    <rect x="18" y="20" width="4" height="4" fill="#000"/>
    <rect x="18" y="26" width="6" height="4" fill="#000"/>
  </svg>`,
  door: `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect x="4" y="2" width="24" height="28" fill="#fff" stroke="#000" stroke-width="2"/>
    <rect x="8" y="6" width="16" height="8" stroke="#000" stroke-width="1" fill="none"/>
    <rect x="8" y="16" width="16" height="10" stroke="#000" stroke-width="1" fill="none"/>
    <circle cx="22" cy="16" r="2" fill="#000"/>
    <rect x="21" y="19" width="2" height="3" fill="#000"/>
  </svg>`,
  teleport: (id: number) => {
    const circledNumbers = ["①", "②", "③", "④", "⑤"];
    const num = circledNumbers[id - 1] || `${id}`;
    return `<svg viewBox="0 0 32 32" width="32" height="32">
      <circle cx="16" cy="16" r="12" fill="#fff" stroke="#000" stroke-width="2"/>
      <circle cx="16" cy="16" r="8" fill="none" stroke="#000" stroke-width="1"/>
      <text x="16" y="21" text-anchor="middle" font-size="14" font-weight="bold" fill="#000">${num}</text>
    </svg>`;
  },
};

// カメラの回転角度
const CAMERA_ROTATIONS: Record<string, number> = {
  up: 0,
  right: 90,
  down: 180,
  left: 270,
};

// テレポートの色
const TELEPORT_COLORS: Record<number, string> = {
  1: "#FF4444", // 赤
  2: "#4444FF", // 青
  3: "#44BB44", // 緑
  4: "#FFBB00", // 黄
  5: "#AA44AA", // 紫
};

// ゲーム要素の定義
const ELEMENTS = {
  EMPTY: "empty",
  CAT: "cat",
  GOAL: "goal",
  CAMERA: "camera",
  ONIGIRI: "onigiri",
  BLOCK: "block",
  WANWAN: "wanwan",
  WALL: "wall",
  PUSHABLE: "pushable",
  KEY: "key",
  DOOR: "door",
  TELEPORT: "teleport",
} as const;

type ElementType = (typeof ELEMENTS)[keyof typeof ELEMENTS];
type Direction = "up" | "right" | "down" | "left";
type WallSide = "top" | "right" | "bottom" | "left";

interface Walls {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
}

interface CellData {
  element: ElementType;
  direction: Direction;
  walls: Walls;
  teleportId?: number;
}

interface Stage {
  id: string;
  name: string;
  gridSize: number;
  board: CellData[][];
  pickaxeCount: number;
  requiredOnigiri: number;
  createdAt: string;
  records: { name: string; time: number; date: string }[];
}

// 方向定義（カメラ用）
const DIRECTIONS: Direction[] = ["up", "right", "down", "left"];
const DIRECTION_ARROWS: Record<Direction, string> = {
  up: "↑",
  right: "→",
  down: "↓",
  left: "←",
};
const DIRECTION_OFFSETS: Record<Direction, { dx: number; dy: number }> = {
  up: { dx: 0, dy: -1 },
  right: { dx: 1, dy: 0 },
  down: { dx: 0, dy: 1 },
  left: { dx: -1, dy: 0 },
};

// 移動方向
const MOVE_KEYS: Record<string, { dx: number; dy: number; dir: Direction }> = {
  ArrowUp: { dx: 0, dy: -1, dir: "up" },
  ArrowDown: { dx: 0, dy: 1, dir: "down" },
  ArrowLeft: { dx: -1, dy: 0, dir: "left" },
  ArrowRight: { dx: 1, dy: 0, dir: "right" },
  w: { dx: 0, dy: -1, dir: "up" },
  s: { dx: 0, dy: 1, dir: "down" },
  a: { dx: -1, dy: 0, dir: "left" },
  d: { dx: 1, dy: 0, dir: "right" },
};

// 壁の反対側
const OPPOSITE_WALL: Record<WallSide, WallSide> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

const WALL_FROM_DIR: Record<Direction, WallSide> = {
  up: "top",
  down: "bottom",
  left: "left",
  right: "right",
};

// セルコンポーネント
interface CellProps {
  element: ElementType;
  direction: Direction;
  walls: Walls;
  teleportId?: number;
  isHighlighted?: boolean;
  onClick?: () => void;
  onWallClick?: (side: WallSide) => void;
  isWanwanArea?: boolean;
  isEditing?: boolean;
}

const Cell = ({
  element,
  direction,
  walls,
  teleportId,
  isHighlighted,
  onClick,
  onWallClick,
  isWanwanArea,
  isEditing,
}: CellProps) => {
  const baseClasses =
    "w-14 h-14 flex items-center justify-center cursor-pointer transition-all relative box-border";
  const bgClass = isHighlighted
    ? "bg-red-400"
    : isWanwanArea
      ? "bg-orange-300"
      : "bg-green-400 hover:bg-green-300";

  // アイコンをレンダリング
  const renderIcon = () => {
    switch (element) {
      case ELEMENTS.CAT:
        return Icons.cat;
      case ELEMENTS.GOAL:
        return Icons.goal;
      case ELEMENTS.CAMERA:
        return Icons.camera(CAMERA_ROTATIONS[direction]);
      case ELEMENTS.ONIGIRI:
        return Icons.onigiri;
      case ELEMENTS.BLOCK:
        return Icons.block;
      case ELEMENTS.WANWAN:
        return Icons.wanwan;
      case ELEMENTS.WALL:
        return Icons.wall;
      case ELEMENTS.PUSHABLE:
        return Icons.pushable;
      case ELEMENTS.KEY:
        return Icons.key;
      case ELEMENTS.DOOR:
        return Icons.door;
      case ELEMENTS.TELEPORT:
        return Icons.teleport(
          TELEPORT_COLORS[teleportId || 1] || TELEPORT_COLORS[1],
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`${baseClasses} ${bgClass}`}
      onClick={onClick}
      style={{
        borderTop: "2px solid #2a7a2a",
        borderLeft: "2px solid #2a7a2a",
      }}
    >
      {/* 壁の表示（黒い太線） */}
      {walls.top && (
        <div
          className="absolute -top-1 left-0 right-0 h-2 bg-gray-900 cursor-pointer z-10"
          onClick={(e) => {
            e.stopPropagation();
            onWallClick?.("top");
          }}
        />
      )}
      {walls.right && (
        <div
          className="absolute top-0 -right-1 bottom-0 w-2 bg-gray-900 cursor-pointer z-10"
          onClick={(e) => {
            e.stopPropagation();
            onWallClick?.("right");
          }}
        />
      )}
      {walls.bottom && (
        <div
          className="absolute -bottom-1 left-0 right-0 h-2 bg-gray-900 cursor-pointer z-10"
          onClick={(e) => {
            e.stopPropagation();
            onWallClick?.("bottom");
          }}
        />
      )}
      {walls.left && (
        <div
          className="absolute top-0 -left-1 bottom-0 w-2 bg-gray-900 cursor-pointer z-10"
          onClick={(e) => {
            e.stopPropagation();
            onWallClick?.("left");
          }}
        />
      )}

      {/* 編集モードで壁を追加するためのヒットエリア */}
      {isEditing && (
        <>
          <div
            className="absolute top-0 left-2 right-2 h-3 cursor-pointer hover:bg-gray-600 opacity-0 hover:opacity-50 z-5"
            onClick={(e) => {
              e.stopPropagation();
              onWallClick?.("top");
            }}
          />
          <div
            className="absolute top-2 right-0 bottom-2 w-3 cursor-pointer hover:bg-gray-600 opacity-0 hover:opacity-50 z-5"
            onClick={(e) => {
              e.stopPropagation();
              onWallClick?.("right");
            }}
          />
          <div
            className="absolute bottom-0 left-2 right-2 h-3 cursor-pointer hover:bg-gray-600 opacity-0 hover:opacity-50 z-5"
            onClick={(e) => {
              e.stopPropagation();
              onWallClick?.("bottom");
            }}
          />
          <div
            className="absolute top-2 left-0 bottom-2 w-3 cursor-pointer hover:bg-gray-600 opacity-0 hover:opacity-50 z-5"
            onClick={(e) => {
              e.stopPropagation();
              onWallClick?.("left");
            }}
          />
        </>
      )}

      {/* セル内容 */}
      <div className="z-0">{renderIcon()}</div>
    </div>
  );
};

// パレットアイテム
interface PaletteItemProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  extra?: React.ReactNode;
  icon: React.ReactNode;
}

const PaletteItem = ({
  label,
  selected,
  onClick,
  extra,
  icon,
}: PaletteItemProps) => (
  <div
    className={`p-2 rounded cursor-pointer flex flex-col items-center min-w-16 ${
      selected
        ? "bg-green-500 border-2 border-green-800"
        : "bg-green-400 border-2 border-green-700 hover:bg-green-300"
    }`}
    onClick={onClick}
  >
    <div className="w-10 h-10 flex items-center justify-center">{icon}</div>
    <span className="text-xs mt-1 text-center text-gray-900 font-bold">
      {label}
    </span>
    {extra}
  </div>
);

// BGMトグルボタン
interface BgmToggleProps {
  isOn: boolean;
  onToggle: () => void;
}

const BgmToggle = ({ isOn, onToggle }: BgmToggleProps) => (
  <button
    className={`fixed top-4 right-4 z-50 p-2 rounded-lg border-4 transition-all ${
      isOn
        ? "bg-yellow-400 border-yellow-600 hover:bg-yellow-300"
        : "bg-gray-400 border-gray-600 hover:bg-gray-300"
    }`}
    onClick={onToggle}
    title={isOn ? "BGM OFF" : "BGM ON"}
  >
    {isOn ? Icons.soundOn : Icons.soundOff}
  </button>
);

const STORAGE_KEY = "puzzle_stages_v2";

// ストレージヘルパー
const storage = {
  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },
};

// メインゲームコンポーネント
export default function PuzzleGame() {
  const [mode, setMode] = useState<
    "menu" | "setup" | "create" | "testplay" | "play" | "browse"
  >("menu");
  const [gridSize, setGridSize] = useState(5);
  const [board, setBoard] = useState<CellData[][]>([]);
  const [selectedTool, setSelectedTool] = useState<ElementType | "wallLine">(
    ELEMENTS.CAT,
  );
  const [cameraDirection, setCameraDirection] = useState<Direction>("up");
  const [currentTeleportId, setCurrentTeleportId] = useState(1);
  const [pickaxeCount, setPickaxeCount] = useState(3);
  const [totalOnigiri, setTotalOnigiri] = useState(0);
  const [requiredOnigiri, setRequiredOnigiri] = useState(0);

  // プレイモード用
  const [catPosition, setCatPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [collectedOnigiri, setCollectedOnigiri] = useState(0);
  const [collectedKeys, setCollectedKeys] = useState(0);
  const [remainingPickaxe, setRemainingPickaxe] = useState(0);
  const [lastTeleportPos, setLastTeleportPos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">(
    "playing",
  );
  const [lossReason, setLossReason] = useState<"camera" | "wanwan" | null>(
    null,
  );
  const [playBoard, setPlayBoard] = useState<CellData[][]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [hasCleared, setHasCleared] = useState(false);

  // 保存されたステージ
  const [savedStages, setSavedStages] = useState<Stage[]>([]);
  const [currentStageId, setCurrentStageId] = useState<string | null>(null);
  const [stageName, setStageName] = useState("");
  const [lastDifficulty, setLastDifficulty] = useState<
    "easy" | "medium" | "hard" | null
  >(null);

  // BGM関連
  const [isBgmOn, setIsBgmOn] = useState(false);
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const playBgmRef = useRef<HTMLAudioElement | null>(null);

  // 効果音関連
  const seFailRef = useRef<HTMLAudioElement | null>(null);
  const seSuccessRef = useRef<HTMLAudioElement | null>(null);
  const seSelectRef = useRef<HTMLAudioElement | null>(null);
  const seMoveRef = useRef<HTMLAudioElement | null>(null);

  // 効果音を再生する関数
  const playSe = useCallback(
    (type: "fail" | "success" | "select" | "move") => {
      if (!isBgmOn) return;
      const refs = {
        fail: seFailRef,
        success: seSuccessRef,
        select: seSelectRef,
        move: seMoveRef,
      };
      const audio = refs[type].current;
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    },
    [isBgmOn],
  );

  // ストレージから読み込み
  useEffect(() => {
    const result = storage.get(STORAGE_KEY);
    if (result) {
      try {
        setSavedStages(JSON.parse(result));
      } catch {
        console.log("Failed to parse saved stages");
      }
    }
  }, []);

  // BGMと効果音の初期化
  useEffect(() => {
    bgmRef.current = new Audio("/bgm.mp3");
    bgmRef.current.loop = true;
    playBgmRef.current = new Audio("/play.mp3");
    playBgmRef.current.loop = true;

    // 効果音の初期化
    seFailRef.current = new Audio("/fail.wav");
    seSuccessRef.current = new Audio("/success.wav");
    seSelectRef.current = new Audio("/select.wav");
    seMoveRef.current = new Audio("/move.wav");

    return () => {
      bgmRef.current?.pause();
      playBgmRef.current?.pause();
    };
  }, []);

  // モードに応じたBGM切り替え
  useEffect(() => {
    const isPlayMode = mode === "testplay" || mode === "play";
    const menuBgm = bgmRef.current;
    const playBgm = playBgmRef.current;

    if (!menuBgm || !playBgm) return;

    // ゲームオーバーまたはクリア時はBGMを停止
    if (isPlayMode && (gameState === "lost" || gameState === "won")) {
      playBgm.pause();
      return;
    }

    if (isBgmOn) {
      if (isPlayMode) {
        menuBgm.pause();
        menuBgm.currentTime = 0;
        playBgm.play().catch(() => {});
      } else {
        playBgm.pause();
        playBgm.currentTime = 0;
        menuBgm.play().catch(() => {});
      }
    } else {
      menuBgm.pause();
      playBgm.pause();
    }
  }, [mode, isBgmOn, gameState]);

  // ボード初期化（壁データ含む）
  const initBoard = useCallback((size: number): CellData[][] => {
    const newBoard: CellData[][] = [];
    for (let y = 0; y < size; y++) {
      const row: CellData[] = [];
      for (let x = 0; x < size; x++) {
        row.push({
          element: ELEMENTS.EMPTY,
          direction: "up",
          walls: { top: false, right: false, bottom: false, left: false },
        });
      }
      newBoard.push(row);
    }
    return newBoard;
  }, []);

  // 新規作成開始
  const startCreate = () => {
    setBoard(initBoard(gridSize));
    setMode("create");
    setHasCleared(false);
    setTotalOnigiri(0);
    setRequiredOnigiri(0);
    setPickaxeCount(3);
    setStageName("");
    setLastDifficulty(null);
  };

  // ランダムステージ生成
  const generateRandomStage = (difficulty: "easy" | "medium" | "hard") => {
    const newBoard = initBoard(gridSize);
    const allPositions: { x: number; y: number }[] = [];

    // 全座標リストを作成
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        allPositions.push({ x, y });
      }
    }

    // シャッフル関数
    const shuffle = <T,>(arr: T[]): T[] => {
      const result = [...arr];
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
      }
      return result;
    };

    const shuffledPositions = shuffle(allPositions);
    let posIndex = 0;

    // 難易度設定
    const config = {
      easy: {
        onigiri: 1,
        cameras: 1,
        blocks: 1,
        walls: 0,
        wanwan: 0,
        pushable: 1,
        wallLines: 2,
        pickaxe: 2,
      },
      medium: {
        onigiri: 2,
        cameras: 2,
        blocks: 2,
        walls: 1,
        wanwan: 1,
        pushable: 2,
        wallLines: 4,
        pickaxe: 2,
      },
      hard: {
        onigiri: 3,
        cameras: 3,
        blocks: 3,
        walls: 2,
        wanwan: 1,
        pushable: 3,
        wallLines: 6,
        pickaxe: 3,
      },
    }[difficulty];

    // ネコを配置（左上寄り）
    const catPos = shuffledPositions[posIndex++];
    newBoard[catPos.y][catPos.x].element = ELEMENTS.CAT;

    // ゴールを配置（ネコから離れた位置）
    let goalPos = shuffledPositions[posIndex++];
    while (
      Math.abs(goalPos.x - catPos.x) + Math.abs(goalPos.y - catPos.y) <
      gridSize - 1
    ) {
      posIndex++;
      if (posIndex >= shuffledPositions.length) break;
      goalPos = shuffledPositions[posIndex - 1];
    }
    newBoard[goalPos.y][goalPos.x].element = ELEMENTS.GOAL;

    // おにぎりを配置
    for (
      let i = 0;
      i < config.onigiri && posIndex < shuffledPositions.length;
      i++
    ) {
      const pos = shuffledPositions[posIndex++];
      if (newBoard[pos.y][pos.x].element === ELEMENTS.EMPTY) {
        newBoard[pos.y][pos.x].element = ELEMENTS.ONIGIRI;
      }
    }

    // カメラを配置
    for (
      let i = 0;
      i < config.cameras && posIndex < shuffledPositions.length;
      i++
    ) {
      const pos = shuffledPositions[posIndex++];
      if (newBoard[pos.y][pos.x].element === ELEMENTS.EMPTY) {
        newBoard[pos.y][pos.x].element = ELEMENTS.CAMERA;
        newBoard[pos.y][pos.x].direction =
          DIRECTIONS[Math.floor(Math.random() * 4)];
      }
    }

    // こわせるブロックを配置
    for (
      let i = 0;
      i < config.blocks && posIndex < shuffledPositions.length;
      i++
    ) {
      const pos = shuffledPositions[posIndex++];
      if (newBoard[pos.y][pos.x].element === ELEMENTS.EMPTY) {
        newBoard[pos.y][pos.x].element = ELEMENTS.BLOCK;
      }
    }

    // こわれない壁を配置
    for (
      let i = 0;
      i < config.walls && posIndex < shuffledPositions.length;
      i++
    ) {
      const pos = shuffledPositions[posIndex++];
      if (newBoard[pos.y][pos.x].element === ELEMENTS.EMPTY) {
        newBoard[pos.y][pos.x].element = ELEMENTS.WALL;
      }
    }

    // ワンワンを配置
    for (
      let i = 0;
      i < config.wanwan && posIndex < shuffledPositions.length;
      i++
    ) {
      const pos = shuffledPositions[posIndex++];
      if (newBoard[pos.y][pos.x].element === ELEMENTS.EMPTY) {
        newBoard[pos.y][pos.x].element = ELEMENTS.WANWAN;
      }
    }

    // 動かせるブロックを配置
    for (
      let i = 0;
      i < config.pushable && posIndex < shuffledPositions.length;
      i++
    ) {
      const pos = shuffledPositions[posIndex++];
      if (newBoard[pos.y][pos.x].element === ELEMENTS.EMPTY) {
        newBoard[pos.y][pos.x].element = ELEMENTS.PUSHABLE;
      }
    }

    // 壁（線）をランダムに配置
    const wallSides: WallSide[] = ["top", "right", "bottom", "left"];
    for (let i = 0; i < config.wallLines; i++) {
      const x = Math.floor(Math.random() * gridSize);
      const y = Math.floor(Math.random() * gridSize);
      const side = wallSides[Math.floor(Math.random() * 4)];

      // 壁を追加
      newBoard[y][x].walls[side] = true;

      // 隣接セルの壁も同期
      const { dx, dy } =
        DIRECTION_OFFSETS[
          side === "top"
            ? "up"
            : side === "bottom"
              ? "down"
              : (side as Direction)
        ];
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
        newBoard[ny][nx].walls[OPPOSITE_WALL[side]] = true;
      }
    }

    setBoard(newBoard);
    setPickaxeCount(config.pickaxe);
    updateOnigiriCount(newBoard);
    setMode("create");
    setHasCleared(false);
    setStageName("");
    setLastDifficulty(difficulty);
  };

  // セルクリック
  const handleCellClick = (x: number, y: number) => {
    if (mode !== "create") return;
    if (selectedTool === "wallLine") return;

    const newBoard = board.map((row) =>
      row.map((cell) => ({ ...cell, walls: { ...cell.walls } })),
    );
    const currentCell = newBoard[y][x];

    if (selectedTool === ELEMENTS.EMPTY) {
      newBoard[y][x] = {
        ...currentCell,
        element: ELEMENTS.EMPTY,
        direction: "up",
      };
    } else if (selectedTool === ELEMENTS.CAMERA) {
      newBoard[y][x] = {
        ...currentCell,
        element: ELEMENTS.CAMERA,
        direction: cameraDirection,
      };
    } else if (
      selectedTool === ELEMENTS.CAT ||
      selectedTool === ELEMENTS.GOAL
    ) {
      if (currentCell.element === selectedTool) {
        newBoard[y][x] = {
          ...currentCell,
          element: ELEMENTS.EMPTY,
          direction: "up",
        };
      } else {
        for (let row = 0; row < newBoard.length; row++) {
          for (let col = 0; col < newBoard[row].length; col++) {
            if (newBoard[row][col].element === selectedTool) {
              newBoard[row][col] = {
                ...newBoard[row][col],
                element: ELEMENTS.EMPTY,
                direction: "up",
              };
            }
          }
        }
        newBoard[y][x] = {
          ...currentCell,
          element: selectedTool,
          direction: "up",
        };
      }
    } else if (selectedTool === ELEMENTS.TELEPORT) {
      // テレポートは同じIDかどうかで判定
      if (
        currentCell.element === ELEMENTS.TELEPORT &&
        currentCell.teleportId === currentTeleportId
      ) {
        newBoard[y][x] = {
          ...currentCell,
          element: ELEMENTS.EMPTY,
          direction: "up",
          teleportId: undefined,
        };
      } else {
        newBoard[y][x] = {
          ...currentCell,
          element: ELEMENTS.TELEPORT,
          direction: "up",
          teleportId: currentTeleportId,
        };
        // 同じIDのテレポートが2つ配置されたら次のIDに自動切り替え
        let sameIdCount = 0;
        for (const row of newBoard) {
          for (const cell of row) {
            if (
              cell.element === ELEMENTS.TELEPORT &&
              cell.teleportId === currentTeleportId
            ) {
              sameIdCount++;
            }
          }
        }
        if (sameIdCount >= 2 && currentTeleportId < 5) {
          setCurrentTeleportId(currentTeleportId + 1);
        }
      }
    } else {
      if (currentCell.element === selectedTool) {
        newBoard[y][x] = {
          ...currentCell,
          element: ELEMENTS.EMPTY,
          direction: "up",
        };
      } else {
        newBoard[y][x] = {
          ...currentCell,
          element: selectedTool,
          direction: "up",
        };
      }
    }

    setBoard(newBoard);
    updateOnigiriCount(newBoard);
  };

  // 壁クリック
  const handleWallClick = (x: number, y: number, side: WallSide) => {
    if (mode !== "create" || selectedTool !== "wallLine") return;

    const newBoard = board.map((row) =>
      row.map((cell) => ({ ...cell, walls: { ...cell.walls } })),
    );

    newBoard[y][x].walls[side] = !newBoard[y][x].walls[side];

    const dirKey =
      side === "top" ? "up" : side === "bottom" ? "down" : (side as Direction);
    const { dx, dy } = DIRECTION_OFFSETS[dirKey];
    const nx = x + dx;
    const ny = y + dy;

    if (nx >= 0 && nx < gridSize && ny >= 0 && ny < gridSize) {
      newBoard[ny][nx].walls[OPPOSITE_WALL[side]] = newBoard[y][x].walls[side];
    }

    setBoard(newBoard);
  };

  // おにぎり数を更新
  const updateOnigiriCount = (
    currentBoard: CellData[][],
    adjustRequired = true,
  ) => {
    let count = 0;
    for (const row of currentBoard) {
      for (const cell of row) {
        if (cell.element === ELEMENTS.ONIGIRI) count++;
      }
    }
    setTotalOnigiri(count);
    if (adjustRequired) {
      // 必要数が総数を超えないように調整
      setRequiredOnigiri((prev) => Math.min(prev, count) || count);
    }
  };

  // 壁があるかチェック
  const hasWall = useCallback(
    (
      currentBoard: CellData[][],
      x: number,
      y: number,
      direction: Direction,
    ) => {
      const wallSide = WALL_FROM_DIR[direction];
      return currentBoard[y][x].walls[wallSide];
    },
    [],
  );

  // カメラの監視範囲を計算
  const getCameraHighlights = useCallback(
    (currentBoard: CellData[][]) => {
      const highlights = new Set<string>();

      for (let y = 0; y < currentBoard.length; y++) {
        for (let x = 0; x < currentBoard[y].length; x++) {
          if (currentBoard[y][x].element === ELEMENTS.CAMERA) {
            const dir = currentBoard[y][x].direction;
            const { dx, dy } = DIRECTION_OFFSETS[dir];
            let cx = x;
            let cy = y;

            while (true) {
              if (hasWall(currentBoard, cx, cy, dir)) break;

              cx += dx;
              cy += dy;

              if (
                cx < 0 ||
                cx >= currentBoard[0].length ||
                cy < 0 ||
                cy >= currentBoard.length
              )
                break;

              const cell = currentBoard[cy][cx];

              if (
                cell.element === ELEMENTS.BLOCK ||
                cell.element === ELEMENTS.WANWAN ||
                cell.element === ELEMENTS.WALL ||
                cell.element === ELEMENTS.PUSHABLE
              ) {
                break;
              }

              highlights.add(`${cx},${cy}`);
            }
          }
        }
      }

      return highlights;
    },
    [hasWall],
  );

  // ワンワンの周囲を計算（壁を考慮した到達可能範囲）
  const getWanwanAreas = useCallback(
    (currentBoard: CellData[][]) => {
      const areas = new Set<string>();
      const gridHeight = currentBoard.length;
      const gridWidth = currentBoard[0]?.length || 0;

      // セル間を移動できるかチェック（壁・ブロックを考慮）
      const canMove = (
        fromX: number,
        fromY: number,
        toX: number,
        toY: number,
      ): boolean => {
        const dx = toX - fromX;
        const dy = toY - fromY;

        // 隣接セルのみ移動可能
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) return false;
        if (dx === 0 && dy === 0) return false;

        // 斜め移動は不可（上下左右のみ）
        if (dx !== 0 && dy !== 0) return false;

        // 範囲外チェック
        if (toX < 0 || toX >= gridWidth || toY < 0 || toY >= gridHeight)
          return false;

        // 移動方向を特定
        let dir: Direction;
        if (dy === -1) dir = "up";
        else if (dy === 1) dir = "down";
        else if (dx === -1) dir = "left";
        else dir = "right";

        // 壁（線）チェック
        if (hasWall(currentBoard, fromX, fromY, dir)) return false;

        // 移動先のブロックチェック（WALL, BLOCK, PUSHABLEは通過不可）
        const targetCell = currentBoard[toY][toX];
        if (
          targetCell.element === ELEMENTS.WALL ||
          targetCell.element === ELEMENTS.BLOCK ||
          targetCell.element === ELEMENTS.PUSHABLE
        ) {
          return false;
        }

        return true;
      };

      for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
          if (currentBoard[y][x].element === ELEMENTS.WANWAN) {
            // BFS（幅優先探索）で到達可能なセルを探索（3x3範囲内）
            const visited = new Set<string>();
            const queue: { x: number; y: number }[] = [{ x, y }];
            visited.add(`${x},${y}`);
            areas.add(`${x},${y}`);

            while (queue.length > 0) {
              const current = queue.shift()!;

              // 上下左右の隣接セルを探索
              const neighbors = [
                { nx: current.x, ny: current.y - 1 },
                { nx: current.x + 1, ny: current.y },
                { nx: current.x, ny: current.y + 1 },
                { nx: current.x - 1, ny: current.y },
              ];

              for (const { nx, ny } of neighbors) {
                const key = `${nx},${ny}`;

                // 3x3範囲内かチェック
                if (Math.abs(nx - x) > 1 || Math.abs(ny - y) > 1) continue;

                // 未訪問で移動可能なら追加
                if (
                  !visited.has(key) &&
                  canMove(current.x, current.y, nx, ny)
                ) {
                  visited.add(key);
                  areas.add(key);
                  queue.push({ x: nx, y: ny });
                }
              }
            }
          }
        }
      }

      return areas;
    },
    [hasWall],
  );

  // テストプレイ開始
  const startTestPlay = () => {
    let catFound = false;
    let goalFound = false;
    let catPos: { x: number; y: number } | null = null;

    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        if (board[y][x].element === ELEMENTS.CAT) {
          catFound = true;
          catPos = { x, y };
        }
        if (board[y][x].element === ELEMENTS.GOAL) goalFound = true;
      }
    }

    if (!catFound) {
      alert("ネコを配置してください！");
      return;
    }
    if (!goalFound) {
      alert("ゴールを配置してください！");
      return;
    }

    const newPlayBoard = board.map((row) =>
      row.map((cell) => ({
        ...cell,
        walls: { ...cell.walls },
      })),
    );
    setPlayBoard(newPlayBoard);
    setCatPosition(catPos);
    setCollectedOnigiri(0);
    setCollectedKeys(0);
    setRemainingPickaxe(pickaxeCount);
    setLastTeleportPos(null);
    setGameState("playing");
    setLossReason(null);
    setStartTime(Date.now());
    setElapsedTime(0);
    setMode("testplay");
  };

  // タイマー更新
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (
      (mode === "testplay" || mode === "play") &&
      gameState === "playing" &&
      startTime
    ) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [mode, gameState, startTime]);

  // プレイヤー移動処理
  const movePlayer = useCallback(
    (dir: Direction) => {
      if (
        (mode !== "testplay" && mode !== "play") ||
        gameState !== "playing" ||
        !catPosition
      )
        return;

      const { dx, dy } = DIRECTION_OFFSETS[dir];

      if (hasWall(playBoard, catPosition.x, catPosition.y, dir)) return;

      const newX = catPosition.x + dx;
      const newY = catPosition.y + dy;

      if (
        newX < 0 ||
        newX >= playBoard[0].length ||
        newY < 0 ||
        newY >= playBoard.length
      )
        return;

      const targetCell = playBoard[newY][newX];

      // 壁ブロック（通れない）
      if (targetCell.element === ELEMENTS.WALL) return;

      // ドア（鍵があれば開く）
      if (targetCell.element === ELEMENTS.DOOR) {
        if (collectedKeys > 0) {
          setCollectedKeys((prev) => prev - 1);
          const newBoard = playBoard.map((row) =>
            row.map((cell) => ({ ...cell, walls: { ...cell.walls } })),
          );
          newBoard[newY][newX] = {
            ...newBoard[newY][newX],
            element: ELEMENTS.EMPTY,
          };
          setPlayBoard(newBoard);
        }
        return;
      }

      // こわせるブロック（つるはしで壊す）
      if (targetCell.element === ELEMENTS.BLOCK) {
        if (remainingPickaxe > 0) {
          setRemainingPickaxe((prev) => prev - 1);
          const newBoard = playBoard.map((row) =>
            row.map((cell) => ({ ...cell, walls: { ...cell.walls } })),
          );
          newBoard[newY][newX] = {
            ...newBoard[newY][newX],
            element: ELEMENTS.EMPTY,
          };
          setPlayBoard(newBoard);
        }
        return;
      }

      // 動かせるブロック（押す）
      if (targetCell.element === ELEMENTS.PUSHABLE) {
        // 押し先の座標を計算
        const pushX = newX + dx;
        const pushY = newY + dy;

        // 押し先が範囲外なら押せない
        if (
          pushX < 0 ||
          pushX >= playBoard[0].length ||
          pushY < 0 ||
          pushY >= playBoard.length
        ) {
          return;
        }

        // 押し先に壁（線）があれば押せない
        if (hasWall(playBoard, newX, newY, dir)) {
          return;
        }

        const pushTargetCell = playBoard[pushY][pushX];

        // 押し先に障害物があれば押せない
        const blockingElements: ElementType[] = [
          ELEMENTS.BLOCK,
          ELEMENTS.WALL,
          ELEMENTS.PUSHABLE,
          ELEMENTS.CAMERA,
          ELEMENTS.WANWAN,
          ELEMENTS.GOAL,
          ELEMENTS.ONIGIRI,
          ELEMENTS.KEY,
          ELEMENTS.DOOR,
          ELEMENTS.TELEPORT,
        ];

        if (blockingElements.includes(pushTargetCell.element)) {
          return;
        }

        // ブロックを押す
        const newBoard = playBoard.map((row) =>
          row.map((cell) => ({ ...cell, walls: { ...cell.walls } })),
        );

        // PUSHABLEを移動先に配置
        newBoard[pushY][pushX] = {
          ...newBoard[pushY][pushX],
          element: ELEMENTS.PUSHABLE,
        };

        // 元の位置を空に
        newBoard[newY][newX] = {
          ...newBoard[newY][newX],
          element: ELEMENTS.EMPTY,
        };

        // 猫を移動（テレポート上にいた場合は復元）
        const prevCell = newBoard[catPosition.y][catPosition.x];
        newBoard[catPosition.y][catPosition.x] = {
          ...prevCell,
          element: prevCell.teleportId ? ELEMENTS.TELEPORT : ELEMENTS.EMPTY,
        };
        newBoard[newY][newX] = {
          ...newBoard[newY][newX],
          element: ELEMENTS.CAT,
        };

        setPlayBoard(newBoard);
        setCatPosition({ x: newX, y: newY });

        // カメラ・ワンワンチェック
        const highlights = getCameraHighlights(newBoard);
        if (highlights.has(`${newX},${newY}`)) {
          setGameState("lost");
          setLossReason("camera");
          playSe("fail");
          return;
        }

        const wanwanAreas = getWanwanAreas(newBoard);
        if (wanwanAreas.has(`${newX},${newY}`)) {
          setGameState("lost");
          setLossReason("wanwan");
          playSe("fail");
        }
        return;
      }

      const newBoard = playBoard.map((row) =>
        row.map((cell) => ({ ...cell, walls: { ...cell.walls } })),
      );

      // 猫の元の位置を処理（テレポート上にいた場合は復元）
      const prevCatCell = newBoard[catPosition.y][catPosition.x];
      newBoard[catPosition.y][catPosition.x] = {
        ...prevCatCell,
        element: prevCatCell.teleportId ? ELEMENTS.TELEPORT : ELEMENTS.EMPTY,
      };

      let newCollected = collectedOnigiri;
      if (targetCell.element === ELEMENTS.ONIGIRI) {
        newCollected++;
        setCollectedOnigiri(newCollected);
      }

      // 鍵を収集
      if (targetCell.element === ELEMENTS.KEY) {
        setCollectedKeys((prev) => prev + 1);
      }

      if (targetCell.element === ELEMENTS.GOAL) {
        if (newCollected >= requiredOnigiri) {
          setGameState("won");
          setHasCleared(true);
          setElapsedTime(Date.now() - (startTime || 0));
          setCatPosition({ x: newX, y: newY });
          newBoard[newY][newX] = {
            ...newBoard[newY][newX],
            element: ELEMENTS.CAT,
          };
          setPlayBoard(newBoard);
          playSe("success");
          return;
        }
      }

      newBoard[newY][newX] = { ...newBoard[newY][newX], element: ELEMENTS.CAT };
      setPlayBoard(newBoard);
      setCatPosition({ x: newX, y: newY });

      // カメラの監視範囲チェック
      const highlights = getCameraHighlights(newBoard);
      if (highlights.has(`${newX},${newY}`)) {
        setGameState("lost");
        setLossReason("camera");
        playSe("fail");
        return;
      }

      // ワンワンのエリアチェック
      const wanwanAreas = getWanwanAreas(newBoard);
      if (wanwanAreas.has(`${newX},${newY}`)) {
        setGameState("lost");
        setLossReason("wanwan");
        playSe("fail");
        return;
      }

      // テレポートの処理
      if (
        targetCell.element === ELEMENTS.TELEPORT &&
        targetCell.teleportId &&
        !(lastTeleportPos?.x === newX && lastTeleportPos?.y === newY)
      ) {
        // ペアとなるテレポートを探す
        let pairedTeleport: { x: number; y: number } | null = null;
        for (let py = 0; py < newBoard.length; py++) {
          for (let px = 0; px < newBoard[py].length; px++) {
            if (px === newX && py === newY) continue;
            const cell = newBoard[py][px];
            if (
              cell.element === ELEMENTS.TELEPORT &&
              cell.teleportId === targetCell.teleportId
            ) {
              pairedTeleport = { x: px, y: py };
              break;
            }
          }
          if (pairedTeleport) break;
        }

        if (pairedTeleport) {
          // まず入口テレポートに猫を表示
          newBoard[newY][newX] = {
            ...newBoard[newY][newX],
            element: ELEMENTS.CAT,
          };
          setPlayBoard([...newBoard.map((row) => [...row])]);
          setCatPosition({ x: newX, y: newY });

          // 少し遅延してからワープ
          const warpDelay = 150;
          setTimeout(() => {
            // 入口テレポートを復元
            newBoard[newY][newX] = {
              ...newBoard[newY][newX],
              element: ELEMENTS.TELEPORT,
              teleportId: targetCell.teleportId,
            };
            // 出口テレポートに猫を移動
            newBoard[pairedTeleport.y][pairedTeleport.x] = {
              ...newBoard[pairedTeleport.y][pairedTeleport.x],
              element: ELEMENTS.CAT,
            };
            setPlayBoard([...newBoard.map((row) => [...row])]);
            setCatPosition({ x: pairedTeleport.x, y: pairedTeleport.y });
            setLastTeleportPos({ x: pairedTeleport.x, y: pairedTeleport.y });

            // テレポート先でのカメラ・ワンワンチェック
            const teleportHighlights = getCameraHighlights(newBoard);
            if (
              teleportHighlights.has(`${pairedTeleport.x},${pairedTeleport.y}`)
            ) {
              setGameState("lost");
              setLossReason("camera");
              playSe("fail");
              return;
            }
            const teleportWanwanAreas = getWanwanAreas(newBoard);
            if (
              teleportWanwanAreas.has(`${pairedTeleport.x},${pairedTeleport.y}`)
            ) {
              setGameState("lost");
              setLossReason("wanwan");
              playSe("fail");
              return;
            }
          }, warpDelay);
          return;
        }
      } else if (targetCell.element !== ELEMENTS.TELEPORT) {
        // テレポート以外のセルに移動した場合、lastTeleportPosをクリア
        setLastTeleportPos(null);
      }
    },
    [
      mode,
      gameState,
      catPosition,
      playBoard,
      remainingPickaxe,
      collectedOnigiri,
      collectedKeys,
      requiredOnigiri,
      lastTeleportPos,
      getCameraHighlights,
      getWanwanAreas,
      startTime,
      hasWall,
      playSe,
    ],
  );

  // キーボード操作
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const move = MOVE_KEYS[e.key];
      if (!move) return;
      e.preventDefault();
      movePlayer(move.dir);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [movePlayer]);

  // ステージ保存
  const saveStage = () => {
    if (!stageName.trim()) {
      alert("ステージ名を入力してください");
      return;
    }

    const stage: Stage = {
      id: Date.now().toString(),
      name: stageName,
      gridSize,
      board,
      pickaxeCount,
      requiredOnigiri,
      createdAt: new Date().toISOString(),
      records: [],
    };

    const newStages = [...savedStages, stage];
    setSavedStages(newStages);

    if (storage.set(STORAGE_KEY, JSON.stringify(newStages))) {
      alert("ステージを保存しました！");
      setMode("menu");
    } else {
      alert("保存に失敗しました");
    }
  };

  // ステージ読み込み
  const loadStage = (stage: Stage) => {
    setBoard(stage.board);
    setGridSize(stage.gridSize);
    setPickaxeCount(stage.pickaxeCount);
    setRequiredOnigiri(stage.requiredOnigiri);
    setCurrentStageId(stage.id);

    // totalOnigiriを計算
    let onigiriCount = 0;
    let catPos: { x: number; y: number } | null = null;
    for (let y = 0; y < stage.board.length; y++) {
      for (let x = 0; x < stage.board[y].length; x++) {
        if (stage.board[y][x].element === ELEMENTS.CAT) {
          catPos = { x, y };
        }
        if (stage.board[y][x].element === ELEMENTS.ONIGIRI) {
          onigiriCount++;
        }
      }
    }
    setTotalOnigiri(onigiriCount);

    setPlayBoard(
      stage.board.map((row) =>
        row.map((cell) => ({
          ...cell,
          walls: { ...cell.walls },
        })),
      ),
    );
    setCatPosition(catPos);
    setCollectedOnigiri(0);
    setCollectedKeys(0);
    setRemainingPickaxe(stage.pickaxeCount);
    setLastTeleportPos(null);
    setGameState("playing");
    setLossReason(null);
    setStartTime(Date.now());
    setElapsedTime(0);
    setMode("play");
  };

  // 記録保存
  const saveRecord = () => {
    const playerName = prompt("名前を入力してください");
    if (!playerName) return;

    const newStages = savedStages.map((stage) => {
      if (stage.id === currentStageId) {
        return {
          ...stage,
          records: [
            ...stage.records,
            {
              name: playerName,
              time: elapsedTime,
              date: new Date().toISOString(),
            },
          ]
            .sort((a, b) => a.time - b.time)
            .slice(0, 10),
        };
      }
      return stage;
    });

    setSavedStages(newStages);

    if (storage.set(STORAGE_KEY, JSON.stringify(newStages))) {
      alert("記録を保存しました！");
    } else {
      alert("保存に失敗しました");
    }
  };

  // 時間フォーマット
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
  };

  // 印刷機能
  const handlePrint = (stage?: Stage) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("ポップアップがブロックされました。許可してください。");
      return;
    }

    const targetBoard = stage?.board ?? board;
    const targetPickaxeCount = stage?.pickaxeCount ?? pickaxeCount;
    const targetRequiredOnigiri = stage?.requiredOnigiri ?? requiredOnigiri;

    const cellSize = 60;
    const boardHtml = targetBoard
      .map(
        (row, y) =>
          `<tr>${row
            .map((cell, x) => {
              let content = "";
              if (cell.element === ELEMENTS.CAT) content = PrintIcons.cat;
              else if (cell.element === ELEMENTS.GOAL)
                content = PrintIcons.goal;
              else if (cell.element === ELEMENTS.CAMERA)
                content = PrintIcons.camera(cell.direction);
              else if (cell.element === ELEMENTS.ONIGIRI)
                content = PrintIcons.onigiri;
              else if (cell.element === ELEMENTS.BLOCK)
                content = PrintIcons.block;
              else if (cell.element === ELEMENTS.WANWAN)
                content = PrintIcons.wanwan;
              else if (cell.element === ELEMENTS.WALL)
                content = PrintIcons.wall;
              else if (cell.element === ELEMENTS.PUSHABLE)
                content = PrintIcons.pushable;
              else if (cell.element === ELEMENTS.KEY) content = PrintIcons.key;
              else if (cell.element === ELEMENTS.DOOR)
                content = PrintIcons.door;
              else if (cell.element === ELEMENTS.TELEPORT)
                content = PrintIcons.teleport(cell.teleportId || 1);

              const borderTop = cell.walls.top
                ? "3px solid black"
                : "1px solid #ccc";
              const borderRight = cell.walls.right
                ? "3px solid black"
                : "1px solid #ccc";
              const borderBottom = cell.walls.bottom
                ? "3px solid black"
                : "1px solid #ccc";
              const borderLeft = cell.walls.left
                ? "3px solid black"
                : "1px solid #ccc";

              return `<td style="width:${cellSize}px;height:${cellSize}px;text-align:center;vertical-align:middle;font-size:20px;border-top:${borderTop};border-right:${borderRight};border-bottom:${borderBottom};border-left:${borderLeft};">${content}</td>`;
            })
            .join("")}</tr>`,
      )
      .join("");

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>ネコパズル - 印刷用</title>
        <style>
          body { font-family: sans-serif; padding: 20px; }
          h1 { text-align: center; margin-bottom: 10px; }
          .info { text-align: center; margin-bottom: 20px; }
          table { border-collapse: collapse; margin: 0 auto 20px; }
          td { padding: 0; }
          td svg { display: block; margin: auto; }
          .legend { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-top: 20px; padding: 15px; border: 1px solid #ccc; }
          .legend-item { display: flex; align-items: center; gap: 8px; }
          .legend-item svg { width: 24px; height: 24px; }
          .rules { margin-top: 20px; padding: 15px; border: 1px solid #ccc; }
          .rules h3 { margin-top: 0; }
          .rules ul { margin: 0; padding-left: 20px; }
          @media print {
            body { padding: 10px; }
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>ネコパズル</h1>
        <div class="info">
          <p>おにぎり: ${targetRequiredOnigiri}個 ｜ つるはし: ${targetPickaxeCount}本</p>
        </div>
        <table>${boardHtml}</table>
        <div class="legend">
          <div class="legend-item">${PrintIcons.cat} ネコ（スタート）</div>
          <div class="legend-item">${PrintIcons.goal} ゴール</div>
          <div class="legend-item">${PrintIcons.camera("up")} カメラ（レンズの方向を監視）</div>
          <div class="legend-item">${PrintIcons.onigiri} おにぎり</div>
          <div class="legend-item">${PrintIcons.block} こわせるブロック</div>
          <div class="legend-item">${PrintIcons.wall} こわれない壁</div>
          <div class="legend-item">${PrintIcons.wanwan} ワンワン（周囲に近づけない）</div>
          <div class="legend-item">${PrintIcons.pushable} 動かせるブロック（押せる）</div>
          <div class="legend-item">${PrintIcons.key} 鍵（ドアを開ける）</div>
          <div class="legend-item">${PrintIcons.door} ドア（鍵で開く）</div>
          <div class="legend-item">${PrintIcons.teleport(1)} テレポート（同じ番号同士でワープ）</div>
          <div class="legend-item"><span style="border:3px solid black;width:20px;height:20px;display:inline-block;"></span> 壁（通れない）</div>
        </div>
        <div class="rules">
          <h3>ルール</h3>
          <ul>
            <li>ネコを上下左右に動かしてゴールを目指します</li>
            <li>おにぎりをすべて集めてからゴールしてください</li>
            <li>カメラの監視範囲（レンズの方向の直線）に入るとアウト！</li>
            <li>つるはしでこわせるブロックを壊せます（${targetPickaxeCount}回まで）</li>
            <li>ワンワンの周囲1マスには近づけません</li>
            <li>動かせるブロックは押して動かせます</li>
            <li>鍵を取るとドアを開けられます（鍵1つでドア1つ）</li>
            <li>テレポートに乗ると同じ番号のテレポートにワープします</li>
            <li>太い黒線の壁は通り抜けられません</li>
          </ul>
        </div>
        <div style="text-align:center;margin-top:20px;">
          <button onclick="window.close()" style="padding:10px 20px;font-size:16px;cursor:pointer;margin-right:10px;background:#ccc;border:1px solid #999;border-radius:4px;">戻る</button>
          <button onclick="window.print()" style="padding:10px 20px;font-size:16px;cursor:pointer;background:#4CAF50;color:white;border:1px solid #388E3C;border-radius:4px;">印刷する</button>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  // カメラハイライト計算
  const cameraHighlights =
    mode === "testplay" || mode === "play"
      ? getCameraHighlights(playBoard)
      : new Set<string>();
  const wanwanAreas =
    mode === "testplay" || mode === "play"
      ? getWanwanAreas(playBoard)
      : getWanwanAreas(board);

  // メニュー画面
  if (mode === "menu") {
    return (
      <div className="min-h-screen bg-green-500 p-4">
        <BgmToggle isOn={isBgmOn} onToggle={() => setIsBgmOn(!isBgmOn)} />
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-4 mb-2">
              <div className="w-16 h-16">{Icons.cat}</div>
              <h1
                className="text-3xl font-bold text-white drop-shadow-lg"
                style={{ textShadow: "2px 2px 0 #1a5a1a" }}
              >
                ネコGo!
              </h1>
              <div className="w-16 h-16">{Icons.goal}</div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              className="w-full py-4 bg-yellow-400 text-gray-900 rounded-lg text-xl font-bold hover:bg-yellow-300 transition shadow-lg border-4 border-yellow-600"
              onClick={() => {
                playSe("select");
                setMode("setup");
              }}
            >
              ✏️ ステージを作る
            </button>

            <button
              className="w-full py-4 bg-blue-400 text-white rounded-lg text-xl font-bold hover:bg-blue-300 transition shadow-lg border-4 border-blue-600"
              onClick={() => {
                playSe("select");
                setMode("browse");
              }}
            >
              🎮 ステージを遊ぶ
            </button>
          </div>

          <div className="mt-8 p-4 bg-green-400 rounded-lg shadow border-4 border-green-700">
            <h2 className="font-bold mb-3 text-center text-gray-900">遊び方</h2>
            <div className="text-sm text-gray-800 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">⌨️</span>
                <span>矢印キー or WASDでネコを操作</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex-shrink-0">{Icons.onigiri}</div>
                <span>おにぎりをすべて集めてゴールを目指す</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex-shrink-0">{Icons.camera(0)}</div>
                <span>監視カメラに見つかるとアウト！</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex-shrink-0">{Icons.pickaxe}</div>
                <span>つるはしでブロックを壊せる</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex-shrink-0">{Icons.wanwan}</div>
                <span>ワンワンの周りは通れない！</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex-shrink-0">{Icons.pushable}</div>
                <span>木箱は押して動かせる！</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex-shrink-0">{Icons.wall}</div>
                <span>こわれないかべは通り抜けられない！</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex-shrink-0">{Icons.key}</div>
                <span>鍵を取るとドアを開けられる！</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 flex-shrink-0">
                  {Icons.teleport(TELEPORT_COLORS[1])}
                </div>
                <span>テレポートでワープ！</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // セットアップ画面
  if (mode === "setup") {
    return (
      <div className="min-h-screen bg-green-500 p-4">
        <BgmToggle isOn={isBgmOn} onToggle={() => setIsBgmOn(!isBgmOn)} />
        <div className="max-w-md mx-auto">
          <h2
            className="text-2xl font-bold text-center mb-6 text-white"
            style={{ textShadow: "2px 2px 0 #1a5a1a" }}
          >
            マス目を選択
          </h2>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {[4, 5, 6, 7, 8].map((size) => (
              <button
                key={size}
                className={`py-4 rounded-lg text-xl font-bold transition border-4 ${
                  gridSize === size
                    ? "bg-yellow-400 text-gray-900 border-yellow-600"
                    : "bg-green-400 text-gray-900 hover:bg-green-300 border-green-700"
                }`}
                onClick={() => setGridSize(size)}
              >
                {size}x{size}
              </button>
            ))}
          </div>

          {/* ランダム生成 */}
          <div className="bg-green-400 p-4 rounded-lg mb-6 border-4 border-green-700">
            <h3 className="text-center font-bold text-gray-900 mb-3">
              🎲 ランダム生成
            </h3>
            <div className="flex gap-2">
              <button
                className="flex-1 py-2 bg-blue-300 text-gray-900 rounded-lg font-bold hover:bg-blue-200 border-2 border-blue-500"
                onClick={() => {
                  playSe("select");
                  generateRandomStage("easy");
                }}
              >
                かんたん
              </button>
              <button
                className="flex-1 py-2 bg-yellow-300 text-gray-900 rounded-lg font-bold hover:bg-yellow-200 border-2 border-yellow-500"
                onClick={() => {
                  playSe("select");
                  generateRandomStage("medium");
                }}
              >
                ふつう
              </button>
              <button
                className="flex-1 py-2 bg-red-300 text-gray-900 rounded-lg font-bold hover:bg-red-200 border-2 border-red-500"
                onClick={() => {
                  playSe("select");
                  generateRandomStage("hard");
                }}
              >
                むずかしい
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              className="flex-1 py-3 bg-gray-400 text-gray-900 rounded-lg font-bold hover:bg-gray-300 border-4 border-gray-600"
              onClick={() => {
                playSe("select");
                setMode("menu");
              }}
            >
              戻る
            </button>
            <button
              className="flex-1 py-3 bg-yellow-400 text-gray-900 rounded-lg font-bold hover:bg-yellow-300 border-4 border-yellow-600"
              onClick={() => {
                playSe("select");
                startCreate();
              }}
            >
              白紙から作成
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ブラウズ画面
  if (mode === "browse") {
    return (
      <div className="min-h-screen bg-green-500 p-4">
        <BgmToggle isOn={isBgmOn} onToggle={() => setIsBgmOn(!isBgmOn)} />
        <div className="max-w-md mx-auto">
          <h2
            className="text-2xl font-bold text-center mb-6 text-white"
            style={{ textShadow: "2px 2px 0 #1a5a1a" }}
          >
            ステージ一覧
          </h2>

          {savedStages.length === 0 ? (
            <p className="text-center text-white">まだステージがありません</p>
          ) : (
            <div className="space-y-3">
              {savedStages.map((stage) => (
                <div
                  key={stage.id}
                  className="bg-green-400 p-4 rounded-lg shadow border-4 border-green-700"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-gray-900">{stage.name}</h3>
                      <p className="text-sm text-gray-700">
                        {stage.gridSize}x{stage.gridSize}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-2 bg-white text-gray-900 rounded hover:bg-gray-100 border-2 border-gray-400 font-bold text-sm"
                        onClick={() => handlePrint(stage)}
                      >
                        🖨️
                      </button>
                      <button
                        className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-300 border-2 border-blue-600 font-bold"
                        onClick={() => {
                          playSe("select");
                          loadStage(stage);
                        }}
                      >
                        プレイ
                      </button>
                    </div>
                  </div>
                  {stage.records.length > 0 && (
                    <div className="mt-2 text-sm">
                      <p className="text-gray-700">
                        🏆 ベスト: {formatTime(stage.records[0].time)} (
                        {stage.records[0].name})
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <button
            className="w-full mt-6 py-3 bg-gray-400 text-gray-900 rounded-lg font-bold hover:bg-gray-300 border-4 border-gray-600"
            onClick={() => {
              playSe("select");
              setMode("menu");
            }}
          >
            戻る
          </button>
        </div>
      </div>
    );
  }

  // 作成画面
  if (mode === "create") {
    return (
      <div className="min-h-screen bg-green-500 p-2">
        <BgmToggle isOn={isBgmOn} onToggle={() => setIsBgmOn(!isBgmOn)} />
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-xl font-bold text-center mb-2 text-white"
            style={{ textShadow: "2px 2px 0 #1a5a1a" }}
          >
            ステージ作成
          </h2>

          {/* パレット */}
          <div className="bg-green-600 p-2 rounded-lg shadow mb-2 border-4 border-green-800">
            <div className="flex flex-wrap gap-2 justify-center">
              <PaletteItem
                label="消しゴム"
                icon={Icons.eraser}
                selected={selectedTool === ELEMENTS.EMPTY}
                onClick={() => setSelectedTool(ELEMENTS.EMPTY)}
              />
              <PaletteItem
                label="ネコ"
                icon={Icons.cat}
                selected={selectedTool === ELEMENTS.CAT}
                onClick={() => setSelectedTool(ELEMENTS.CAT)}
              />
              <PaletteItem
                label="ゴール"
                icon={Icons.goal}
                selected={selectedTool === ELEMENTS.GOAL}
                onClick={() => setSelectedTool(ELEMENTS.GOAL)}
              />
              <PaletteItem
                label="カメラ"
                icon={Icons.camera(CAMERA_ROTATIONS[cameraDirection])}
                selected={selectedTool === ELEMENTS.CAMERA}
                onClick={() => setSelectedTool(ELEMENTS.CAMERA)}
                extra={
                  <div className="flex gap-1 mt-1">
                    {DIRECTIONS.map((dir) => (
                      <button
                        key={dir}
                        className={`text-xs px-1.5 py-0.5 rounded font-bold ${cameraDirection === dir ? "bg-yellow-400 text-gray-900" : "bg-green-300 text-gray-700"}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCameraDirection(dir);
                        }}
                      >
                        {DIRECTION_ARROWS[dir]}
                      </button>
                    ))}
                  </div>
                }
              />
              <PaletteItem
                label="おにぎり"
                icon={Icons.onigiri}
                selected={selectedTool === ELEMENTS.ONIGIRI}
                onClick={() => setSelectedTool(ELEMENTS.ONIGIRI)}
              />
              <PaletteItem
                label="壁（線）"
                icon={
                  <svg viewBox="0 0 32 32" className="w-8 h-8">
                    <rect x="4" y="12" width="24" height="8" fill="#333" />
                  </svg>
                }
                selected={selectedTool === "wallLine"}
                onClick={() => setSelectedTool("wallLine")}
              />
              <PaletteItem
                label="こわれない壁"
                icon={Icons.wall}
                selected={selectedTool === ELEMENTS.WALL}
                onClick={() => setSelectedTool(ELEMENTS.WALL)}
              />
              <PaletteItem
                label="こわせる"
                icon={Icons.block}
                selected={selectedTool === ELEMENTS.BLOCK}
                onClick={() => setSelectedTool(ELEMENTS.BLOCK)}
              />
              <PaletteItem
                label="ワンワン"
                icon={Icons.wanwan}
                selected={selectedTool === ELEMENTS.WANWAN}
                onClick={() => setSelectedTool(ELEMENTS.WANWAN)}
              />
              <PaletteItem
                label="動かせる"
                icon={Icons.pushable}
                selected={selectedTool === ELEMENTS.PUSHABLE}
                onClick={() => setSelectedTool(ELEMENTS.PUSHABLE)}
              />
              <PaletteItem
                label="鍵"
                icon={Icons.key}
                selected={selectedTool === ELEMENTS.KEY}
                onClick={() => setSelectedTool(ELEMENTS.KEY)}
              />
              <PaletteItem
                label="ドア"
                icon={Icons.door}
                selected={selectedTool === ELEMENTS.DOOR}
                onClick={() => setSelectedTool(ELEMENTS.DOOR)}
              />
              <PaletteItem
                label="テレポート"
                icon={Icons.teleport(TELEPORT_COLORS[currentTeleportId])}
                selected={selectedTool === ELEMENTS.TELEPORT}
                onClick={() => setSelectedTool(ELEMENTS.TELEPORT)}
                extra={
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((id) => (
                      <button
                        key={id}
                        className={`text-xs px-1.5 py-0.5 rounded font-bold ${currentTeleportId === id ? "bg-yellow-400 text-gray-900" : "bg-green-300 text-gray-700"}`}
                        style={{
                          backgroundColor:
                            currentTeleportId === id
                              ? TELEPORT_COLORS[id]
                              : undefined,
                          color: currentTeleportId === id ? "#fff" : undefined,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentTeleportId(id);
                        }}
                      >
                        {id}
                      </button>
                    ))}
                  </div>
                }
              />
            </div>

            {/* つるはし設定 */}
            <div className="flex items-center justify-center gap-4 mt-2 pt-2 border-t border-green-700">
              <div className="flex items-center gap-2 text-white">
                {Icons.pickaxe}
                <span>つるはし:</span>
              </div>
              <button
                className="px-2 py-1 bg-green-400 text-gray-900 rounded hover:bg-green-300 font-bold"
                onClick={() => setPickaxeCount(Math.max(0, pickaxeCount - 1))}
              >
                -
              </button>
              <span className="font-bold w-6 text-center text-white">
                {pickaxeCount}
              </span>
              <button
                className="px-2 py-1 bg-green-400 text-gray-900 rounded hover:bg-green-300 font-bold"
                onClick={() => setPickaxeCount(pickaxeCount + 1)}
              >
                +
              </button>
            </div>

            {selectedTool === "wallLine" && (
              <p className="text-center text-sm text-yellow-300 mt-2">
                💡 セルの端（上下左右）をクリックして壁を配置/削除
              </p>
            )}
          </div>

          {/* ボード */}
          <div className="flex justify-center mb-2">
            <div className="bg-green-700 p-1 rounded-lg inline-block border-4 border-green-900">
              <div
                className="inline-block"
                style={{
                  borderRight: "2px solid #2a7a2a",
                  borderBottom: "2px solid #2a7a2a",
                }}
              >
                {board.map((row, y) => (
                  <div key={y} className="flex">
                    {row.map((cell, x) => (
                      <Cell
                        key={`${x}-${y}`}
                        element={cell.element}
                        direction={cell.direction}
                        walls={cell.walls}
                        teleportId={cell.teleportId}
                        isWanwanArea={
                          wanwanAreas.has(`${x},${y}`) &&
                          cell.element !== ELEMENTS.WANWAN
                        }
                        onClick={() => handleCellClick(x, y)}
                        onWallClick={(side) => handleWallClick(x, y, side)}
                        isEditing={selectedTool === "wallLine"}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 情報 */}
          <div className="text-center mb-2 text-sm flex justify-center items-center gap-4 text-white flex-wrap">
            <div className="flex items-center gap-1">
              <div className="w-6 h-6">{Icons.onigiri}</div>
              <span>配置: {totalOnigiri}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>必要:</span>
              <button
                className="px-2 py-0.5 bg-green-400 text-gray-900 rounded hover:bg-green-300 font-bold text-xs"
                onClick={() =>
                  setRequiredOnigiri(Math.max(0, requiredOnigiri - 1))
                }
              >
                -
              </button>
              <span className="font-bold w-4 text-center">
                {requiredOnigiri}
              </span>
              <button
                className="px-2 py-0.5 bg-green-400 text-gray-900 rounded hover:bg-green-300 font-bold text-xs"
                onClick={() =>
                  setRequiredOnigiri(
                    Math.min(totalOnigiri, requiredOnigiri + 1),
                  )
                }
              >
                +
              </button>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-6 h-6">{Icons.pickaxe}</div>
              <span>つるはし: {pickaxeCount}</span>
            </div>
          </div>

          {/* ボタン */}
          <div className="flex gap-2 flex-wrap justify-center">
            <button
              className="px-4 py-2 bg-gray-400 text-gray-900 rounded hover:bg-gray-300 font-bold border-2 border-gray-600"
              onClick={() => {
                playSe("select");
                setMode("menu");
              }}
            >
              戻る
            </button>
            <button
              className="px-4 py-2 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-300 font-bold border-2 border-yellow-600"
              onClick={() => {
                playSe("select");
                startTestPlay();
              }}
            >
              テストプレイ
            </button>
            {lastDifficulty && (
              <button
                className="px-4 py-2 bg-purple-400 text-white rounded hover:bg-purple-300 font-bold border-2 border-purple-600"
                onClick={() => {
                  playSe("select");
                  generateRandomStage(lastDifficulty);
                }}
              >
                🎲 再生成
              </button>
            )}
            {hasCleared && (
              <>
                <button
                  className="px-4 py-2 bg-white text-gray-900 rounded hover:bg-gray-100 font-bold border-2 border-gray-400"
                  onClick={() => handlePrint()}
                >
                  🖨️ 印刷
                </button>
                <input
                  type="text"
                  placeholder="ステージ名"
                  className="px-3 py-2 border-2 border-gray-600 rounded bg-white text-gray-900"
                  value={stageName}
                  onChange={(e) => setStageName(e.target.value)}
                />
                <button
                  className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-300 font-bold border-2 border-blue-600"
                  onClick={() => {
                    playSe("select");
                    saveStage();
                  }}
                >
                  保存
                </button>
              </>
            )}
          </div>

          {!hasCleared && (
            <p className="text-center text-sm text-yellow-300 mt-2">
              ※ 自分でクリアしないと保存できません
            </p>
          )}
        </div>
      </div>
    );
  }

  // テストプレイ / プレイ画面
  if (mode === "testplay" || mode === "play") {
    return (
      <div className="min-h-screen bg-green-500 p-2">
        <BgmToggle isOn={isBgmOn} onToggle={() => setIsBgmOn(!isBgmOn)} />
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-xl font-bold text-center mb-2 text-white"
            style={{ textShadow: "2px 2px 0 #1a5a1a" }}
          >
            {mode === "testplay" ? "テストプレイ" : "プレイ中"}
          </h2>

          {/* ステータス */}
          <div className="bg-green-400 p-2 rounded-lg shadow mb-2 flex justify-around text-center border-4 border-green-700">
            <div className="flex flex-col items-center">
              <span className="text-xl">⏱️</span>
              <p className="font-mono font-bold text-gray-900">
                {formatTime(elapsedTime)}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8">{Icons.onigiri}</div>
              <p className="font-bold text-gray-900">
                {collectedOnigiri} / {requiredOnigiri}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8">{Icons.pickaxe}</div>
              <p className="font-bold text-gray-900">{remainingPickaxe}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-8 h-8">{Icons.key}</div>
              <p className="font-bold text-gray-900">{collectedKeys}</p>
            </div>
          </div>

          {/* ゲーム状態メッセージ */}
          {gameState === "won" && (
            <div className="bg-yellow-300 border-4 border-yellow-600 p-4 rounded-lg mb-2 text-center">
              <p className="text-2xl font-bold text-gray-900">🎉 クリア！</p>
              <p className="text-lg text-gray-800">
                タイム: {formatTime(elapsedTime)}
              </p>
              {mode === "play" && (
                <button
                  className="mt-2 px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-300 font-bold border-2 border-blue-600"
                  onClick={saveRecord}
                >
                  記録を保存
                </button>
              )}
            </div>
          )}

          {gameState === "lost" && (
            <div className="bg-red-400 border-4 border-red-700 p-4 rounded-lg mb-2 text-center">
              <p className="text-2xl font-bold text-white">
                {lossReason === "wanwan"
                  ? "🐕 ワンワンに捕まった！"
                  : "💀 監視カメラに見つかった！"}
              </p>
            </div>
          )}

          {/* ボード */}
          <div className="flex justify-center mb-2">
            <div className="bg-green-700 p-1 rounded-lg inline-block border-4 border-green-900">
              <div
                className="inline-block"
                style={{
                  borderRight: "2px solid #2a7a2a",
                  borderBottom: "2px solid #2a7a2a",
                }}
              >
                {playBoard.map((row, y) => (
                  <div key={y} className="flex">
                    {row.map((cell, x) => (
                      <Cell
                        key={`${x}-${y}`}
                        element={cell.element}
                        direction={cell.direction}
                        walls={cell.walls}
                        teleportId={cell.teleportId}
                        isHighlighted={cameraHighlights.has(`${x},${y}`)}
                        isWanwanArea={
                          wanwanAreas.has(`${x},${y}`) &&
                          cell.element !== ELEMENTS.WANWAN
                        }
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ボタン */}
          <div className="flex gap-2 justify-center mb-4">
            <button
              className="px-4 py-2 bg-gray-400 text-gray-900 rounded hover:bg-gray-300 font-bold border-2 border-gray-600"
              onClick={() => {
                playSe("select");
                setMode(mode === "testplay" ? "create" : "browse");
              }}
            >
              戻る
            </button>
            <button
              className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-300 font-bold border-2 border-blue-600"
              onClick={() => {
                playSe("select");
                if (mode === "testplay") {
                  startTestPlay();
                } else {
                  const stage = savedStages.find(
                    (s) => s.id === currentStageId,
                  );
                  if (stage) loadStage(stage);
                }
              }}
            >
              リトライ
            </button>
            {mode === "play" && (
              <button
                className="px-4 py-2 bg-white text-gray-900 rounded hover:bg-gray-100 font-bold border-2 border-gray-400"
                onClick={() => {
                  const stage = savedStages.find(
                    (s) => s.id === currentStageId,
                  );
                  if (stage) handlePrint(stage);
                }}
              >
                🖨️ 印刷
              </button>
            )}
          </div>

          {/* タッチ操作ボタン */}
          <div className="flex flex-col items-center gap-1">
            <button
              className="w-16 h-16 bg-green-400 text-gray-900 rounded-lg font-bold text-2xl border-4 border-green-700 active:bg-green-300 select-none"
              onClick={() => movePlayer("up")}
            >
              ↑
            </button>
            <div className="flex gap-1">
              <button
                className="w-16 h-16 bg-green-400 text-gray-900 rounded-lg font-bold text-2xl border-4 border-green-700 active:bg-green-300 select-none"
                onClick={() => movePlayer("left")}
              >
                ←
              </button>
              <button
                className="w-16 h-16 bg-green-400 text-gray-900 rounded-lg font-bold text-2xl border-4 border-green-700 active:bg-green-300 select-none"
                onClick={() => movePlayer("down")}
              >
                ↓
              </button>
              <button
                className="w-16 h-16 bg-green-400 text-gray-900 rounded-lg font-bold text-2xl border-4 border-green-700 active:bg-green-300 select-none"
                onClick={() => movePlayer("right")}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
