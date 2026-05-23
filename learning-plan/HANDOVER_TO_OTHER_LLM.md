# 引き継ぎ資料（他LLM向け）

## 1. 依頼背景
- 目的: 2026年7月以降に想定される小規模在庫管理システム案件に向け、TypeScript / Next.js スキルを1〜2か月で実務投入レベルへ引き上げる。
- 学習方針: 実装中心。理論のみではなく、在庫管理ドメインの課題で段階的に習得する。
- 現在の運用: 4週間プランを優先し、進捗は日次で記録して調整する。

## 2. ユーザーの現状スキル（要約）
- 実務
  - PHP / Laravel: 約3年
  - HTML / JavaScript: 約3年
  - CSS: 基本理解あり（弱め）
- 基礎
  - C / Java の基礎、DB基礎、Linux基礎、ネットワーク基礎
- その他
  - VBA: 約6年
  - C# / VB.NET / Python の自主開発経験
  - AWS基礎学習済

詳細は以下を参照。
- learning-plan/plans/skill-profile.md

## 3. スキル診断結果（重要）
- JavaScriptは基礎実務レベルだが、以下にギャップあり
  - スコープ/巻き上げ（var, let, const）
  - 非同期制御（イベントループ、Promise合成）
  - reduceの活用
  - イベント委譲の実装観点
- TypeScript / React / Next.js は未経験前提

詳細は以下を参照。
- learning-plan/assessments/skill-gap-assessment-2026-05-18.md

## 4. 合意済みの学習プラン
- 4週間プランで進行（優先）
- 構成
  - Week1: JS弱点補強 + TS導入
  - Week2: React最小 + Next.js画面
  - Week3: API + DB（Prisma想定）
  - Week4: テスト + README整備

詳細は以下を参照。
- learning-plan/assessments/4week-personalized-schedule.md

## 5. いまの進捗
- 学習カリキュラム一式を作成済み
- フォルダを用途別に整理済み
- Day1演習セットを作成済み
- ユーザーはこれからDay1演習を実施する段階

## 6. Day1で使う教材
- 問題
  - learning-plan/exercises/day1-js-exercises.md
- 解答/解説
  - learning-plan/exercises/day1-js-exercises-answers.md

## 7. 進捗記録ルール（継続必須）
- 日次で以下を記録
  - 今日やったこと
  - 詰まった点
  - 明日のタスク
  - 自己評価（5段階）
- 追記先
  - learning-plan/assessments/4week-personalized-schedule.md

## 8. 参照UI（ダッシュボード）
- 学習全体の確認画面
  - learning-plan/dashboard/index.html
- 関連アセット
  - learning-plan/dashboard/styles.css
  - learning-plan/dashboard/script.js

## 9. 次回セッション開始時の推奨アクション
1. ユーザーのDay1回答を確認する。
2. day1-js-exercises-answers.md を基準に採点する。
3. 正答率で進行判定する。
   - 8〜10: Day2へ進行
   - 5〜7: Day1再演習（弱点再学習）
   - 0〜4: Part A/Bを重点復習
4. 採点結果と改善点を 4week-personalized-schedule.md に反映する。

## 10. 他LLMへの入力テンプレ（そのまま利用可）
以下を新しいチャットに貼り付けて開始する。

---
このワークスペースの学習支援を継続してください。引き継ぎ資料は learning-plan/HANDOVER_TO_OTHER_LLM.md です。
まず以下を実施してください。
1) 引き継ぎ資料を読んで現状を要約
2) Day1の回答を採点
3) Day2へ進めるか判定
4) 判定理由と次アクションを learning-plan/assessments/4week-personalized-schedule.md に追記
---

## 11. 補足
- ユーザー要望: JavaScriptの認識差が大きいと学習ズレが出るため、JS重点で進める。
- 4週間プラン優先は合意済み。
