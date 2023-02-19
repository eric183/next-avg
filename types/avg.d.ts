export {};

declare global {
  interface GameState {
    currentLevelId: number;
    level: Pick<Level, id>;
    players: Character[];
    scene: Pick<Scene, id>;

    timeLine: Pick<TimeLine, id>;
  }

  interface Level {
    id: number;
    effect: Effect;
    timeLines: TimeLine[];
  }

  interface Player {
    position: Vector2D | Vector3D;
    character: Character;
    motion: string;
    extra: any;
  }

  // interface DialogueType {
  //   id?: number; // increments
  //   text: string[];
  //   ownner: number | "System";

  //   extra?: any;
  // }

  type ExpressionType = "angry" | "fun" | "sorrow" | "joy" | "surprised";
  interface CharacterType {
    id: number;
    name: string;
    state: "online" | "offline";
    type: "3D" | "2D";
    expression: ExpressionType;
    role: string;
    source: string;
    extra?: any;
  }

  interface ItemType {
    id: number;
    name: string;
    ownners: number[]; //Pick<CharacterType, "id">[]
  }

  //tofixed: source?: "/" + sring
  interface SceneType {
    id?: number;
    type: "image" | "realTime";
    source?: sring | "vector2D" | "vector3D";
    event?: "changeMap" | "changeVector";
    extra?: any;
  }

  export type TimeLineEventType =
    | "character"
    | "animation"
    | "branch"
    | "Dialogue";
  interface TimeLineType {
    id?: number; // increment
    ownner?: string | number | "system";
    animation?: Animation;
    branch?: Branch[];
    scene?: SceneType;
    text?: string[];
    expression?: ExpressionType;
  }

  interface Branch {
    id?: number;
    text: string;
    result: any[];
  }

  interface Effect {
    id: number;
  }
}
