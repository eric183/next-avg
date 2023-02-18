export {};

interface GameState {
  currentLevelId: string;
  level: Pick<Level, id>;
  players: Character[];
  scene: Pick<Scene, id>;

  timeLine: Pick<TimeLine, id>;
}

interface Level {
  id: string;
  effect: Effect;
  timeLines: TimeLine[];
}

interface Player {
  position: Vector2D | Vector3D;
  character: Character;
  motion: string;
  extra: any;
}

interface Text {
  id: string;
  content: string;
  ownner: Character | System;

  extra: any;
}

interface Character {
  id: string;
  name: string;
  state: "online" | "offline";
  type: "3D" | "2D";
  motions: array;
  extra: any;
}

interface Item {
  id: string;
  name: string;
  ownners: Character[];
}

interface Scene {
  id: string;
  type: "image" | "realTime";
  source: string;

  extra: any;
}

interface TimeLine {
  id: string;
  events:
    | {
        charactInfos: {
          side: "left";
        };
      }
    | Animation[]
    | Branch[]
    | Texts[];
}

interface Branch {
  id: string;
  text: string;
  trigger: function;
}

interface Effect {
  id: string;
}
