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
  delete(id: number): boolean,
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
  delete(id: number): boolean {
    const target: number = this.items.findIndex(item => item?.id === id);
    return this.items.splice(target, 1).length > 0 ? true : false;
  }
}

// 以下のコードがエラーなく動作すること
const repo = new ItemRepository();
repo.save({ id: 1, name: "ペン", price: 120 });

console.log(repo.delete(1));   // true
console.log(repo.delete(99));  // false
console.log(repo.findAll());   // []


