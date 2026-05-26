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