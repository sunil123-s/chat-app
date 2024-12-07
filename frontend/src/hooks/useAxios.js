
const BaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://chat-app-mc1j.onrender.com"
    : "http://localhost:8000";

export default BaseUrl;