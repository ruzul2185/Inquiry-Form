// React and Router Imports
import { useState } from "react";
import { useNavigate } from "react-router";

// Authentication
import supabase from "@/auth/supabaseClient";

// UI Components and Utilities
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * LoginPage Component
 * Handles user authentication and login functionality
 */
const LoginPage = () => {
  // State management for form inputs
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  // Event handlers for form inputs
  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  /**
   * Handle form submission
   * Authenticates user with Supabase
   * @param event - Form submission event
   */
  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Attempt to sign in user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Handle authentication error
    if (error) {
      toast.error(error.message);
      setEmail("");
      setPassword("");
      return;
    }

    // Handle successful login
    if (data) {
      toast.success("Logged in successfully!");
      navigate("/dashboard");
      return;
    }
  };

  // Component UI render
  return (
    <form
      onSubmit={submitHandler}
      className="flex items-center justify-center min-h-screen"
    >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            {/* Email input field */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={emailHandler}
                placeholder="m@example.com"
                required
              />
            </div>
            {/* Password input field */}
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={passwordHandler}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default LoginPage;
