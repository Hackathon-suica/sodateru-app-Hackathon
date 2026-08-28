// そだてる｜学習育成ノート - 最小限のAPIサーバー
//
// 記録（学習ログ）・XP・レベル・連続記録日数をサーバー側で保持します。
// 今はファイル（data.json）に保存する簡易実装です。
// 本番運用する場合は、この永続化部分をDB（例: SQLite, Postgres）に差し替えてください。

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'data.json');

const XP_PER_RECORD = 20;
const XP_PER_LEVEL = 100;

const STAGES = [
  { min: 1, max: 2, label: 'たまご期' },
  { min: 3, max: 4, label: 'メル」機' },
  { min: 5, max: 6, label: 'しげり期' },
  { min: 7, max: 8, label: 'かいか期' },
  { min: 9, max: Infinity, label: 'らんまん期' },
];

function defaultState() {
  return { xp: 0, level: 1, streak: 0, records: [] };
}

function loadState() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return defaultState();
  }
}

function saveState(state) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(state, null, 2), 'utf-8');
}

function stageFor(level) {
  return STAGES.find((s) => level >= s.min && level <= s.max) || STAGES[STAGES.length - 1];
}

function withDerived(state) {
  const xpIntoLevel = state.xp % XP_PER_LEVEL;
  return {
    ...state,
    xpIntoLevel,
    xpToNextLevel: XP_PER_LEVEL - xpIntoLevel,
    stage: stageFor(state.level).label,
  };
}

let state = loadState();

app.use(cors());
app.use(express.json());

// ヘルスチェック
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// 現在の状態を取得
app.get('/api/state', (req, res) => {
  res.json(withDerived(state));
});

// 記録を1件追加し、XP・レベル・連続記録を更新する
app.post('/api/records', (req, res) => {
  const text = (req.body && req.body.text || '').trim();
  if (!text) {
    return res.status(400).json({ error: 'text is required' });
  }
  if (text.length > 100) {
    return res.status(400).json({ error: 'text is too long' });
  }

  const prevLevel = state.level;

  state.records.push({ text, createdAt: new Date().toISOString() });
  state.xp += XP_PER_RECORD;
  state.level = Math.floor(state.xp / XP_PER_LEVEL) + 1;
  state.streak += 1; // 簡易実装：本来は日付ベースで連続かどうかを判定する

  saveState(state);

  res.status(201).json({
    ...withDerived(state),
    leveledUp: state.level > prevLevel,
  });
});

// すべてリセット
app.post('/api/reset', (req, res) => {
  state = defaultState();
  saveState(state);
  res.json(withDerived(state));
});

app.listen(PORT, () => {
  console.log(`sodateru backend listening on http://localhost:${PORT}`);
});
