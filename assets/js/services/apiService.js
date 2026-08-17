import { getClub } from "../auth.js";
import { getList, isClubData, saveList } from "./storageService.js";

export async function fetchList(dataKey) {
  const itemList = getList(dataKey);
  if (!isClubData(dataKey)) return itemList;
  const clubId = getClub()?.clubId;
  return clubId ? itemList.filter((itemData) => itemData.clubId === clubId) : [];
}

export async function fetchItem(dataKey, itemId) {
  return (await fetchList(dataKey)).find((itemData) => itemData.id === itemId) || null;
}

export async function saveItem(dataKey, itemData) {
  const itemList = getList(dataKey);
  const clubData = isClubData(dataKey);
  const clubId = clubData ? getClub()?.clubId : null;
  if (clubData && !clubId) return null;
  const saveData = clubData ? { ...itemData, clubId } : itemData;
  const itemIndex = itemList.findIndex((itemRow) => itemRow.id === saveData.id && (!clubData || itemRow.clubId === clubId));
  if (itemIndex >= 0) itemList[itemIndex] = saveData;
  else itemList.push(saveData);
  saveList(dataKey, itemList);
  return saveData;
}

export async function deleteItem(dataKey, itemId) {
  const itemList = getList(dataKey);
  const clubData = isClubData(dataKey);
  const clubId = clubData ? getClub()?.clubId : null;
  if (clubData && !clubId) return false;
  const saveData = itemList.filter((itemData) => itemData.id !== itemId || (clubData && itemData.clubId !== clubId));
  if (saveData.length === itemList.length) return false;
  saveList(dataKey, saveData);
  return true;
}
