# KOU AI Training Sandbox

GitHub IssueをAIで安全に実装し、PR・レビュー・CI・修正・マージ判断まで完走するための練習用リポジトリです。

このリポジトリは、クローンした人がREADMEに沿って自習できるように作っています。実務データ、本番API、顧客情報、認証情報は使いません。

## 1. このリポジトリのゴール

最終的に、次の流れを自分で回せるようになることを目指します。

1. GitHub Issueを読む
2. DoDを理解する
3. 作業ブランチを作る
4. Codexに実装を依頼する
5. 差分を確認する
6. テストとCIを確認する
7. PRを作る
8. レビュー指摘を修正する
9. Issueを満たしているか確認する
10. マージ判断の材料を説明する

## 2. まず読む教材

### 必修

- このREADME
- [docs/learning-roadmap.md](docs/learning-roadmap.md)
- [docs/safety-policy.md](docs/safety-policy.md)
- [docs/dod.md](docs/dod.md)
- [docs/review-rubric.md](docs/review-rubric.md)

### 補助教材

- Antigravityの教科書
  - 最初から必修ではありません。
  - Lv3以降で、Plan、検証証跡、artifact-firstの理解を深める補助教材として使います。
資料はこちらです
https://tom-sol.notion.site/Antigravity-3639364dd5c380aba59bc86f1ac10988

### Notion

- AI開発教育ロードマップ: https://tom-sol.notion.site/AI-3629364dd5c381c289e8d8974c10f8c3?source=copy_link

## 3. セットアップ

```bash
git clone https://github.com/tomosuke-chiba/kou-ai-training-sandbox.git
cd kou-ai-training-sandbox
npm test
```

このリポジトリは外部依存なしで動きます。`npm install` は不要です。

## 4. 学習の進め方

### Lv0: GitHub Flowを理解する

- Issue / Branch / PR / Review / CI / Test / DoD / Merge を説明できる
- mainに直接pushしない理由を説明できる
- コード変更なしでドラフトPRを作れる

進捗記録:

- [progress/lv0.md](progress/lv0.md)

### Lv1: AIツールの役割を理解する

- Codexを基本ツールとして使う
- Claude Codeは計画・複雑調査・安全制御で使う
- Antigravityは補助教材として扱う
- 禁止操作と承認必須操作を説明できる

進捗記録:

- [progress/lv1.md](progress/lv1.md)

### Lv2: 小さなIssueを実装する

- サンプルIssueを2〜3本こなす
- テストを追加または更新する
- PR本文に検証結果を書く

進捗記録:

- [progress/lv2.md](progress/lv2.md)

### Lv3: レビュー・CI修正を完走する

- CI失敗を読んで直す
- レビューコメントに返信して修正する
- 修正後にDoDを再確認する

進捗記録:

- [progress/lv3.md](progress/lv3.md)

## 5. サンプルIssueの練習順

最初は次の順番で進めてください。

1. typo修正
2. 空検索で全件表示
3. 日付降順ソート
4. loading表示
5. timeout時のエラー表示
6. CI失敗修正
7. レビューコメント2件対応
8. Issue Template改善
9. PR Template改善
10. ADRを書いてから実装

## 6. Codexに渡す基本プロンプト

```text
このリポジトリのAGENTS.mdとREADME.mdを読んでください。
Issue #{番号} を実装してください。

条件:
- 1 Issue = 1 Branch = 1 PR の範囲に収める
- Issue外の変更をしない
- 必要なテストを追加または更新する
- npm test を実行する
- PR本文に変更内容、検証結果、リスクを書く
- .env、認証情報、本番API、外部送信には触れない
```

## 7. Claude Codeに渡す基本プロンプト

```text
このIssueの実装計画だけ作ってください。
まだファイル編集はしないでください。

確認したいこと:
- Issueの目的
- DoD
- 変更対象ファイル
- テスト方針
- リスク
- Codexに任せるべき実装手順
```

## 8. やってはいけないこと

- mainへ直接pushする
- `.env*` を作る、読む、編集する
- 実顧客情報を入れる
- APIキーや認証情報を入れる
- 本番APIに接続する
- 外部送信する
- 金銭判断、契約変更、カード操作、振込操作を扱う
- AIの差分を読まずにマージする

## 9. GitHub設定メモ

このリポジトリはprivateで作成しています。GitHub Pro化、またはpublic化できる場合は、main branch protectionを有効にしてください。

推奨設定:

- PR必須
- 1 approval必須
- conversation resolution必須
- required checks: `lint`, `test`, `build`
- force push禁止
- branch deletion禁止

## 10. 合格条件

Lv3までの合格条件:

- [ ] Issue / Branch / PR / Review / CI / Test / DoD / Merge を説明できる
- [ ] 少なくとも3本のIssueを完走した
- [ ] 1本以上はbug fix + regression testを含む
- [ ] 1本以上はレビューコメント2往復を完了した
- [ ] CIログを読み、失敗理由を説明して直せる
- [ ] PR本文にIssueリンク、変更概要、検証方法、リスク、DoDを書ける
- [ ] AI出力をそのまま信用せず、自分で説明・再現・検証できる

## 11. 次にやること

1. GitHub上でこのリポジトリのIssueを確認する
2. Lv0の進捗チェックを埋める
3. 最初のIssueを1つ選ぶ
4. Codexに実装を依頼する
5. PRを作る
6. レビュー指摘に対応する
