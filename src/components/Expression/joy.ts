export const all_joy = (
  root: any,
  value: number,
  prefix_string = "Fcl_ALL_Joy"
) => {
  root.children.forEach((child: any) => {
    const morphsIndex = child.morphTargetDictionary;

    child.morphTargetInfluences[morphsIndex[prefix_string]] = value;
  });
};
