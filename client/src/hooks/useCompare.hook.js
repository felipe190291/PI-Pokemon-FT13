export function useCompareAsc(a, b) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}

export function useCompareDes(a, b) {
  if (a.name < b.name) return 1;
  if (a.name > b.name) return -1;
  return 0;
}

export function useCompareId(a, b) {
  if (parseInt(a.id) < parseInt(b.id)) return -1;
  if (parseInt(a.id) > parseInt(b.id)) return 1;
  return 0;
}

export function useCompareAttackAsc(a, b) {
  if (parseInt(a.attack) < parseInt(b.attack)) return -1;
  if (parseInt(a.attack) > parseInt(b.atack)) return 1;
  return 0;
}

export function useCompareAttackDes(a, b) {
  if (parseInt(a.attack) < parseInt(b.attack)) return 1;
  if (parseInt(a.attack) > parseInt(b.atack)) return -1;
  return 0;
}
