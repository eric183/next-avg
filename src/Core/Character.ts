import { create } from "zustand";

const Characters = new Map<number, CharacterType>([
  [
    0,
    {
      id: 0,
      expression: "fun",
      type: "3D",
      state: "online",
      name: "康英",
      role: "me",
      source: "",
    },
  ],
  [
    1,
    {
      id: 1,
      expression: "joy",
      type: "3D",
      state: "online",
      name: "小智",
      role: "friend",
      source: "",
    },
  ],
  [
    2,
    {
      id: 2,
      expression: "angry",
      type: "3D",
      state: "online",
      name: "絵見", // えみ
      role: "strange",
      source: "",
    },
  ],
]);

interface CharacterStateType {
  characters: Map<number, CharacterType>;
  setCharacter: (id: number, character: CharacterType) => void;
}

const CharacterState = create<CharacterStateType>()((set) => ({
  characters: Characters,

  setCharacter: (id, character) =>
    set((state) => ({
      characters: state.characters.set(id, character),
    })),
}));

class Character {
  static getCharacterById(id: number): CharacterType | undefined {
    return CharacterState.getState().characters.get(id);
  }

  static getCharacters() {
    return CharacterState.getState().characters;
  }

  // static setExpression() {

  // }

  static setExpression(
    id: number,
    expression: ExpressionType
  ): CharacterType | null {
    const character = Character.getCharacterById(id);

    if (!character) {
      console.log(id, "character not found");
      return null;
    }

    character.expression = expression;

    CharacterState.getState().setCharacter(id, character);

    return character;
  }
}

export default Character;
