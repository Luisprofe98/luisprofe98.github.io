import { getSession } from "../auth.js";
import { permissionTypes } from "../constants/permissionTypes.js";

const permissionSet = new Set(Object.values(permissionTypes));
const roleMap = Object.freeze({
  clubAdmin: Object.freeze([...permissionSet])
});

// Frontend authorization improves UX. Backend authorization is authoritative.
export function getPermissions() {
  const sessionData = getSession();
  const userData = sessionData?.user;
  const clubData = sessionData?.activeClub;
  if (userData?.estado !== "activo" || clubData?.estado !== "activo") return [];
  if (userData.systemRole === "superAdmin") return [...roleMap.clubAdmin];
  if (clubData.role === "clubAdmin") return [...roleMap.clubAdmin];
  if (clubData.role !== "clubStaff" || !Array.isArray(clubData.permissionList)) return [];
  return [...new Set(clubData.permissionList)].filter((permissionData) => permissionSet.has(permissionData));
}

export function hasPermission(permissionData) {
  return permissionSet.has(permissionData) && getPermissions().includes(permissionData);
}

export function canRoute(routeData) {
  if (!routeData) return false;
  return !routeData.isPrivate || hasPermission(routeData.permission);
}
