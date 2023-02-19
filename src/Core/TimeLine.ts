import { Scene } from "three";
import { create } from "zustand";

interface TimeLineStateType {
  timeLines: TimeLineType[];
  currentTimeLine: TimeLineType;
  setCurrentTimeLine: (index: number) => void;
}

const timeLineInfo: TimeLineType[] = [
  {
    text: [
      "炎热的午后，我被同班的小智拉到山里的河边去捡石头",
      "这个人的脑子也不知道是怎么回事，向来就是不太聪明的样子，总是拉我做一些奇奇怪怪的事情",
      "不过倒是不惹人讨厌, 谁叫他是我哥们呢",
    ],
    ownner: "system",
  },
  {
    text: [
      "喂，我说你，既然是暑假，难道不应该在家打游戏吗，石头有什么好捡的，我有点弄不明白你",
    ],
    ownner: 0,
  },
  {
    text: [
      "这你就不知道了吧，我拉你出来是出来看看镇上新来的女孩，我哥们都说她每天都会去河边...",
    ],
    ownner: 1,
  },
  {
    text: ["新来的女孩？"],
    ownner: 0,
  },
  {
    text: ["听完我发来的疑问，小智像看火星人一样的表情盯着我"],
    ownner: "System",
  },
  {
    text: [
      "不是吧，你没听说吗，群聊里的男生都炸开了花，叫你不要老是在家里打游戏，哎",
      "就是一个东京最近搬来的女生，晒得特别黑，这种肤色的女孩听说东京很流行嘛，大家都追着要电话...",
    ],
    ownner: "system",
  },
  {
    text: [
      "弄半天就这事啊，我回去了，什么嘛，我以为你拉我出来有什么好玩的, 走了",
    ],
    ownner: 0,
  },
  {
    text: [
      "我是真不敢兴趣，本来还准备录个无伤通关【匹狼】的视频的，看来这个夏天当油土伯的计划又要落空了",
    ],
    ownner: "system",
  },
  {
    text: ["别啊，既然都来了，一会我请你吃蛋包饭，你就陪我去看看那个女孩"],
    ownner: 1,
  },
  {
    text: [
      "听到蛋包饭，还是免费的，我觉得油土伯的计划可以推迟一点，也不差这一天",
    ],
    ownner: "system",
  },
  {
    text: ["切，你这个人也太物质了，不愧是你啊"],
    ownner: 1,
  },
  {
    text: [
      "哎，人为刀俎我为鱼肉拉，咱俩彼此彼此哦，还不快走，一会赶不上见黑妹了",
    ],
    ownner: 0,
  },
  {
    text: ["你不要以为我不知道你只是想快点吃到免费的蛋包饭！"],
    ownner: 1,
  },
  {
    text: ["我笑嘻嘻的跑了起来，毕竟走了这么久，肚子也饿了"],
    ownner: "system",
  },
  {
    scene: {
      source: "/",
      type: "image",
    },
    ownner: "system",
  },
  {
    text: ["快看，就是那边！"],
    ownner: 1,
  },
  {
    text: ["小智兴奋的指着远处可见的河边"],
    ownner: "system",
  },
  {
    text: ["好，快跑起来，你今天跑不过我，得多请我一瓶酸奶..."],
    ownner: 0,
  },
  {
    text: [
      "我话都没讲完，拔腿就跑了起来，我是第一次见他跑这么快，这人真应该去参加运动会",
    ],
    ownner: "system",
  },
  {
    scene: {
      source: "/",
      type: "image",
    },
    ownner: "system",
  },
  {
    text: [
      "突然，小智在离我500米不到的距离停了下来，他似乎是被按下了暂停键",
      "我察觉到有什么不对劲，于是抓紧跑了上去",
    ],
    ownner: "system",
  },
  {
    text: ["你...你...你"],
    ownner: 1,
    expression: "surprised",
  },
  {
    text: ["..."],
    expression: "angry",
    ownner: 2,
  },
  {
    text: [
      "小智突然结结巴巴的指着一个穿着很奇怪的女孩，我为什么会说很奇怪呢，因为我还没在现实生活中见过这样穿着的女孩，这样的打扮，我还真是没见过",
      "不过比起她奇怪的穿着，反而她的行为举止跟让人觉得奇怪",
    ],
    ownner: "system",
  },
  {
    text: ["你......你你你，你"],
    ownner: "system",
    expression: "surprised",
  },
  {
    text: ["..."],
    ownner: 2,
  },
  {
    text: [
      "小智话都没有说完，扔下我撒腿就跑，当然，还有一位手里拿着生鱼，满嘴鲜血的奇怪女人",
    ],
    ownner: "system",
  },
  {
    text: [
      "喂，你别跑那么快啊，我追不上你，我的蛋包饭你别想赖！！！你给我站住!",
    ],
    ownner: 0,
  },
  {
    branch: [
      {
        text: "追上去",
        result: ["next"],
      },
      {
        text: "再观察一下现场发生了什么",
        result: ["next"],
      },
    ],
    ownner: "system",
  },
  {
    text: [
      "就在我准备跑的时候，突然我感觉被硬物撞击到头部，眼前一黑，晕了过去",
    ],
    ownner: "system",
  },
  {
    scene: {
      event: "changeMap",
      type: "image",
      source: "/",
    },
    ownner: "system",
  },
];

const TimeLineState = create<TimeLineStateType>()((set) => ({
  timeLines: timeLineInfo,
  currentTimeLine: {},
  setCurrentTimeLine: (index) =>
    set((state) => ({
      currentTimeLine: state.timeLines[index],
    })),
}));

class TimeLine {
  static getTimeLines() {
    return TimeLineState.getState().timeLines;
  }

  static getCurrentTime() {
    return TimeLineState.getState().currentTimeLine;
  }

  static setCurrentTime(index: number) {
    return TimeLineState.getState().setCurrentTimeLine(index);
  }
}

export default TimeLine;
