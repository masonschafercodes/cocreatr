export default function getLocalWid() {
  if (typeof window !== "undefined") {
    const token = JSON.parse(localStorage.getItem("workspaceId"));
    return token;
  }
}
