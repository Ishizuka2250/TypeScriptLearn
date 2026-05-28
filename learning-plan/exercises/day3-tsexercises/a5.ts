export {};
type MovementType = 'in' | 'out';
type StockMovement = {
  sku: string,
  type: MovementType,
  qty: number,
}

const m1: StockMovement = { sku: "A-001", type: "in",      qty: 100 };
const m2: StockMovement = { sku: "B-001", type: "out",     qty: 30  };
// const m3: StockMovement = { sku: "C-001", type: "invalid", qty: 10  }; // MovementType型で定義されていない 'invalid' が与えられているためコンパイルエラーとなる