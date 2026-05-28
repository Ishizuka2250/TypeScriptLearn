"use strict";
const items = [
    { id: 1, name: "ペン" },
    { id: 2, name: "ノート" },
];
function findItem(id) {
    return items.find(i => i.id === id);
}
const item = findItem(99);
// ① if チェックで安全に参照する
if (item != null) {
    console.log(item.name);
}
// ② オプショナルチェーン（?.）で安全に参照する
console.log(item?.name);
