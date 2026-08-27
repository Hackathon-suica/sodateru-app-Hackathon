# 編集のしかた（他の人向け）

## A. コラボレーターとして招待されている人

リポジトリのオーナー（athony687）に `Settings → Collaborators` から招待してもらえば、直接pushできます。

```bash
git clone https://github.com/athony687/sodateru-app-hackerson.git
cd sodateru-app-hackerson

# 作業用ブランチを作る（mainに直接pushせず、ブランチを切るのがおすすめ）
git checkout -b feature/わかりやすい名前

# 編集したら
git add -A
git commit -m "変更内容がわかる一言"
git push -u origin feature/わかりやすい名前
```

push後、GitHub上で「Compare & pull request」ボタンが出るので、そこからPull Requestを作成してください。

## B. コラボレーターに招待されていない人（公開リポジトリなので誰でも可能）

1. GitHub右上の「Fork」で自分のアカウントに複製する
2. 自分のフォークをcloneして編集する

```bash
git clone https://github.com/自分のユーザー名/sodateru-app-hackerson.git
cd sodateru-app-hackerson
git checkout -b feature/わかりやすい名前
# 編集 → commit → push
```

3. GitHub上で、自分のフォークから本家リポジトリへPull Requestを作成する

## 動作確認のしかた

- フロントエンドだけ触る場合：`frontend/index.html` をブラウザで開くだけでOK
- バックエンドも触る場合：`backend/README.md` の手順で `npm install && npm start`
