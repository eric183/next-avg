import { create } from "zustand";

interface ItemStateType {
  items: Map<string, ItemType>;
}

const itemInfo = new Map<string, ItemType>([
  [
    "课本",
    {
      id: 0,
      name: "课本",
      ownners: [0, 1], // CharacterId
    },
  ],
]);

const ItemState = create<ItemStateType>()((set) => ({
  items: itemInfo,
}));

class Item {
  static getItemInfoByName(name: string) {
    return ItemState.getState().items.get(name);
  }
}

export default Item;
