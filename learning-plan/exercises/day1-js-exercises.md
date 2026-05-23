# Day1 演習セット（30〜45分）

## 目的
- JavaScriptの認識差が出やすい4領域を短時間で補強する。
- 対象領域: スコープ/巻き上げ、イベントループ、Promise合成、reduce。

## 進め方
- 制限時間: 30〜45分
- 推奨配分
  - Part A: 10分
  - Part B: 10分
  - Part C: 10分
  - Part D: 10分
- 回答後に解答ファイルで自己採点する。

## Part A: スコープと巻き上げ（10分）

### Q1
次のコードの出力を答えてください。

```js
console.log(a);
var a = 10;
console.log(a);
```
### A1
出力結果:
> Undefined
> 10

### Q2
次のコードは何が起きるか答えてください。

```js
console.log(b);
let b = 20;
```
### A2
ReferenceErrorになる

### Q3
次のコードの出力を答えてください。

```js
const items = [1, 2, 3];
for (var i = 0; i < items.length; i++) {
  setTimeout(() => console.log("var", i), 0);
}
for (let j = 0; j < items.length; j++) {
  setTimeout(() => console.log("let", j), 0);
}
```

### A3
出力結果：
> var3
> var3
> var3
> let0
> let1
> let2

### Q4
在庫テーブルを想定し、次を説明してください。
- varを使うと事故りやすい理由
- let/constを基本にする理由

### A4
- varを使うと事故りやすい理由
→ varが関数スコープであるため、在庫テーブルのデータをforで参照しようと思った場合、実装者の意図した内容と異なるデータを参照する可能性がある

- let/constを基本にする理由
→ let/constがブロックスコープであり、forループを回した際に意図した値を取得する事ができるため

## Part B: イベントループ（10分）

### Q5
出力順を答えてください。

```js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
```

### A5
出力結果：
> A
> D
> C
> B

### Q6
次のコードの出力順を答えてください。

```js
console.log(1);
setTimeout(() => {
  console.log(2);
  Promise.resolve().then(() => console.log(3));
}, 0);
Promise.resolve().then(() => console.log(4));
console.log(5);
```

### A6
> 1
> 5
> 4
> 2
> 3

## Part C: Promise合成（10分）

### Q7
次の要件で、Promise.all と Promise.allSettled のどちらを使うべきか選んで理由を1〜2文で書いてください。
- 要件A: 商品一覧API、在庫API、カテゴリAPIを同時取得し、1つでも失敗したら画面はエラー表示でよい。
- 要件B: 上記3APIを同時取得し、失敗したAPIは警告表示にして取得できたデータだけ画面表示したい。

### A7
- 要件A: 商品一覧API、在庫API、カテゴリAPIを同時取得し、1つでも失敗したら画面はエラー表示でよい。
商品一覧API、在庫API、カテゴリAPIのいずれも成功した状態で処理を進める必要があるため、 Promise.all を使用する。

- 要件B: 上記3APIを同時取得し、失敗したAPIは警告表示にして取得できたデータだけ画面表示したい。
商品一覧API、在庫API、カテゴリAPIのいずれかの取得で処理を進めるため、Promise.allSettled を使用する。

### Q8
次のコードの問題点を1つ挙げて改善案を書いてください。

```js
async function loadDashboard() {
  const products = await fetch("/api/products").then((r) => r.json());
  const stocks = await fetch("/api/stocks").then((r) => r.json());
  const categories = await fetch("/api/categories").then((r) => r.json());
  return { products, stocks, categories };
}
```

### A8
全てのAPIが成功する想定でしか組まれていない。
要件の内容にもよるが、products, stocks, categories をPromiseとして定義して
Promise.all もしくは Promise.allSettled を使用した実装に変更してエラーに対処した実装に変更する

## Part D: reduce（10分）

### Q9
次の配列から、全商品の在庫総数を reduce で計算してください。

```js
const stocks = [
  { sku: "A", qty: 10 },
  { sku: "B", qty: 5 },
  { sku: "C", qty: 12 }
];
```

### A9
```
const stocks = [
  { sku: "A", qty: 10 },
  { sku: "B", qty: 5 },
  { sku: "C", qty: 12 }
];
const result = stocks.reduce((accumulator, current) => accumulator + current.qty, 0);
console.logs(result);
```

### Q10
次の配列を、カテゴリ別合計在庫に変換してください。

```js
const items = [
  { name: "pen", category: "stationery", qty: 10 },
  { name: "note", category: "stationery", qty: 5 },
  { name: "mug", category: "kitchen", qty: 7 }
];
```

期待形:

```js
{
  stationery: 15,
  kitchen: 7
}
```

### A10
```
  const items = [
    { name: "pen", category: "stationery", qty: 10 },
    { name: "note", category: "stationery", qty: 5 },
    { name: "mug", category: "kitchen", qty: 7 }
  ];
  const output = items.reduce(
    (accumulator, current) => {
      if (accumulator[current.category] == null) {
        accumulator[current.category] = current.qty;
      } else {
        accumulator[current.category] += current.qty;
      }
      return accumulator;
    }, {});
  console.log(output);
```

## 自己採点（目安）
- 8〜10問正答: Day2へ進んでOK
- 5〜7問正答: Day1をもう1セット実施
- 0〜4問正答: Part A/Bを重点復習

## Claude共有テンプレ
以下をそのまま貼って共有してください。

- 実施日:
- 所要時間:
- 正答数:
- 間違えた問題番号:
- つまずいた理由:
- 明日の改善ポイント:
