const authKey = "clubox.session";
const authEmail = "admin@clubox.local";
const authPass = "clubox123";

export function getSession() {
  const rawData = sessionStorage.getItem(authKey);
  return rawData ? JSON.parse(rawData) : null;
}

export function hasSession() {
  return Boolean(getSession());
}

export function loginUser(emailValue, passValue) {
  if (emailValue === authEmail && passValue === authPass) {
    const sessionData = { email: emailValue, club: "Club Demo" };
    sessionStorage.setItem(authKey, JSON.stringify(sessionData));
    return true;
  }
  return false;
}

export function logoutUser() {
  sessionStorage.removeItem(authKey);
}
