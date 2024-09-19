import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(undefined);
  const { login } = useAuth();
  const nav = useNavigate();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const response = await login({ email, password });
    if (response.success) return nav("/profile");
    setErrors(response.error);
  }

  return (
    <form onSubmit={submitForm}>
      <input type="text" name="email" placeholder="email" onChange={handleEmail}/>
      <input type="text" name="password" placeholder="password" onChange={handlePassword}/>
      <button type="submit">Login</button>
      {errors && errors.map((err) => (
        <p key={err}>{err}</p>
      ))}
    </form>
  );
}
