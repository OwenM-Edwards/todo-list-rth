import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { loginUser, registerUser, getUser } from "../services/authService";
import { useStoreActions } from 'easy-peasy';
import LoadingIndicator from "./LoadingIndicator";

interface AuthForm {
  email: string;
  password: string;
  confirmPassword?: string;
}

const LoginForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setAuthenticated = useStoreActions((actions) => actions.setAuthenticated);

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    reset,
    setError,
  } = useForm<AuthForm>();

  // Reset form and handle validation when toggling between login and register
  useEffect(() => {
    reset();  // Reset form state when switching views
  }, [isRegister, reset]);

  const toggleRegister = () => {
    setIsRegister(!isRegister);
  };

  const onSubmit = async (data: AuthForm) => {
    setIsLoading(true);
    try {
      let userData;

      if (isRegister) {
        // Register user
        const registerRes = await registerUser(data.email, data.password, data.confirmPassword);
        userData = await getUser();
      } else {
        // Login user
        const loginRes = await loginUser(data.email, data.password);
        userData = await getUser();
      }

      if (userData) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }

      reset(); // Reset form after successful login/register
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      alert(errorMessage);

      if (error.response?.data?.errors) {
        Object.keys(error.response.data.errors).forEach((key) => {
          setError(key, {
            type: "manual",
            message: error.response.data.errors[key][0],
          });
        });
      }

      setIsLoading(false);
    }
  };

  return (
    isLoading ? (
      <div className="min-w-screen min-h-screen flex items-center justify-center">
        <LoadingIndicator />
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-80">
          <h2 className="text-xl font-bold mb-4 text-center">
            {isRegister ? "Register" : "Login"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="border border-gray-300 p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 bg-gray-100"
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              className="border border-gray-300 p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 bg-gray-100"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}

            {isRegister && (
              <>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  className="border border-gray-300 p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 bg-gray-100"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">{errors.confirmPassword.message}</p>
                )}
              </>
            )}

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600 disabled:opacity-50"
              disabled={isLoading}
            >
              {isRegister ? "Register" : "Login"}
            </button>
          </form>
          <p
            className="text-blue-500 text-center mt-4 cursor-pointer"
            onClick={toggleRegister}
          >
            {isRegister
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </p>
        </div>
      </div>
    )
  );
};

export default LoginForm;
