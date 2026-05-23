# 4週間パーソナライズ学習スケジュール（開始版）

## 前提
- 目的: 7月以降の小規模在庫管理案件でTypeScript / Next.jsを使える状態にする
- 現在地: JavaScriptは基礎運用可能、TypeScript/React/Next.jsは未経験

## 全体戦略
- 1週目でJavaScriptの弱点を短期補強し、TypeScriptへ接続
- 2週目でReact + Next.jsの画面を作る
- 3週目でAPI + DB連携を実装
- 4週目でテストと説明可能性を整える

## Week 1（JS基礎補強 + TS導入）
- 到達目標
  - スコープ、巻き上げ、イベントループ、Promise合成を説明できる
  - TypeScriptで基本型を使って在庫ドメインを表現できる
- 学習課題
  - 課題1: `var` / `let` / `const` の挙動比較コードを作る
  - 課題2: `Promise.all` / `Promise.allSettled` の差を在庫API想定で実装
  - 課題3: `reduce` でカテゴリ別在庫合計を集計
  - 課題4: TypeScript `strict` 設定で `Item` / `StockMovement` 型を定義
- 完了条件
  - 4課題すべて実行確認
  - 課題コードを自分の言葉で説明可能

## Week 2（React + Next.js画面）
- 到達目標
  - App Router構成で3画面を作れる
- 学習課題
  - 在庫一覧 / 商品登録 / 商品詳細ページ作成
  - フォーム入力とバリデーション実装
  - Server Component と Client Component の使い分けを1箇所ずつ実装
- 完了条件
  - 画面遷移が一通り動作し、型エラーがない

## Week 3（API + DB）
- 到達目標
  - Route Handler + Prisma でCRUDを実装できる
- 学習課題
  - 商品CRUD API
  - 在庫増減API
  - 在庫が負数にならない制約実装
- 完了条件
  - UI経由で入出庫登録と在庫反映ができる

## Week 4（品質 + 仕上げ）
- 到達目標
  - 重要ロジックをテストし、他者説明できる
- 学習課題
  - 在庫加減算の単体テスト
  - 主要導線のE2Eテスト（最小1本）
  - README整備（起動手順、設計方針、制約）
- 完了条件
  - テスト通過
  - 再現可能なセットアップ手順がある

## 直近3日（今日から）
- Day 1
  - `var` / `let` / `const`、巻き上げ、TDZをコードで確認
  - イベントループ問題を5問解く
  - 演習セット: learning-plan/exercises/day1-js-exercises.md
  - 解答/解説: learning-plan/exercises/day1-js-exercises-answers.md
- Day 2
  - `Promise.all` / `allSettled` を在庫API想定で書き分け
  - `reduce` で集計演習3問
  - 演習セット: learning-plan/exercises/day2-js-exercises.md
  - 解答/解説: learning-plan/exercises/day2-js-exercises-answers.md
- Day 3
  - TypeScript導入（`strict`）
  - 在庫ドメイン型定義 + 型ガード1本

## Day1 実施ログ（Claude共有用）
- 実施日: 2026-05-18
- 所要時間: （未記入）
- 正答数: 4問正答 + 2問部分正答（Q3・Q8）/ 10問
- 間違えた問題番号: Q1, Q2, Q5, Q6
- つまずいた理由:
  - Q1・Q2: var 巻き上げで undefined が返ること、let/const の TDZ（ReferenceError）を未把握
  - Q5・Q6: 同期コード完了前に Microtask が実行されると誤解。正しくは同期コードがすべて終わってから Microtask キューが消化される
- 明日の改善ポイント:
  - var巻き上げ（undefined）と TDZ（ReferenceError）を実際にコードで確認する
  - イベントループの同期→Microtask→Macrotask の順序をコード実行で体感する

## Day1 採点結果（2026-05-18）
- 判定: Day1 再演習（Part A / Part B 集中）
- Part C・D は理解済み（reduce は自力実装できている）
- 再演習の重点
  1. var の巻き上げ = undefined、let/const の TDZ = ReferenceError
  2. イベントループ: 同期コードが全部終わってから Microtask → Macrotask の順
- 次アクション: 上記2点の確認演習を実施し、再度 Part A・B を解く

## Day1 再演習結果（2026-05-18）
- 判定: Day2 へ進行
- Q1・Q2・Q3・Q5・Q6 すべて正答に修正
- 最終スコア: 9〜9.5 / 10
- 残課題: Q8（逐次実行がパフォーマンス問題という主因）→ Day2 の Promise.all 実装で自然に定着させる

## 記録ルール（Claude共有用）
毎日、以下4点を追記する。
- 今日やったこと
- 詰まった点
- 明日のタスク
- 自己評価（5段階）

追記先は learning-plan/assessments/4week-personalized-schedule.md の末尾を使用する。
