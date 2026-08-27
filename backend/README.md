# backend

「そだてる」の記録・XP・レベルを保存する、最小限のAPIサーバーです。

## セットアップ

```bash
cd backend
npm install
npm start
```

デフォルトで `http://localhost:3001` で起動します。

## エンドポイント

| メソッド | パス | 説明 |
|---|---|---|
| GET | `/api/health` | 起動確認 |
| GET | `/api/state` | 現在のXP・レベル・記録一覧を取得 |
| POST | `/api/records` | 記録を1件追加（body: `{ "text": "内容" }`） |
| POST | `/api/reset` | すべてリセット |

## 今の実装について

- データは `backend/data.json` に保存されます（gitには含めていません）
- 今はサーバーを再起動してもファイルにデータが残る簡易実装です
- 複数人で同時に使う場合や本番運用する場合は、DB（SQLite/Postgresなど）とユーザーごとのデータ分離への差し替えが必要です

## フロントエンドとの接続について

現時点では `frontend/index.html` はこのAPIをまだ呼んでいません（ブラウザ内のメモリだけで完結しています）。
接続する場合は、`frontend/index.html` の `fetch` 処理を `http://localhost:3001/api/...` に向けて追加してください。
