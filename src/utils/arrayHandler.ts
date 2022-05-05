export function getUniqueItemArray<T = any>(list: T[]) {
  return list.filter((value, index, array) => array.indexOf(value) === index);
}
