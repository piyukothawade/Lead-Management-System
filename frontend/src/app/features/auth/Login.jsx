import { Input } from "../leads/components/ui/input";
import { Button } from "../leads/components/ui/button";
import useForm from "@/app/features/leads/hooks/useForm";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const validate = (v) => {
    const e = {};
    if (!v.email) e.email = "Required";
    if (!v.password) e.password = "Required";
    return e;
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    { email: "", password: "" },
    validate
  );

  const onSubmit = () => {
    const validationErrors = validate(values);

    // if errors exist, stop login
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // alert("Logged in successfully!");

    // navigate to dashboard
    navigate("/");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#2E073F] to-[#7A1CAC]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-xl w-[350px]"
      >
        <h2 className="text-white text-xl mb-6 text-center">Login</h2>

        <Input
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p className="text-red-400 text-sm">{errors.email}</p>
        )}

        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p className="text-red-400 text-sm">{errors.password}</p>
        )}

        <Button type="submit" className="w-full mt-4">
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;