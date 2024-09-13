import React, { useState } from "react";
import "./styles/registerAuthorization.css";
import "./styles/index.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RegisterAuthorization = () => {
  const navigate = useNavigate();
  const [registerLogin, setRegisterLogin] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginLogin, setLoginLogin] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const { setUser } = useAuth();

  async function registerUser(login, password) {
    const response = await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login: login, password: password }),
    });

    const data = await response.json();
    if (response.ok) {
      const userData = {
        userId: data.userId,
        token: data.token,
        role: 'student',
      };
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      navigate("/student/main");
    } else {
      console.error("Registration failed:", data);
    }
  }

  const handleSignUpClick = () => {
    const container = document.getElementById("container");
    container.classList.add("right-panel-active");
  };

  const handleSignInClick = () => {
    const container = document.getElementById("container");
    container.classList.remove("right-panel-active");
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    registerUser(registerLogin, registerPassword);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const credentials = {
      login: loginLogin,
      password: loginPassword,
    };

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        const userData = {
          userId: data.userId,
          token: data.token,
          role: data.role,
        };
        localStorage.setItem("user", JSON.stringify(userData));

        setUser(userData);

        if (data.role === "student") {
          navigate("/student/main");
        } else if (data.role === "secretary" || data.role === "chief_secretary") {
          navigate("/secretary/students", { replace: true });
        } else {
          console.error("Unknown role");
        }
      } else {
        setLoginMessage("Login failed");
        console.error("Login failed");
      }
    } catch (error) {
      setLoginMessage(`Login failed: ${error.message}`);
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="main">
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
        integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
        crossOrigin="anonymous"
      />

      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form onSubmit={handleRegisterSubmit}>
            <h1>Регистрация</h1>
            <input
              type="login"
              placeholder="Логин"
              value={registerLogin}
              onChange={(e) => setRegisterLogin(e.target.value)}
            />
            <input
              type="password"
              placeholder="Пароль"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <button type="submit">Зарегистрироваться</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={handleLoginSubmit}>
            <h1>Авторизация</h1>
            <input
              type="login"
              placeholder="Логин"
              value={loginLogin}
              onChange={(e) => setLoginLogin(e.target.value)}
            />
            <input
              type="password"
              placeholder="Пароль"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button type="submit">Войти</button>
            <p>{loginMessage}</p>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Добро пожаловать!</h1>
              <p>
                Войдите в аккаунт, чтобы быть в курсе ближайших мероприятий в
                БРСМ.
              </p>
              <button className="ghost" id="signIn" onClick={handleSignInClick}>
                Войти
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>{getGreeting()}!</h1>
              <p>
                Введите свои личные данные и начните путешествие вместе с БРСМ.
              </p>
              <button className="ghost" id="signUp" onClick={handleSignUpClick}>
                Зарегистрироваться
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterAuthorization;

function getGreeting() {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 5 && hour < 12) {
    return "Доброе утро";
  } else if (hour >= 12 && hour < 17) {
    return "Добрый день";
  } else if (hour >= 17 && hour < 22) {
    return "Добрый вечер";
  } else {
    return "Доброй ночи";
  }
}
