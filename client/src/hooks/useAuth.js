
const useAuth = () => {
  const isLogin = () => {
    const token = localStorage.getItem('token')
    return token;
  }
  return {
    isLogin
  }
}

export default useAuth;