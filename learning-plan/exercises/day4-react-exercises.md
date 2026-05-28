# Day4 演習セット（60〜90分）

## 目的
- React の基本概念（コンポーネント・Props・useState・イベント・リスト・条件レンダリング）を在庫管理の文脈で書けるようにする。
- TypeScript と組み合わせて Props や state に型を付ける感覚を掴む。

## 事前セットアップ
```bash
npm create vite@latest day4-react -- --template react-ts
cd day4-react
npm install
npm run dev
```
`http://localhost:5173` でアプリが起動することを確認してから演習を始めてください。

## 進め方
- 制限時間: 60〜90分
- 推奨配分
  - Part A: 20分
  - Part B: 20分
  - Part C: 20分
- 各パートは `src/` 配下に新しいコンポーネントファイルを作り、`src/App.tsx` から呼び出してブラウザで動作確認すること。
- 採点後に解答ファイルで自己採点する。

---

## Part A: コンポーネント / Props（20分）

### Q1
以下の仕様を満たす関数コンポーネント `ItemCard` を TypeScript で実装してください。

**仕様**
- Props: `name`（文字列）、`price`（数値）、`qty`（数値）
- 表示内容:
  - 商品名
  - 価格（`¥120` の形式）
  - 在庫数

```tsx
// src/components/ItemCard.tsx を作成する

// App.tsx から以下のように呼び出せること
<ItemCard name="ペン" price={120} qty={50} />
```

### A1
```tsx
// ここに回答を記述する
```

---

### Q2
Q1 の `ItemCard` に `optional` な Props `category` （文字列）を追加してください。
`category` が渡された場合は表示し、渡されない場合は表示しないようにしてください。

```tsx
// 両方コンパイルエラーにならないこと
<ItemCard name="ペン" price={120} qty={50} category="文具" />
<ItemCard name="ノート" price={150} qty={30} />
```

### A2
```tsx
// ここに回答を記述する
```

---

## Part B: useState / イベントハンドリング（20分）

### Q3
在庫数をボタンで増減できるコンポーネント `StockCounter` を実装してください。

**仕様**
- Props: `initialQty`（数値）
- 表示内容: 現在の在庫数
- 「入庫 +1」ボタンを押すと在庫数が1増える
- 「出庫 -1」ボタンを押すと在庫数が1減える
- 在庫数が 0 の場合、「出庫 -1」ボタンを押しても 0 以下にならないようにする

```tsx
// App.tsx から以下のように呼び出せること
<StockCounter initialQty={10} />
```

### A3
```tsx
// ここに回答を記述する
```

---

### Q4
テキスト入力で商品名を検索できるコンポーネント `ItemSearch` を実装してください。

**仕様**
- input に文字を入力するたびに、入力値をリアルタイムで画面に表示する（例: `検索中: ペン`）
- 入力が空の場合は `検索中:` の行を表示しない

```tsx
// App.tsx から以下のように呼び出せること
<ItemSearch />
```

### A4
```tsx
// ここに回答を記述する
```

---

## Part C: リスト / 条件レンダリング（20分）

### Q5
以下のデータを受け取り、在庫一覧をリスト表示するコンポーネント `ItemList` を実装してください。

**仕様**
- Props: `items`（後述の `Item` 型の配列）
- 各アイテムの `name` と `qty` を表示する
- `qty` が 10 以下のアイテムには `⚠️ 在庫少` のテキストを表示する
- リスト表示には適切な `key` を設定すること

```tsx
interface Item {
  id: number;
  name: string;
  qty: number;
}

// App.tsx から以下のように呼び出せること
const items: Item[] = [
  { id: 1, name: "ペン",   qty: 50 },
  { id: 2, name: "ノート", qty: 8  },
  { id: 3, name: "消しゴム", qty: 3 },
];

<ItemList items={items} />
```

### A5
```tsx
// ここに回答を記述する
```

---

### Q6
Q5 の `ItemList` を拡張して、`items` が空配列の場合に「商品が登録されていません」と表示するようにしてください。

```tsx
// 空の場合
<ItemList items={[]} />
// → 「商品が登録されていません」と表示される
```

### A6
```tsx
// ここに回答を記述する
```

---

## 自己採点（目安）
- 5〜6問正答: Day5（Next.js導入）へ進行
- 3〜4問正答: Props / useState を再演習
- 0〜2問正答: React 公式チュートリアル（Tic-Tac-Toe）を先に実施

## Claude共有テンプレ
以下をそのまま貼って共有してください。

- 実施日:
- 所要時間:
- 正答数:
- 間違えた問題番号:
- つまずいた理由:
- 明日の改善ポイント:
