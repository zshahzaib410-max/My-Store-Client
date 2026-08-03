import { message } from "antd";

window.toastify = (msg, type) => message[type](msg)
window.getRandomId = () => Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
window.getValidEmail = email => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
