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
