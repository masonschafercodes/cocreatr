export default function getLocalUser() {
  if (typeof window !== "undefined") {
    const token = JSON.parse(localStorage.getItem("user"));
    return token.user;
  }
}
