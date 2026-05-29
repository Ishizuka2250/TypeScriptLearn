"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ItemRepository {
    constructor() {
        this.items = new Array();
    }
    findById(id) {
        return this.items.find(item => item.id === id);
    }
    save(item) {
        this.items.push(item);
    }
    findAll() {
        return this.items;
    }
}
// 以下のコードがエラーなく動作すること
const repo = new ItemRepository();
repo.save({ id: 1, name: "ペン", price: 120 });
repo.save({ id: 2, name: "ノート", price: 150 });
console.log(repo.findAll()); // [{id:1,...}, {id:2,...}]
console.log(repo.findById(1)); // {id:1, name:"ペン", price:120}
console.log(repo.findById(99)); // undefined
