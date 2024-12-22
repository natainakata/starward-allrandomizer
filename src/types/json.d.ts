declare module "../charactors.json" {
  type Charactor = {
    name: string;
    cost: number;
    rarity: number;
    burst?: string;
  };
  type JSONType = {
    [key: string]: Charactor;
  };

  const value: JSONType;
  export = value;
}
