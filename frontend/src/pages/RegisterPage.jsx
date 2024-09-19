import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState(undefined);
  const { register } = useAuth();
  const nav = useNavigate();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const response = await register({ email, password, name });
    if (response.success) return nav("/login");
    setErrors(response.error);
  }

  return (
    <form onSubmit={submitForm}>
      <input type="text" name="name" placeholder="name" onChange={handleName}/>
      <input type="text" name="email" placeholder="email" onChange={handleEmail}/>
      <input type="text" name="password" placeholder="password" onChange={handlePassword}/>
      <button type="submit">Register</button>
      {errors && errors.map((err) => (
        <p key={err}>{err}</p>
      ))}
    </form>
  );
}
