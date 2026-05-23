# Day2 演習セット 解答・解説

## Part A: Promise.all

### A1
- 正答

```js
async function loadDashboard() {
  const [products, stocks, categories] = await Promise.all([
    fetch("/api/products").then(r => r.json()),
    fetch("/api/stocks").then(r => r.json()),
    fetch("/api/categories").then(r => r.json()),
  ]);
  return { products, stocks, categories };
}
```

- 解説
  - 3つの `await` を直列に書くと合計待ち時間 = 3APIの合算になる。
  - `Promise.all` に配列で渡すと3つが同時に開始され、全部完了した時点で結果が揃う。
  - 分割代入 `[a, b, c]` で配列の順番どおりに受け取れる。

### A2
- 問題点: `Promise.all` の引数が配列になっていない。
- 正答

```js
async function loadItems() {
  const [products, stocks] = await Promise.all([  // [] で囲む
    fetch("/api/products").then(r => r.json()),
    fetch("/api/stocks").then(r => r.json()),
  ]);
  return { products, stocks };
}
```

- 解説
  - `Promise.all` は `Iterable`（配列など）を1つ受け取る。
  - 複数の引数を渡しても2番目以降は無視されるため、配列に入れる必要がある。

### A3
- 挙動: 2番目のAPIが失敗（reject）した時点で `Promise.all` 全体が即座に reject される。1番目・3番目の結果は捨てられる。
- 要件との一致: **合っている**。「1つでも失敗したら画面全体をエラー表示」という要件は、`Promise.all` が1件の失敗で全体 reject する挙動と一致する。

---

## Part B: Promise.allSettled

### A4
- 正答

```js
async function loadDashboard() {
  const [productsResult, stocksResult, categoriesResult] = await Promise.allSettled([
    fetch("/api/products").then(r => r.json()),
    fetch("/api/stocks").then(r => r.json()),
    fetch("/api/categories").then(r => r.json()),
  ]);

  return {
    products:   productsResult.status   === "fulfilled" ? productsResult.value   : null,
    stocks:     stocksResult.status     === "fulfilled" ? stocksResult.value     : null,
    categories: categoriesResult.status === "fulfilled" ? categoriesResult.value : null,
  };
}
```

- 解説
  - `Promise.allSettled` は全Promiseが完了するまで待ち、各結果を `{ status, value | reason }` の形で返す。
  - `status === "fulfilled"` なら `.value`、`"rejected"` なら `.reason` が入る。

### A5
- 正答

```js
function splitResults(results) {
  return results.reduce(
    (acc, result) => {
      if (result.status === "fulfilled") {
        acc.fulfilled.push(result.value);
      } else {
        acc.rejected.push(result.reason);
      }
      return acc;
    },
    { fulfilled: [], rejected: [] }
  );
}
```

- 解説
  - `reduce` の初期値を `{ fulfilled: [], rejected: [] }` にすることで、1回のループで2つの配列に振り分けられる。
  - Day1 の Q10（カテゴリ別集計）と構造が同じ。初期値をオブジェクトにし、条件で配列を選ぶだけ。

### A6
- 使い分けの基準（例）
  - `Promise.all`: 全データが揃わないと画面が成立しない場合。1つでも欠けると表示できないとき。例: 在庫詳細ページで商品情報・在庫数・カテゴリ名のどれかが取れないと表示内容が不完全になる。
  - `Promise.allSettled`: 一部が失敗しても残りのデータで画面を出せる場合。例: ダッシュボードで商品リストは表示できるが、在庫APIが落ちているときはその列だけ「取得失敗」と表示する。

---

## Part C: reduce 発展

### A7
- 正答

```js
const result = items.reduce((acc, item) => {
  if (acc[item.category] == null) {
    acc[item.category] = [];
  }
  acc[item.category].push(item.name);
  return acc;
}, {});
```

- 別解（`??=` 演算子を使う場合）

```js
const result = items.reduce((acc, item) => {
  (acc[item.category] ??= []).push(item.name);
  return acc;
}, {});
```

- 解説
  - Day1 Q10 の「数値を足す」を「配列に push する」に置き換えただけ。
  - キーが存在しない場合に空配列で初期化してから push するのがポイント。

### A8
- 正答

```js
const maxStock = stocks.reduce((max, current) => {
  return current.qty > max.qty ? current : max;
});
```

- 解説
  - 初期値を省略すると配列の先頭要素が初期 `max` になる。
  - 各要素と比較して `qty` が大きければ入れ替える。最終的に最大の要素が残る。
  - 初期値を省略できるのは「配列の要素と同じ型で比較したい」ときに有効なパターン。

### A9
- 正答

```js
const currentStock = movements.reduce((acc, movement) => {
  if (acc[movement.sku] == null) {
    acc[movement.sku] = 0;
  }
  if (movement.type === "in") {
    acc[movement.sku] += movement.qty;
  } else {
    acc[movement.sku] -= movement.qty;
  }
  return acc;
}, {});
```

- 別解（`?? 0` を使う場合）

```js
const currentStock = movements.reduce((acc, { sku, type, qty }) => {
  acc[sku] = (acc[sku] ?? 0) + (type === "in" ? qty : -qty);
  return acc;
}, {});
```

- 解説
  - SKUをキーにして加算・減算を繰り返すことで、全履歴を1回のループで処理できる。
  - 在庫管理の核となるパターン。in/out の符号変換を三項演算子で簡潔に書ける。

---

## 判定の目安
- 8〜9問正答: Day3へ進行
- 5〜7問正答: Promise系（Part A/B）を再演習
- 0〜4問正答: Day2をもう1セット実施

## 次アクション
- 解答後、結果を learning-plan/assessments/4week-personalized-schedule.md に追記する。
