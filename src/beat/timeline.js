import { SCENES as mountings } from './originalScoreTimeline.js';
const works = [
  {
    "art": "cave",
    "style": 0,
    "zh": "洞穴壁畫",
    "en": "《無題（六七）》",
    "era": "40000 BCE",
    "gag": "據信比語言更早出現"
  },
  {
    "art": "egypt",
    "style": 1,
    "zh": "古埃及墓室壁畫",
    "en": "《法老與女神・六七》",
    "era": "1300 BCE",
    "gag": "象形文字裡，六和七各有專屬符號"
  },
  {
    "art": "greek",
    "style": 2,
    "zh": "希臘黑像式陶瓶",
    "en": "《競技者與六七》",
    "era": "500 BCE",
    "gag": "六是完全數，七是幸運數，合起來沒人敢問"
  },
  {
    "art": "roman",
    "style": 3,
    "zh": "龐貝馬賽克",
    "en": "《小心六七》",
    "era": "79",
    "gag": "火山爆發前一天，大家還在六七"
  },
  {
    "art": "song",
    "style": 4,
    "zh": "北宋水墨山水",
    "en": "《谿山行旅六七圖》",
    "era": "1000",
    "gag": "走了六七里路，手還在動"
  },
  {
    "art": "medieval",
    "style": 6,
    "zh": "中世紀泥金手抄本",
    "en": "《時禱書・頁緣六七》",
    "era": "1250",
    "gag": "修士趁沒人時偷偷畫的"
  },
  {
    "art": "renaissance",
    "style": 7,
    "zh": "文藝復興",
    "en": "《最後的晚餐（六七版）》",
    "era": "1498",
    "gag": "十三個人，零個人願意解釋"
  },
  {
    "art": "ukiyo",
    "style": 10,
    "zh": "浮世繪",
    "en": "《神奈川沖六七裏》",
    "era": "1831",
    "gag": "浪很大，手還是不能停"
  },
  {
    "art": "vangogh",
    "style": 11,
    "zh": "後印象派",
    "en": "《星夜（六七）》",
    "era": "1889",
    "gag": "當年沒人看得懂，現在人人看得懂"
  },
  {
    "art": "surreal",
    "style": 12,
    "zh": "超現實主義",
    "en": "《六點七分的永恆》",
    "era": "1931",
    "gag": "所有時鐘都停在 6:07"
  },
  {
    "art": "pop",
    "style": 14,
    "zh": "普普藝術",
    "en": "《六七罐頭湯 ×32》",
    "era": "1962",
    "gag": "大量複製，正是它的本質"
  },
  {
    "art": "synth",
    "style": 17,
    "zh": "合成器浪潮",
    "en": "《夜駛六七》",
    "era": "1985",
    "gag": "倒帶的時候，手還在動"
  },
  {
    "art": "pixel",
    "style": 15,
    "zh": "16 位元像素",
    "en": "《街頭六七 II》",
    "era": "1991",
    "gag": "這一局，沒人出招"
  },
  {
    "art": "xp",
    "style": 16,
    "zh": "早期網路",
    "en": "《轉寄：請轉給 67 個人》",
    "era": "2006",
    "gag": "當年叫「轉寄」，現在叫「迷因」"
  },
  {
    "art": "tiktok",
    "style": 18,
    "zh": "Gen Alpha 短影音",
    "en": "《六七》",
    "era": "2025",
    "gag": "Dictionary.com 2025 年度詞彙"
  }
];
// src/beat/timeline.js
// Unified 120 BPM musical clock, timeline structure (exact 137.0s = 2:17),
// deterministic world-scroll progression, and retro time quantizers.

export const BPM = 120;
export const BEAT_SEC = 60 / BPM; // 0.5s per beat
export const BAR_BEATS = 4;
export const BAR_SEC = BEAT_SEC * BAR_BEATS; // 2.0s per bar

export const INTRO_BARS = 2.5; // 5.0s (1.0s 2-beat pickup + 2 full 4/4 bars)
export const INTRO_SEC = INTRO_BARS * BAR_SEC; // 5.0s

export const SCENE_BARS = 3;
export const SCENE_SEC = SCENE_BARS * BAR_SEC; // 6.0s per era
export const NUM_SCENES = works.length;
export const SCENES_TOTAL_SEC = NUM_SCENES * SCENE_SEC; // 120.0s (5.0s -> 125.0s)

export const OUTRO_BARS = 6;
export const OUTRO_SEC = OUTRO_BARS * BAR_SEC; // 12.0s (125.0s -> 137.0s)

export const TOTAL_DURATION = INTRO_SEC + SCENES_TOTAL_SEC + OUTRO_SEC; // 137.0s (2:17)

export const PANEL_SIZE = 1000;
export const ROAD_EDGE_Y = 680; // Canonical road Y at x=0 and x=1000 of every panel

export const SCENES = works.map((work, idx) => ({
  ...mountings[work.style],
  ...work,
  index: idx,
  num: idx + 1,
  t0: INTRO_SEC + idx * SCENE_SEC,
  t1: INTRO_SEC + (idx + 1) * SCENE_SEC,
  worldX0: idx * PANEL_SIZE,
  worldX1: (idx + 1) * PANEL_SIZE,
}));

export function clamp(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v;
}

export function smoothstep(e0, e1, x) {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
}

export function smootherstep(e0, e1, x) {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * Quantizes time `t` to a fixed update rate `hz` (e.g. 8-12 Hz for retro scenes)
 * while leaving camera motion unquantized.
 */
export function quantizeTime(t, hz = 10) {
  if (!hz || hz <= 0) return t;
  return Math.floor(t * hz + 1e-6) / hz;
}

/**
 * Computes musical beat/bar state and current section for global time `t` in [0, 137].
 */
export function getBeatState(rawT) {
  const t = clamp(rawT, 0, TOTAL_DURATION);
  const globalBeat = t / BEAT_SEC; // 0..274
  const beatIndex = Math.floor(globalBeat + 1e-7);
  const beatFrac = globalBeat - beatIndex;
  const pedalAngle = globalBeat * Math.PI; // 2 beats = 2π (one full crank turn!)

  let section = 'scenes';
  let sceneIndex = -1;
  let scene = null;
  let localT = 0;
  let barInScene = 0; // 0, 1, 2
  let beatInScene = 0; // 0..12

  if (t < INTRO_SEC) {
    section = 'intro';
    localT = t;
  } else if (t < INTRO_SEC + SCENES_TOTAL_SEC) {
    section = 'scenes';
    const st = t - INTRO_SEC;
    sceneIndex = clamp(Math.floor(st / SCENE_SEC), 0, NUM_SCENES - 1);
    scene = SCENES[sceneIndex];
    localT = st - sceneIndex * SCENE_SEC; // [0, 6)
    beatInScene = localT / BEAT_SEC; // [0, 12)
    barInScene = clamp(Math.floor(localT / BAR_SEC), 0, 2);
  } else {
    section = 'outro';
    localT = t - (INTRO_SEC + SCENES_TOTAL_SEC); // [0, 12]
  }

  return {
    t,
    globalBeat,
    beatIndex,
    beatFrac,
    isStrongBeat: beatIndex % 2 === 0,
    isBarDownbeat: section === 'scenes' ? Math.floor(beatInScene + 1e-6) % 4 === 0 : beatIndex % 4 === 0,
    pedalAngle,
    section,
    sceneIndex,
    scene,
    localT,
    barInScene,
    beatInScene,
  };
}

/**
 * Computes the pelican's local progression u in [0, 1] across a 6.0s scene,
 * supporting Bar-2 slow-down / freeze poses while strictly preserving C1 continuity
 * (`u(0)=0, u(6)=1, u'(0)=1/6, u'(6)=1/6`) at every picture-frame crossing!
 */
export function getSceneProgress(scene, localT) {
  const s = clamp(localT / SCENE_SEC, 0, 1); // linear 0..1
  if (!scene || scene.motionProfile !== 'freeze_bar2') {
    return {
      u: s,
      speedScale: 1.0,
      pedalPhaseOffset: 0,
    };
  }

  // For Egyptian mural (#2): smoothly decelerate to a near-freeze right at Bar 2 (localT 2.3s..3.5s)
  // around x = 500, then smoothly accelerate in Bar 3 to hit x = 1000 right on Beat 12 (6.0s).
  // Construct piecewise smooth curve passing through (0,0) with slope 1 and (1,1) with slope 1:
  const plateauCenter = 0.5;
  const plateauStrength = 0.78; // slows down by ~78% at center of Bar 2
  const env = Math.exp(-Math.pow((s - plateauCenter) / 0.14, 2));
  // Integral-like smooth S-detour that vanishes at s=0 and s=1:
  const detour = -0.095 * Math.sin(2 * Math.PI * s) * smoothstep(0.05, 0.22, s) * smoothstep(0.95, 0.78, s);
  const u = clamp(s + detour, 0, 1);
  const speedScale = clamp(1 - plateauStrength * env, 0.12, 1.45);
  // Subtle pedal slow-down offset that starts at 0 and returns cleanly to 0 before Bar 3 ends:
  const pedalPhaseOffset = -1.65 * Math.sin(Math.PI * clamp((localT - 1.5) / 3.0, 0, 1)) *
    smoothstep(1.5, 2.1, localT) * smoothstep(4.5, 3.9, localT);

  return { u, speedScale, pedalPhaseOffset };
}

/**
 * Computes the continuous world-space X coordinate of the pelican+bicycle center.
 * - During Intro pickup (3.20s -> 5.00s): C2-accelerates from -150 -> 0 with zero tire slip,
 *   matching Scene #1's exact position (0), velocity (1000/6 px/s), and acceleration (0) at t = 5.0s!
 * - During Scenes 1..20 (5.0s -> 125.0s): rides from 0 -> 20,000, crossing each frame i*1000 at 5.0 + 6*i!
 * - Across t = 125.0s..126.0s (Outro cross-dissolve): glides smoothly past x = 20,000 without snapping.
 */
export function getPelicanWorldState(t) {
  if (t < INTRO_SEC) {
    const tStart = 3.2;
    const dur = INTRO_SEC - tStart; // 1.8s
    const s = clamp((t - tStart) / dur, 0, 1);
    const s2 = s * s;
    const s3 = s2 * s;
    const s4 = s2 * s2;
    const speedScale = s2 * (3 - 2 * s); // C1 smoothstep velocity profile: 0 -> 1, deriv 0 at both ends!
    const mX = (PANEL_SIZE / SCENE_SEC) * dur; // 300px
    const worldX = mX * (-0.5 + s3 - 0.5 * s4); // -150 -> 0, C2-matched at t = 5.0s!
    const endTheta = (INTRO_SEC / BEAT_SEC) * Math.PI; // 10π at t = 5.0s
    const mTheta = (Math.PI / BEAT_SEC) * dur; // 3.6π
    const pedalAngle = endTheta + mTheta * (-0.5 + s3 - 0.5 * s4);
    return {
      visibleInScroll: t >= tStart,
      worldX,
      speedScale,
      pedalAngle,
    };
  }

  if (t < INTRO_SEC + SCENES_TOTAL_SEC) {
    const st = t - INTRO_SEC;
    const idx = clamp(Math.floor(st / SCENE_SEC), 0, NUM_SCENES - 1);
    const localT = st - idx * SCENE_SEC;
    const scene = SCENES[idx];
    const { u, speedScale, pedalPhaseOffset } = getSceneProgress(scene, localT);
    return {
      visibleInScroll: true,
      worldX: idx * PANEL_SIZE + u * PANEL_SIZE,
      speedScale,
      pedalAngle: (t / BEAT_SEC) * Math.PI + pedalPhaseOffset,
    };
  }

  const outroElapsed = t - (INTRO_SEC + SCENES_TOTAL_SEC);
  return {
    visibleInScroll: outroElapsed < 1.0,
    worldX: NUM_SCENES * PANEL_SIZE + (outroElapsed / SCENE_SEC) * PANEL_SIZE,
    speedScale: 1.0,
    pedalAngle: (t / BEAT_SEC) * Math.PI,
  };
}
