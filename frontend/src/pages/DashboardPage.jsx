import { useAuth } from "../hooks/useAuth";

export const DashboardPage = () => {
  const { profile } = useAuth();
  const { name, email, isVerified } = profile;
  return (
    <>
      <h1>Profile</h1>
      {name && <p>Name: {name}</p>}
      {email && <p>Email: {email}</p>}
      {isVerified !== undefined && <p>Is Verified: {isVerified.toString()}</p>}
    </>
  )
}
