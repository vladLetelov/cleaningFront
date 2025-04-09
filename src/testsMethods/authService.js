// authService.js
export const handleLogin = (data, inpLogin, inpPass) => {
    const checkAuth = data.find(
      (user) => user.Роль === inpLogin && user.пароль === inpPass
    );
  
    if (checkAuth) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("role", checkAuth.Роль);
      return { success: true, role: checkAuth.Роль };
    } else {
      return { success: false, message: "Неверные данные" };
    }
  };
  
  export const outLogin = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("role");
  };
  