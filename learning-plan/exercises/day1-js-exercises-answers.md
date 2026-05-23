# Day1 演習セット 解答・解説

## Part A

### A1
- 出力
  - 1行目: undefined
  - 2行目: 10
- 解説
  - var宣言は巻き上げされ、宣言だけ先に処理される。

### A2
- 結果
  - ReferenceError
- 解説
  - letはTDZの影響で初期化前アクセス不可。

### A3
- 出力
  - var 3
  - var 3
  - var 3
  - let 0
  - let 1
  - let 2
- 解説
  - varは関数スコープでループ終了後のiを参照。
  - letはブロックスコープで各反復ごとに値が分離される。

### A4（例）
- varはスコープが広く、非同期処理と組み合わせると意図しない値参照が起きやすい。
- let/constはブロックスコープで安全。再代入不要ならconstを基本にし、変更が必要な場合のみletを使う。

## Part B

### B5
- 正答
  - A, D, C, B
- 解説
  - 同期処理が先、Promise.thenはMicrotask、setTimeoutはMacrotask。

### B6
- 正答
  - 1, 5, 4, 2, 3
- 解説
  - まず同期の1,5。
  - 次にMicrotaskの4。
  - その後setTimeoutコールバックで2。
  - そのコールバック内で積まれたMicrotaskの3。

## Part C

### C7
- 要件A
  - Promise.all
  - 理由: 1つ失敗で全体失敗にしたい要件に一致。
- 要件B
  - Promise.allSettled
  - 理由: 成功/失敗を個別判定でき、部分表示に向く。

### C8
- 問題点（代表）
  - API呼び出しが逐次実行になっており、待ち時間が長い。
- 改善案（例）

```js
async function loadDashboard() {
  const [productsRes, stocksRes, categoriesRes] = await Promise.all([
    fetch("/api/products"),
    fetch("/api/stocks"),
    fetch("/api/categories")
  ]);

  const [products, stocks, categories] = await Promise.all([
    productsRes.json(),
    stocksRes.json(),
    categoriesRes.json()
  ]);

  return { products, stocks, categories };
}
```

## Part D

### D9（例）

```js
const totalQty = stocks.reduce((sum, row) => sum + row.qty, 0);
```

### D10（例）

```js
const byCategory = items.reduce((acc, row) => {
  acc[row.category] = (acc[row.category] ?? 0) + row.qty;
  return acc;
}, {});
```

## 判定の目安
- 8〜10問正答
  - Day2へ進行
- 5〜7問正答
  - Promise系とイベントループを再演習
- 0〜4問正答
  - まずPart A/Bを重点復習

## 次アクション
- 解答後、結果を learning-plan/assessments/4week-personalized-schedule.md に追記する。
