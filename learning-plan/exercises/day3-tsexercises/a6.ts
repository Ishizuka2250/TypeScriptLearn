export {};
interface Item {
  id: number,
  name: string,
  category: string,
  price: number,
}

interface ItemWithStock extends Item {
  qty: number
}

const notebook: ItemWithStock = {
  id: 1,
  name: "ノート",
  category: "文具",
  price: 150,
  qty:10,
};

console.log(notebook);