import AuthLayout from "@/components/layouts/AuthLayout";
import { ButtonBase, ButtonLink } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/form";
import { api } from "@/lib/api";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";

function Register() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await api.register(email, password);
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
        <div className="flex flex-col gap-4 mb-4">
          <div className="w-32 h-32 overflow-hidden relative mx-auto">
            <Image src="/images/logo.png" alt="Logo" fill />
          </div>

          <h1 className="text-4xl font-bold text-center">Register</h1>

          <p className="text-center text-gray-500">
            Register an account to get access to our member-only features.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            inputPlaceholder="*********"
            mandatory={true}
          />
          <TextInput
            label="Confirm Password"
            InputType="password"
            inputValue={confirmPassword}
            inputOnChange={(e) => setConfirmPassword(e.target.value)}
            inputPlaceholder="*********"
            helperText="Password : cityslicka"
            mandatory={true}
          />

          <div className="w-full mt-4">
            <ButtonBase
              type="submit"
              disabled={loading}
              label={loading ? "Loading..." : "Register"}
              fullWidth
            />
          </div>

          <div className="flex flex-col items-center mt-8">
            <ButtonLink
              href="/auth/login"
              title="Already have an account? Login"
            />
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Register;
