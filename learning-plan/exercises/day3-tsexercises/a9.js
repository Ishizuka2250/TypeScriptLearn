"use strict";
function formatDeletedAt(deletedAt) {
    return deletedAt === null ? '削除なし' : deletedAt;
}
console.log(formatDeletedAt('2026/05/28'));
console.log(formatDeletedAt(null));
