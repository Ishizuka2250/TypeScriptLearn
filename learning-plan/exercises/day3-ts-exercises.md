# Day3 演習セット（45〜60分）

## 目的
- TypeScript の基本構文（型注釈・interface/type・Null安全性）を在庫管理の文脈で書けるようにする。
- `strict: true` 環境下でコンパイルエラーが出ない TypeScript を書く感覚を掴む。

## 進め方
- 制限時間: 45〜60分
- 推奨配分
  - Part A: 15分
  - Part B: 15分
  - Part C: 15分
- コードは実際に `tsc` でコンパイルして確認してから回答する。
- 回答後に解答ファイルで自己採点する。

---

## Part A: 型注釈（15分）

### Q1
以下の JavaScript 関数を、型注釈を付けた TypeScript に書き換えてください。
引数・戻り値すべてに型を付けること。

```js
function calcTotal(price, count) {
  return price * count;
}
```

### A1
```ts
function calcTotal(price: number, count: number) :number {
  return price * count;
}
```

---

### Q2
以下の変数宣言に適切な型注釈を追加してください。

```ts
let productName = "ペン";
let price = 120;
let inStock = true;
let deletedAt = null;
```

### A2
```ts
let productName :string = "ペン";
let price :number = 120;
let inStock :boolean = true;
let deletedAt :null = null;
```

---

### Q3
以下の配列に型注釈を付け、誤った型の要素を追加しようとしている行をコメントで指摘してください。

```ts
const skus = ["A-001", "A-002", "B-001"];

skus.push("C-001");
skus.push(999);
skus.push(true);
```

### A3
```ts
const skus: string[] = ["A-001", "A-002", "B-001"];

skus.push("C-001");
skus.push(999); // 誤った型の要素
skus.push(true); // 誤った型の要素
```

---

## Part B: interface / type（15分）

### Q4
以下の仕様を満たす `interface` を定義してください。

- 名前: `Item`
- フィールド: `id`（数値）、`name`（文字列）、`category`（文字列）、`price`（数値）

その後、以下の変数 `pen` を `Item` 型として宣言してコンパイルが通るように値を入れてください。

```ts
// interface を定義する

// pen を Item 型として宣言する
const pen = {
  id: 1,
  name: "ペン",
  category: "文具",
  price: 120,
};
```

### A4
```ts
interface Item {
  id: number,
  name: string,
  category: string,
  price: number,
}

const pen: Item = {
  id: 1,
  name: "ペン",
  category: "文具",
  price: 120,
};
```

---

### Q5
以下の仕様を満たす `type` を定義してください。

- `MovementType`: `"in"` または `"out"` のみ受け付けるユニオン型
- `StockMovement`: `sku`（文字列）・`type`（MovementType）・`qty`（数値）を持つオブジェクト型

定義後、以下の変数に型を付けてコンパイルエラーになる行を1つ作り、理由をコメントで書いてください。

```ts
// type を定義する

const m1 = { sku: "A-001", type: "in",      qty: 100 };
const m2 = { sku: "B-001", type: "out",     qty: 30  };
const m3 = { sku: "C-001", type: "invalid", qty: 10  }; // ← これはどうなるか？
```

### A5
```ts
type MovementType = 'in' | 'out';
type StockMovement = {
  sku: string,
  type: MovementType,
  qty: number,
}

const m1: StockMovement = { sku: "A-001", type: "in",      qty: 100 };
const m2: StockMovement = { sku: "B-001", type: "out",     qty: 30  };
const m3: StockMovement = { sku: "C-001", type: "invalid", qty: 10  }; // MovementType型で定義されていない 'invalid' が与えられているためコンパイルエラーとなる
```

---

### Q6
Q4 の `Item` を `extends` で拡張した `interface ItemWithStock` を定義してください。
追加フィールド: `qty`（数値）

その後、`ItemWithStock` 型の変数 `notebook` を宣言して値を入れてください。

### A6
```ts
interface Item {
  id: number,
  name: string,
  category: string,
  price: number,
}

interface ItemWithStock extends Item {
  qty: number
}

const notebook: ItemWithStock = {
  id: 1,
  name: "ノート",
  category: "文具",
  price: 150,
  qty:10,
};
```

---

## Part C: Null 安全性（15分）

### Q7
`strict: true` の環境で以下のコードはコンパイルエラーになります。
エラーの理由を説明し、コンパイルが通るように修正してください。

```ts
let name: string = null;
```

### A7
エラーの理由:
変数 name が nullを許容していないためコンパイルエラーとなる

修正後:
```ts
let name: string | null = null;
```

---

### Q8
以下の関数は `Item | undefined` を返します。
`strict: true` の環境でコンパイルエラーにならないよう、`item.name` を安全に参照するコードを2通り書いてください。

```ts
interface Item {
  id: number;
  name: string;
}

const items: Item[] = [
  { id: 1, name: "ペン" },
  { id: 2, name: "ノート" },
];

function findItem(id: number): Item | undefined {
  return items.find(i => i.id === id);
}

const item = findItem(99);

// ① if チェックで安全に参照する
// ② オプショナルチェーン（?.）で安全に参照する
```

### A8
```ts
interface Item {
  id: number;
  name: string;
}

const items: Item[] = [
  { id: 1, name: "ペン" },
  { id: 2, name: "ノート" },
];

function findItem(id: number): Item | undefined {
  return items.find(i => i.id === id);
}

const item = findItem(99);

// ① if チェックで安全に参照する
if (item != null) {
  console.log(item.name)
}

// ② オプショナルチェーン（?.）で安全に参照する
console.log(item?.name);
```

---

### Q9
以下の関数の引数 `deletedAt` は「日時文字列 または null」を受け取ります。
null のときは `"削除なし"` を返し、それ以外はそのまま返す関数を TypeScript で実装してください。

```ts
function formatDeletedAt(deletedAt) {
  // ここを実装する
}
```

### A9
```ts
function formatDeletedAt(deletedAt: string | null) : string {
  return deletedAt === null ? '削除なし' : deletedAt;
}
```

---

## 自己採点（目安）
- 8〜9問正答: Day4へ進行
- 5〜7問正答: interface/type（Part B）を再演習
- 0〜4問正答: Day3 導入ガイドを読み直してから再チャレンジ

## Claude共有テンプレ
以下をそのまま貼って共有してください。

- 実施日:
- 所要時間:
- 正答数:
- 間違えた問題番号:
- つまずいた理由:
- 明日の改善ポイント:
