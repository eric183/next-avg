export const all_angry = (
  root: any,
  value: number,
  prefix_string = "Fcl_ALL_Angry"
) => {
  root.children.forEach((child: any) => {
    const morphsIndex = child.morphTargetDictionary;

    child.morphTargetInfluences[morphsIndex[prefix_string]] = value;
  });
};
