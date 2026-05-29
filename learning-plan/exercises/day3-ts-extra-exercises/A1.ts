export {}

interface Item {
  id: number;
  name: string;
  price: number;
}
interface IRepository extends Item{
  findById(id: number): Item | undefined,
  save(item: Item): void,
  findAll(): Item[],
}


