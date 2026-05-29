export {}

interface Item {
  id: number;
  name: string;
  price: number;
}
interface IRepository {
  findById(id: number): Item | undefined,
  save(item: Item): void,
  findAll(): Item[],
}

class ItemRepository implements IRepository {
  private items: Item[];

  constructor() {
    this.items = new Array<Item>();
  }

  findById(id: number): Item | undefined {
    return this.items.find(item => item.id === id);
  }
  save(item: Item): void {
    this.items.push(item);
  }
  findAll(): Item[] {
    return this.items;
  }
}

// 以下のコードがエラーなく動作すること
const repo = new ItemRepository();
repo.save({ id: 1, name: "ペン", price: 120 });
repo.save({ id: 2, name: "ノート", price: 150 });

console.log(repo.findAll());       // [{id:1,...}, {id:2,...}]
console.log(repo.findById(1));     // {id:1, name:"ペン", price:120}
console.log(repo.findById(99));    // undefined
