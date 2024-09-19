const storageName = "authToken";

export function get() {
  return localStorage.getItem(storageName);
}

export function set(token: string) {
  localStorage.setItem(storageName, token);
}

export function remove() {
  localStorage.removeItem(storageName);
}

export default {
  get,
  set,
  remove,
};
