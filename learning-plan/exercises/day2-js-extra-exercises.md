# Day2 追加演習 — Promise.all / Promise.allSettled 再演習（30〜40分）

## 目的
- Promise.all / Promise.allSettled の動きを実際に手を動かして確認する。
- 前回ミスした「戻り値の形式」「allSettled の結果構造」「null フォールバックの2パターン」を定着させる。

## 実行方法
```
node <ファイル名>.js
```

## 共通ヘルパー（各問題の先頭に貼って使う）

```js
// ms 後に value を返す。fail=true のときは Error を投げる。
function mockAsync(value, ms, fail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) reject(new Error(`失敗: ${JSON.stringify(value)}`));
      else resolve(value);
    }, ms);
  });
}
```

---

## Part A: Promise.all（15分）

### Q1
以下の逐次実行を `Promise.all` を使った並列実行に書き換えてください。
**戻り値は `{ products, stocks, categories }` のオブジェクト形式**にすること。
`console.time` でかかった時間を計測して、逐次と並列の差を確認してください。

```js
function mockAsync(value, ms, fail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) reject(new Error(`失敗: ${JSON.stringify(value)}`));
      else resolve(value);
    }, ms);
  });
}

// 逐次実行（約600ms かかる）
async function loadDashboard_sequential() {
  console.time("sequential");
  const products   = await mockAsync([{ id: 1, name: "ペン" }],   300);
  const stocks     = await mockAsync([{ sku: "A", qty: 10 }],     200);
  const categories = await mockAsync(["文具", "キッチン"],          100);
  console.timeEnd("sequential");
  return { products, stocks, categories };
}

// 並列実行に書き換える（約300ms になるはず）
async function loadDashboard_parallel() {
  console.time("parallel");
  // ここを実装する
  console.timeEnd("parallel");
}

(async () => {
  console.log(await loadDashboard_sequential());
  console.log(await loadDashboard_parallel());
})();
```

### A1
```
function mockAsync(value, ms, fail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (fail) reject(new Error(`失敗: ${JSON.stringify(value)}`));
            else resolve(value);
        }, ms);
    });
}

// 逐次実行（約600ms かかる）
async function loadDashboard_sequential() {
    console.time("sequential");
    const products     = await mockAsync([{ id: 1, name: "ペン" }],     300);
    const stocks         = await mockAsync([{ sku: "A", qty: 10 }],         200);
    const categories = await mockAsync(["文具", "キッチン"],                    100);
    console.timeEnd("sequential");
    return { products, stocks, categories };
}

// 並列実行に書き換える（約300ms になるはず）
async function loadDashboard_parallel() {
    console.time("parallel");
    const [products, stocks, categories] = await Promise.all([
        mockAsync([{ id: 1, name: "ペン" }], 300),
        mockAsync([{ sku: "A", qty: 10 }], 200),
        mockAsync(["文具", "キッチン"], 100)
    ]);
    console.timeEnd("parallel");
    return {products, stocks, categories}
}

(async () => {
    console.log(await loadDashboard_sequential());
    console.log(await loadDashboard_parallel());
})();


console.log("XXXXXXXX")
```


---

### Q2
以下のコードには問題が2つあります。それぞれ指摘して修正してください。

```js
function mockAsync(value, ms, fail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) reject(new Error(`失敗: ${JSON.stringify(value)}`));
      else resolve(value);
    }, ms);
  });
}

async function loadItems() {
  const { products, stocks } = await Promise.all([
    mockAsync({ name: "商品一覧" }, 200),
    mockAsync({ count: 50 },       100),
  ]);
  return { products, stocks };
}

(async () => {
  console.log(await loadItems());
})();
```

ヒント: 実行してエラーメッセージを確認するところから始めてください。

### A2
```
function mockAsync(value, ms, fail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) reject(new Error(`失敗: ${JSON.stringify(value)}`));
      else resolve(value);
    }, ms);
  });
}

async function loadItems() {
  const [ products, stocks ] = await Promise.all([
    await mockAsync({ name: "商品一覧" }, 200),
    await mockAsync({ count: 50 },       100),
  ]);
  return { products, stocks };
}

(async () => {
  console.log(await loadItems());
})();
```

---

### Q3
以下のコードを実行して、出力を確認してください。その上で問いに答えてください。

```js
function mockAsync(value, ms, fail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) reject(new Error(`失敗: ${JSON.stringify(value)}`));
      else resolve(value);
    }, ms);
  });
}

async function main() {
  try {
    const result = await Promise.all([
      mockAsync("商品一覧", 300),
      mockAsync("在庫",     100, true),  // 100ms後に失敗
      mockAsync("カテゴリ", 200),
    ]);
    console.log("成功:", result);
  } catch (e) {
    console.log("エラー:", e.message);
    console.log("エラー発生時刻(ms):", Date.now());
  }
}

console.log("開始時刻(ms):", Date.now());
main();
```

**問い:**
1. 何ms後にエラーが出力されましたか？　なぜその時間になりますか？
2. 1番目（300ms）と3番目（200ms）の処理はどうなりますか？
3. 以下の要件に `Promise.all` は適切ですか？理由も答えてください。
   - 要件: 商品・在庫・カテゴリのどれか1つでも失敗したら、画面全体をエラー表示にする。

### A3
1. 112ms 後に処理が失敗しエラー出力された。
300ms, 200ms, 100msのタスクが並列実行されるが、100msの時点で実行失敗するため。
2. 2番目の処理が失敗した時点で、1番目と3番目の処理は停止される。
3. Promise.allは、複数処理のうち1つでも失敗すると後続の処理が停止され、エラーが返却されるため、この要件に合致している。

---

## Part B: Promise.allSettled（15分）

### Q4
以下の要件を満たすコードを実装してください。

- 商品・在庫・カテゴリを並列取得する。
- 失敗したものは `null` として扱い、成功したデータだけ使う。
- 戻り値は `{ products, stocks, categories }` の形式（失敗分は `null`）。

**実装パターンは2種類あります。両方実装して、結果が同じになることを確認してください。**

```js
function mockAsync(value, ms, fail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) reject(new Error(`失敗: ${JSON.stringify(value)}`));
      else resolve(value);
    }, ms);
  });
}

// パターン1: Promise.all + .catch(() => null) を使う
async function loadDashboard_v1() {
  // ここを実装する
}

// パターン2: Promise.allSettled + .map() を使う
// ヒント: allSettled の結果は [{status:'fulfilled', value:...}, {status:'rejected', reason:...}] の形
async function loadDashboard_v2() {
  // ここを実装する
}

(async () => {
  // 2番目（在庫）だけ失敗させる
  console.log("v1:", await loadDashboard_v1());
  console.log("v2:", await loadDashboard_v2());
  // 期待: { products: {...}, stocks: null, categories: {...} }
})();
```

### A4
```
function mockAsync(value, ms, fail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) reject(new Error(`失敗: ${JSON.stringify(value)}`));
      else resolve(value);
    }, ms);
  });
}

// パターン1: Promise.all + .catch(() => null) を使う
async function loadDashboard_v1() {
    const [ products, stocks, categories ] = await Promise.all([
      mockAsync({ id: 1, name: "ペン" }, 200).catch(r => null),
      mockAsync({ sku: "A", qty: 10 }, 100, true).catch(r => null),  // 100ms後に失敗
      mockAsync(["文具", "キッチン"], 150).catch(r => null),
    ]);
    return { products, stocks, categories };
}

// パターン2: Promise.allSettled + .map() を使う
// ヒント: allSettled の結果は [{status:'fulfilled', value:...}, {status:'rejected', reason:...}] の形
async function loadDashboard_v2() {
    const results = await Promise.allSettled([
      mockAsync({ id: 1, name: "ペン" }, 200),
      mockAsync({ sku: "A", qty: 10 }, 100, true),  // 100ms後に失敗
      mockAsync(["文具", "キッチン"], 150),
    ]);
    const [ products, stocks, categories ] = results.map((r) => {
        if (r.status === 'fulfilled') {
            return r.value;
        } else {
            return null;
        }
    });
    return { products: products, stocks: stocks, categories: categories };
}

(async () => {
  // 2番目（在庫）だけ失敗させる
  console.log("v1:", await loadDashboard_v1());
     console.log("v2:", await loadDashboard_v2());
  // 期待: { products: {...}, stocks: null, categories: {...} }
})();
```

---

### Q5
以下の `splitResults` 関数にはバグが1つあります。
実行して出力を確認し、バグを特定して修正してください。

```js
function mockAsync(value, ms, fail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) reject(new Error(`失敗: ${JSON.stringify(value)}`));
      else resolve(value);
    }, ms);
  });
}

function splitResults(results) {
  const output = {
    fulfilled: [],
    rejected:  [],
  };
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      output.fulfilled.push(result.value);
    } else {
      output.fulfilled.push(result.reason.message);  // ← バグ
    }
  });
  return output;
}

(async () => {
  const results = await Promise.allSettled([
    mockAsync("商品一覧", 100),
    mockAsync("在庫",     100, true),
    mockAsync("カテゴリ", 100),
  ]);

  const { fulfilled, rejected } = splitResults(results);
  console.log("fulfilled:", fulfilled);
  console.log("rejected:",  rejected);
  // 期待:
  // fulfilled: ["商品一覧", "カテゴリ"]
  // rejected:  ["失敗: \"在庫\""]
})();
```

### A5
```
function mockAsync(value, ms, fail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fail) reject(new Error(`失敗: ${JSON.stringify(value)}`));
      else resolve(value);
    }, ms);
  });
}

function splitResults(results) {
  const output = {
    fulfilled: [],
    rejected:  [],
  };
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      output.fulfilled.push(result.value);
    } else {
      output.rejected.push(result.reason.message);  // ← バグ
    }
  });
  return output;
}

(async () => {
  const results = await Promise.allSettled([
    mockAsync("商品一覧", 100),
    mockAsync("在庫",     100, true),
    mockAsync("カテゴリ", 100),
  ]);

  const { fulfilled, rejected } = splitResults(results);
  console.log("fulfilled:", fulfilled);
  console.log("rejected:",  rejected);
  // 期待:
  // fulfilled: ["商品一覧", "カテゴリ"]
  // rejected:  ["失敗: \"在庫\""]
})();
```

---

## 自己採点（目安）
- 5問正答: Day3（TypeScript導入）へ進行
- 3〜4問正答: Q4の2パターンを再確認してから進む
- 0〜2問正答: Part A/B をもう1周

## Claude共有テンプレ
以下をそのまま貼って共有してください。

- 実施日:
- 所要時間:
- 正答数:
- 間違えた問題番号:
- つまずいた理由:
- 明日の改善ポイント:
