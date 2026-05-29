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
    delete(id) {
        const target = this.items.findIndex(item => item?.id === id);
        return this.items.splice(target, 1).length > 0 ? true : false;
    }
}
// 以下のコードがエラーなく動作すること
const repo = new ItemRepository();
repo.save({ id: 1, name: "ペン", price: 120 });
console.log(repo.delete(1)); // true
console.log(repo.delete(99)); // false
console.log(repo.findAll()); // []
