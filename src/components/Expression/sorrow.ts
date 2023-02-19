export const all_sorrow = (
  root: any,
  value: number,
  prefix_string = "Fcl_ALL_Sorrow"
) => {
  root.children.forEach((child: any) => {
    const morphsIndex = child.morphTargetDictionary;

    child.morphTargetInfluences[morphsIndex[prefix_string]] = value;
  });
};
