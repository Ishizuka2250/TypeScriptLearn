# Day2 演習セット（45〜60分）

## 目的
- Promise の並列実行パターンを在庫APIの文脈で実装できるようにする。
- reduce の応用（グループ化・最大値探索・入出庫集計）を自力で書けるようにする。

## 進め方
- 制限時間: 45〜60分
- 推奨配分
  - Part A: 15分
  - Part B: 15分
  - Part C: 15分
- コードは実際に動かして確認してから回答する。
- 回答後に解答ファイルで自己採点する。

---

## Part A: Promise.all（15分）

### Q1
以下の逐次実行コードを `Promise.all` を使った並列実行に書き換えてください。

```js
async function loadDashboard() {
  const products = await fetch("/api/products").then(r => r.json());
  const stocks = await fetch("/api/stocks").then(r => r.json());
  const categories = await fetch("/api/categories").then(r => r.json());
  return { products, stocks, categories };
}
```

### A1
```js
async function loadDashboard() {
  return await Promise.all([
    fetch("/api/products").then(r => r.json(),
    fetch("/api/stocks").then(r => r.json()),
    fetch("/api/categories").then(r => r.json())
  ]);
}
```


### Q2
以下のコードには構文上の問題が1つあります。問題点を指摘して修正してください。

```js
async function loadItems() {
  const [products, stocks] = await Promise.all(
    fetch("/api/products").then(r => r.json()),
    fetch("/api/stocks").then(r => r.json())
  );
  return { products, stocks };
}
```

### A2
```js
async function loadItems() {
  const [products, stocks] = await Promise.all([
    fetch("/api/products").then(r => r.json()),
    fetch("/api/stocks").then(r => r.json())
  ]);
  return { products, stocks };
}
→ 配列でPromise.all()の引数に渡していない.
```

### Q3
`Promise.all` で3つのAPIを並列取得しているとき、2番目のAPIだけが失敗した場合、どうなるか説明してください。また、その挙動が以下の要件に合っているかどうか答えてください。

- 要件: 商品一覧・在庫・カテゴリのどれか1つでも失敗したら、画面全体をエラー表示にしてよい。

### A3
2番目のAPIが失敗した時点で、そのエラー内容が返却される。
"商品一覧・在庫・カテゴリのどれか1つでも失敗したら" という要件なので、Promise.allの実装で問題ない。


---

## Part B: Promise.allSettled（15分）

### Q4
以下の要件を満たすコードを実装してください。

- 商品API・在庫API・カテゴリAPIを並列取得する。
- 失敗したAPIは `null` として扱い、成功したデータだけ使う。
- 返り値は `{ products, stocks, categories }` の形式にする（失敗分は `null`）。

```js
async function loadDashboard() {
  // ここを実装する
}
```

### A4
```js
async function loadDashboard() {
  return await Promise.allSettled([
    fetch('api/products').then(r => r.json()).catch(() => return null),
    fetch('api/stocks').then(r => r.json()).catch(() => return null),
    fetch('api/categories').then(r => r.json()).catch(() => return null),
  ]);
}
```


### Q5
`Promise.allSettled` の結果を受け取り、`fulfilled`（成功）と `rejected`（失敗）に分類して返す関数 `splitResults` を実装してください。

```js
// 使用例
const results = await Promise.allSettled([
  fetch("/api/products").then(r => r.json()),
  fetch("/api/stocks").then(r => r.json()),
  fetch("/api/categories").then(r => r.json()),
]);

const { fulfilled, rejected } = splitResults(results);
// fulfilled: 成功した結果の value の配列
// rejected:  失敗した結果の reason の配列

function splitResults(results) {
  // ここを実装する
}
```

### A5
```js
// 使用例
const results = await Promise.allSettled([
  fetch("/api/products").then(r => r.json()),
  fetch("/api/stocks").then(r => r.json()),
  fetch("/api/categories").then(r => r.json()),
]);

const { fulfilled, rejected } = splitResults(results);
// fulfilled: 成功した結果の value の配列
// rejected:  失敗した結果の reason の配列

function splitResults(results) {
  output = {
    fulfilled:[],
    rejected:[]
  };
  results.map((result) => {
    if (result.status === 'fulfilled') {
      output.fulfilled.push(result.value);
    } else {
      output.fulfilled.push(result.reason);
    }
  });
  return output;
}
```


### Q6
`Promise.all` と `Promise.allSettled` について、在庫管理システムの文脈で使い分けの基準を自分の言葉で説明してください。

### A6
在庫管理システム内の在庫数などズレが許されず、すべてのタスクが必ず完了していなければならない時に promise.all を使用し
それ以外の重要ではないがいずれかの読み込み/書き込みが成功していればよい (失敗したタスクは別途再実行する) パターンで
promise.allSettled を使用する。 

---

## Part C: reduce 発展（15分）

### Q7
以下の配列から、カテゴリ別の商品名リストを `reduce` で作成してください。

```js
const items = [
  { name: "pen",   category: "stationery" },
  { name: "note",  category: "stationery" },
  { name: "mug",   category: "kitchen"    },
  { name: "plate", category: "kitchen"    },
];
```

期待形:

```js
{
  stationery: ["pen", "note"],
  kitchen: ["mug", "plate"]
}
```

### A7

```
const items = [
  { name: "pen",   category: "stationery" },
  { name: "note",  category: "stationery" },
  { name: "mug",   category: "kitchen"    },
  { name: "plate", category: "kitchen"    },
];

const result = items.reduce((acc,cur) => {
    if (acc[cur.category] == null) acc[cur.category] = [cur.name];
    acc[cur.category].push(cur.name);
    return acc;
},{});

console.log(result);
```

### Q8
以下の配列から、在庫数が最も多い商品を `reduce` で見つけてください（`Math.max` や `sort` は使わないこと）。

```js
const stocks = [
  { sku: "A", qty: 10 },
  { sku: "B", qty: 25 },
  { sku: "C", qty: 7  },
];
```

期待形:

```js
{ sku: "B", qty: 25 }
```

### A8
```
const stocks = [
  { sku: "A", qty: 10 },
  { sku: "B", qty: 25 },
  { sku: "C", qty: 7  },
];

const result = stocks.reduce((acc,cur) => {
    return acc.qty < cur.qty ? {sku: cur.sku, qty: cur.qty} : acc;
}, {sku:'', qty:0});


console.log(result);
```


### Q9
以下の入出庫履歴から、SKU別の現在在庫数を `reduce` で計算してください。

```js
const movements = [
  { sku: "A", type: "in",  qty: 100 },
  { sku: "B", type: "in",  qty: 50  },
  { sku: "A", type: "out", qty: 30  },
  { sku: "B", type: "out", qty: 20  },
  { sku: "A", type: "in",  qty: 10  },
];
```

期待形:

```js
{ A: 80, B: 30 }
```

### A9
```
const movements = [
  { sku: "A", type: "in",  qty: 100 },
  { sku: "B", type: "in",  qty: 50  },
  { sku: "A", type: "out", qty: 30  },
  { sku: "B", type: "out", qty: 20  },
  { sku: "A", type: "in",  qty: 10  },
];

const result = movements.reduce((acc, cur) => {
    if (acc[cur.sku] == null) acc[cur.sku] = 0;
    acc[cur.sku] += cur.type === 'in' ? cur.qty : -cur.qty;
    console.log(`${cur.sku} ${acc[cur.sku]}`);
    return acc;
},{});

console.log(result);
```

---

## 自己採点（目安）
- 8〜9問正答: Day3へ進行
- 5〜7問正答: Promise系（Part A/B）を再演習
- 0〜4問正答: Day2をもう1セット実施

## Claude共有テンプレ
以下をそのまま貼って共有してください。

- 実施日:
- 所要時間:
- 正答数:
- 間違えた問題番号:
- つまずいた理由:
- 明日の改善ポイント:
