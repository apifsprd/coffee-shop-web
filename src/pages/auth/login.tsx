import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { checkGuest } from "@/lib/auth";
import { ButtonBase, ButtonLink } from "@/components/ui/Button";
import { api } from "@/lib/api";
import AuthLayout from "@/components/layouts/AuthLayout";
import { TextInput } from "@/components/ui/form";
import Image from "next/image";

export const getServerSideProps: GetServerSideProps = async (context) => {
  return checkGuest(context);
};

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.login(email, password);
      const { token } = response;
      document.cookie = `token=${token}; path=/;`;
      router.push("/dashboard");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "An error occurred. Please try again.";
      setError(`Failed to login: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 p-8">
        <div className="flex flex-col gap-4 mb-8">
          <div className="w-32 h-32 overflow-hidden relative mx-auto">
            <Image src="/images/logo.png" alt="Logo" fill />
          </div>

          <h1 className="text-4xl font-bold text-center">Login</h1>

          <p className="text-center">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <TextInput
            label="Email"
            InputType="email"
            inputValue={email}
            inputOnChange={(e) => setEmail(e.target.value)}
            inputPlaceholder="eve.holt@reqres.in"
            helperText="Username : eve.holt@reqres.in"
            mandatory={true}
          />
          <TextInput
            label="Password"
            InputType="password"
            inputValue={password}
            inputOnChange={(e) => setPassword(e.target.value)}
            inputPlaceholder="cityslicka"
            helperText="Password : cityslicka"
            mandatory={true}
          />

          <div className="w-full">
            <ButtonBase
              type="submit"
              disabled={loading}
              label={loading ? "Logging in..." : "Login"}
              fullWidth
            />
          </div>

          <div className="flex flex-col items-center mt-8">
            <ButtonLink
              href="/auth/register"
              title="Don't have an account? Register"
            />
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
