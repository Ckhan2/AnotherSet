import { useState } from "react";
import { useSignup } from "../hooks/useApi";

export default function Signup() {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const roles = ["ADMIN", "STORE_MANAGER"];
  const signupMutation = useSignup();
  const [open, setOpen] = useState(true);

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signupMutation.mutateAsync(formdata);
      alert("Signup successful!");
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-start justify-center px-4 pt-28 pb-8 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-gray-900 rounded-3xl shadow-2xl border border-white/10 p-8 animate-[slideDown_0.4s_ease-in-out]">

        
        <button
          className="absolute top-4 right-4 text-gray-300 hover:text-white text-sm"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>

        
        <div className="text-center mb-6">
  

  <h2 className="text-2xl font-bold text-white">
    Create Account
  </h2>

  <p className="text-gray-400 text-sm mt-1">
    Register a new staff account
  </p>
</div>

        
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">

          
          <div className="col-span-1">
            <label className="text-sm text-gray-200">Full Name</label>
            <input
              name="name"
              value={formdata.name}
              onChange={handleChange}
              required
              placeholder="Enter full name"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 text-white border border-white/10 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </div>

          
          <div className="col-span-1">
            <label className="text-sm text-gray-200">Email</label>
            <input
              name="email"
              type="email"
              value={formdata.email}
              onChange={handleChange}
              required
              placeholder="Enter email"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 text-white border border-white/10 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </div>

          
          <div className="col-span-1">
            <label className="text-sm text-gray-200">Password</label>
            <input
              name="password"
              type="password"
              value={formdata.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 text-white border border-white/10 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </div>

          
          <div className="col-span-1">
            <label className="text-sm text-gray-200">Role</label>
            <select
              name="role"
              value={formdata.role}
              onChange={handleChange}
              required
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/10 text-white border border-white/10 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            >
              <option className="text-black" value="">
                Select role
              </option>
              {roles.map((role) => (
                <option className="text-black" key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          
          <div className="col-span-2 mt-4">
            <button
              type="submit"
              disabled={signupMutation.isPending}
              className="w-full py-3 rounded-xl bg-indigo-500 text-white font-bold hover:bg-indigo-400 transition active:scale-[0.98]"
            >
              {signupMutation.isPending
                ? "Creating Account..."
                : "Sign Up"}
            </button>
          </div>
        </form>

        
        <p className="mt-6 text-center text-sm text-gray-400">
          Already a member?{" "}
          <a
            href="/login"
            className="text-indigo-400 font-semibold hover:text-indigo-300"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}