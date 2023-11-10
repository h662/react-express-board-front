import axios from "axios";
import { FC, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LogIn: FC = () => {
  const [account, setAccount] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const onSubmitLogIn = async (e: FormEvent) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        `${process.env.REACT_APP_BACK_URL!}/auth`,
        {
          account,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) return;

      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center pb-20">
      <h1 className="text-2xl font-bold">h662's Board Log In</h1>
      <form className="mt-8 flex items-end gap-4" onSubmit={onSubmitLogIn}>
        <div className="flex flex-col gap-2 relative">
          <input
            className="input-style"
            type="text"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
          <input
            className="input-style"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link
            className="absolute -bottom-5 left-2 text-xs text-blue-500 active:text-blue-700"
            to="/sign-up"
          >
            Create an account
          </Link>
        </div>
        <input className="button-style" type="submit" value="Log In" />
      </form>
    </main>
  );
};

export default LogIn;
