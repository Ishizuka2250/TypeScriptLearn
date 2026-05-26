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