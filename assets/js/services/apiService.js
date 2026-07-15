import { getList, saveList } from "./storageService.js";

export async function fetchList(dataKey) { return getList(dataKey); }
export async function fetchItem(dataKey, itemId) { return getList(dataKey).find((itemData) => itemData.id === itemId) || null; }
export async function saveItem(dataKey, itemData) {
  const itemList = getList(dataKey);
  const itemIndex = itemList.findIndex((itemRow) => itemRow.id === itemData.id);
  if (itemIndex >= 0) itemList[itemIndex] = itemData;
  else itemList.push(itemData);
  saveList(dataKey, itemList);
  return itemData;
}
export async function deleteItem(dataKey, itemId) { saveList(dataKey, getList(dataKey).filter((itemData) => itemData.id !== itemId)); }
