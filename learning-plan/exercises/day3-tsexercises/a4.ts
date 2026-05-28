export {};
interface Item {
  id: number,
  name: string,
  category: string,
  price: number,
}

const pen: Item = {
  id: 1,
  name: "ペン",
  category: "文具",
  price: 120,
};

console.log(pen);