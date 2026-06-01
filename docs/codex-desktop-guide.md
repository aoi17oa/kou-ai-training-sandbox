# Codex app ガイド

## 目的

Codex appを使って、Issue単位で家計簿アプリを改善します。

## 基本の流れ

1. このリポジトリをcloneする
2. Codex appでこのフォルダを開く
3. `README.md` と `AGENTS.md` を読ませる
4. 作業するIssueを1つ選ぶ
5. Codexに実装を依頼する
6. 差分を確認する
7. localhostで動作確認する
8. PR本文を整える

## Codexに渡す依頼例

```text
Issue #1 を実装してください。
README.md、AGENTS.md、docs/my-budget-app-requirements.md を読んでください。

条件:
- Issue外の変更はしない
- 必要なテストを追加または更新する
- npm run lint、npm test、npm run build を実行する
- localhostで確認する手順を書く
- PR本文に変更内容、検証結果、リスク、ロールバック方法を書く
```

## 差分を見るときのチェック

- Issueの目的に合っているか
- 変更ファイルが多すぎないか
- 余計な親切修正がないか
- テストが追加または更新されているか
- 自分が説明できないコードがないか

## 止まるべき条件

- `.env` やAPIキーが必要になった
- 本番環境に触れそうになった
- 外部サービスへ送信しそうになった
- 個人情報や実データを入れそうになった
- AIの差分を説明できない
