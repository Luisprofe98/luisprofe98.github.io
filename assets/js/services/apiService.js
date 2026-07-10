import { getList, saveList } from "./storageService.js";

export async function fetchList(tipoClave) {
  return getList(tipoClave);
}

export async function fetchItem(tipoClave, itemId) {
  const itemList = getList(tipoClave);
  return itemList.find((itemDato) => itemDato.id === itemId) || null;
}

export async function saveItem(tipoClave, itemDato) {
  const itemList = getList(tipoClave);
  const itemIndex = itemList.findIndex((itemRow) => itemRow.id === itemDato.id);
  if (itemIndex >= 0) {
    itemList[itemIndex] = itemDato;
  } else {
    itemList.push(itemDato);
  }
  saveList(tipoClave, itemList);
  return itemDato;
}

export async function deleteItem(tipoClave, itemId) {
  const itemList = getList(tipoClave).filter((itemDato) => itemDato.id !== itemId);
  saveList(tipoClave, itemList);
}
