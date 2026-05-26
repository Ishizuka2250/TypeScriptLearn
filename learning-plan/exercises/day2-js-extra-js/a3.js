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
    console.log("エラー発生時刻(ms):", Date.now() - time);
  }
}
var time = Date.now()
console.log("開始時刻(ms):", time);
main();