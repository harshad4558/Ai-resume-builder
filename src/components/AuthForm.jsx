import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AuthForm({ type }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Dynamically decide the endpoint based on the form type
    const endpoint = type === "signup" ? "signup" : "login";
    
    // Only send email and password for login
    const dataToSend = type === "signup" 
      ? formData 
      : { 
          email: formData.email, 
          password: formData.password 
        };

    try {
      const res = await fetch(`http://localhost:8080/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) return setError(data.message); // Handle error response

      localStorage.setItem("token", data.data);
      navigate("/dashboard"); // Redirect on successful login/signup
    } catch (err) {
      setLoading(false);
      setError("Something went wrong. Try again.");
      console.error("Auth error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <Card className="w-[400px] p-6 shadow-lg rounded-2xl">
        <CardContent>
          <h2 className="text-2xl font-bold text-center mb-6 capitalize text-blue-700">
            {type === "signup" ? "Create Account" : "Welcome Back"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {type === "signup" && (
              <>
                <div>
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
              </>
            )}

            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button className="w-full" disabled={loading} type="submit">
              {loading ? "Loading..." : type === "signup" ? "Sign Up" : "Sign In"}
            </Button>
            <p className="text-sm text-center mt-2">
              {type === "signup"
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <Link className="text-blue-600 underline" to={type === "signup" ? "/signin" : "/signup"}>
                {type === "signup" ? "Sign In" : "Sign Up"}
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}