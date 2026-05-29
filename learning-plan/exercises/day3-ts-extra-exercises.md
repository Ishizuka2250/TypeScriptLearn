# Day3 追加演習（interface メソッド定義 / ジェネリクス）

## 目的
- `interface` にメソッドを定義し、`class` で実装する流れを習得する。
- ジェネリクス（`<T>`）を使って型安全な汎用コードを書けるようにする。

## 進め方
- 制限時間: 45〜60分
- 推奨配分
  - Part A（interface + class）: 25分
  - Part B（ジェネリクス）: 25分
- コードは実際に `tsc` でコンパイルして確認してから回答する。
- 各ファイルの末尾に `export {};` を付けてスコープを閉じること。

---

## Part A: interface メソッド定義 〜 class 実装（25分）

### Q1
以下の仕様を満たす `interface IRepository` を定義してください。

**仕様**
- メソッド `findById(id: number): Item | undefined`
- メソッド `save(item: Item): void`
- メソッド `findAll(): Item[]`

`Item` 型は以下を使用してください。

```ts
interface Item {
  id: number;
  name: string;
  price: number;
}
```

### A1
```ts
interface Item {
  id: number;
  name: string;
  price: number;
}
interface IRepository extends Item{
  findById(id: number): Item | undefined,
  save(item: Item): void,
  findAll(): Item[],
}
```

---

### Q2
Q1 で定義した `IRepository` を実装する `class ItemRepository` を作成してください。

**仕様**
- データ保持用のプライベートフィールド `items: Item[]` を持つ
- コンストラクタで `items` を空配列で初期化する
- `findById`: id が一致する要素を返す。なければ `undefined`
- `save`: `items` 配列に要素を追加する
- `findAll`: `items` 配列をそのまま返す

```ts
// 以下のコードがエラーなく動作すること
const repo = new ItemRepository();
repo.save({ id: 1, name: "ペン", price: 120 });
repo.save({ id: 2, name: "ノート", price: 150 });

console.log(repo.findAll());       // [{id:1,...}, {id:2,...}]
console.log(repo.findById(1));     // {id:1, name:"ペン", price:120}
console.log(repo.findById(99));    // undefined
```

### A2
```ts
interface Item {
  id: number;
  name: string;
  price: number;
}
interface IRepository {
  findById(id: number): Item | undefined,
  save(item: Item): void,
  findAll(): Item[],
}

class ItemRepository implements IRepository {
  private items: Item[];

  constructor() {
    this.items = new Array<Item>();
  }

  findById(id: number): Item | undefined {
    return this.items.find(item => item.id === id);
  }
  save(item: Item): void {
    this.items.push(item);
  }
  findAll(): Item[] {
    return this.items;
  }
}

// 以下のコードがエラーなく動作すること
const repo = new ItemRepository();
repo.save({ id: 1, name: "ペン", price: 120 });
repo.save({ id: 2, name: "ノート", price: 150 });

console.log(repo.findAll());       // [{id:1,...}, {id:2,...}]
console.log(repo.findById(1));     // {id:1, name:"ペン", price:120}
console.log(repo.findById(99));    // undefined
```

---

### Q3
`IRepository` に `delete(id: number): boolean` メソッドを追加してください。
合わせて `ItemRepository` にも実装を追加してください。

**仕様**
- 指定した `id` の要素を `items` から削除する
- 削除できた場合は `true`、該当なしの場合は `false` を返す

```ts
// 以下のコードがエラーなく動作すること
const repo = new ItemRepository();
repo.save({ id: 1, name: "ペン", price: 120 });

console.log(repo.delete(1));   // true
console.log(repo.delete(99));  // false
console.log(repo.findAll());   // []
```

### A3
```ts
interface Item {
  id: number;
  name: string;
  price: number;
}

interface IRepository {
  findById(id: number): Item | undefined,
  save(item: Item): void,
  findAll(): Item[],
  delete(id: number): boolean,
}

class ItemRepository implements IRepository {
  private items: Item[];

  constructor() {
    this.items = new Array<Item>();
  }

  findById(id: number): Item | undefined {
    return this.items.find(item => item.id === id);
  }
  save(item: Item): void {
    this.items.push(item);
  }
  findAll(): Item[] {
    return this.items;
  }
  delete(id: number): boolean {
    const target: number = this.items.findIndex(item => item?.id === id);
    return this.items.splice(target, 1).length > 0 ? true : false;
  }
}

// 以下のコードがエラーなく動作すること
const repo = new ItemRepository();
repo.save({ id: 1, name: "ペン", price: 120 });

console.log(repo.delete(1));   // true
console.log(repo.delete(99));  // false
console.log(repo.findAll());   // []
```

---

## Part B: ジェネリクス（25分）

### Q4
型引数 `T` を使ったジェネリック関数 `first` を実装してください。

**仕様**
- 引数: 型 `T` の配列
- 戻り値: 配列の最初の要素（`T`）。配列が空の場合は `undefined`
- 戻り値の型は `T | undefined`

```ts
// 以下のコードが型エラーなく動作すること
const a = first([1, 2, 3]);         // 型: number | undefined → 1
const b = first(["ペン", "ノート"]); // 型: string | undefined → "ペン"
const c = first([]);                 // 型: unknown | undefined → undefined
```

### A4
```ts
// ここに回答を記述する
```

---

### Q5
ジェネリック関数 `filterById` を実装してください。

**仕様**
- 型引数 `T` は `{ id: number }` を持つオブジェクトに制約する（`extends` を使う）
- 引数: `items: T[]`、`id: number`
- 戻り値: `id` が一致する要素（`T | undefined`）

```ts
interface Item {
  id: number;
  name: string;
}

interface User {
  id: number;
  email: string;
}

// 以下のコードが型エラーなく動作すること
const items: Item[] = [
  { id: 1, name: "ペン" },
  { id: 2, name: "ノート" },
];
const users: User[] = [
  { id: 1, email: "a@example.com" },
];

console.log(filterById(items, 1));  // { id: 1, name: "ペン" }
console.log(filterById(users, 1));  // { id: 1, email: "a@example.com" }
console.log(filterById(items, 99)); // undefined

// 以下はコンパイルエラーになること（id を持たない型は渡せない）
// filterById([1, 2, 3], 1);
```

### A5
```ts
// ここに回答を記述する
```

---

### Q6
ジェネリックな `class Stack<T>` を実装してください。

**仕様**
- プライベートフィールド `items: T[]`
- メソッド `push(item: T): void` — 末尾に追加
- メソッド `pop(): T | undefined` — 末尾から取り出す（空なら `undefined`）
- メソッド `peek(): T | undefined` — 末尾を取り出さずに返す（空なら `undefined`）
- メソッド `size(): number` — 要素数を返す

```ts
// 以下のコードが型エラーなく動作すること
const numStack = new Stack<number>();
numStack.push(1);
numStack.push(2);
numStack.push(3);
console.log(numStack.peek()); // 3
console.log(numStack.pop());  // 3
console.log(numStack.size()); // 2

const strStack = new Stack<string>();
strStack.push("入庫");
strStack.push("出庫");
console.log(strStack.pop());  // "出庫"

// 以下はコンパイルエラーになること
// numStack.push("文字列"); // number 型の Stack に string は追加不可
```

### A6
```ts
// ここに回答を記述する
```

---

## 自己採点（目安）
- 5〜6問正答: Day4（React 導入）へ進行
- 3〜4問正答: interface / ジェネリクスを読み直してから再チャレンジ
- 0〜2問正答: Day3 導入ガイドを再確認

## Claude共有テンプレ
以下をそのまま貼って共有してください。

- 実施日:
- 所要時間:
- 正答数:
- 間違えた問題番号:
- つまずいた理由:
- 明日の改善ポイント:
