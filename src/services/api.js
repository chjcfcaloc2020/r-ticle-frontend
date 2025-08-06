import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8080/api",
})

api.interceptors.request.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Xử lý khi hết phiên đăng nhập
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default api