# frontend

学習記録をキャラクターの成長として見せる、静的なフロントエンド（HTML/CSS/JS、フレームワーク不使用）です。

## 使い方

`index.html` をブラウザで直接開くだけで動作します。ローカルサーバーは必須ではありません。

```bash
# ローカルサーバーで開きたい場合（任意）
cd frontend
npx serve .
```

## ファイル

- `index.html` — 現行版（記録ログ形式・ネオブルータリズム風UI）
- `sodateru-prototype.html` — 初期プロトタイプ（チェックリスト形式）
- `sodateru-prototype-v2.html` — `index.html` と同内容

## 今後の対応

現状はブラウザのメモリ内だけでデータを保持しており、リロードすると消えます。
`../backend` のAPIと接続すると、記録をサーバー側に保存できるようになります。
