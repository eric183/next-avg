export const all_surprised = (
  root: any,
  value: number,
  prefix_string = "Fcl_ALL_Surprised"
) => {
  root.children.forEach((child: any) => {
    const morphsIndex = child.morphTargetDictionary;

    child.morphTargetInfluences[morphsIndex[prefix_string]] = value;
  });
};
