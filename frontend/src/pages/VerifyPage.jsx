import { Form, redirect, useActionData } from "react-router-dom";
import { authClient } from "../utils/authClient";

export const verifyAction = async ({ request }) => {
  const { email, verificationCode } = Object.fromEntries(await request.formData());

  try {
    await authClient.post("/verify-email", { email, verificationCode });
    return redirect("/dashboard");
  } catch (error) {
    if (error.response) {
      console.log(`The verify-email request was made and the server responded with a status code which was not 2xx`, error.response);
      return error.response;
    } else if (error.request) {
      console.log(`The verify-email request was made but ther server did not respond`, error.request);
      return redirect("/");
    } else {
      console.log(`There was an error making the verify-email request`, error.message);
      return redirect("/");
    }
  }
}

export const VerifyPage = () => {
  const errors = useActionData();
  const errorMessages = errors?.data?.errors || [];

  return (
    <Form method="post">
      <input type="text" name="email" placeholder="email" />
      <input type="text" name="verificationCode" placeholder="123456" />
      <button type="submit">Verify</button>
      {errorMessages.length > 0 && errorMessages.map((errMsg) => <p key={errMsg}>{errMsg}</p>)}
    </Form>
  );
}
