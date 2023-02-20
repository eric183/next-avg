import Character from "./Character";

class Player {
  static getPlayerName() {
    return Character.getCharacterById(0)!.name;
  }

  static getPlayerInfo(): CharacterType {
    return Character.getCharacterById(0)!;
  }
}

export default Player;
