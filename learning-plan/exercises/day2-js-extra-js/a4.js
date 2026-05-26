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