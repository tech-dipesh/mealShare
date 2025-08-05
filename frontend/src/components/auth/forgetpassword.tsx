import React, { useState } from 'react';
import supabase from "../../types/config/supabaseclient"
import { toast } from 'react-toastify';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:3000/reset-password'
      });
      if (error) throw error;
      toast.success('Password reset link sent');
    } catch (error) {
      toast.error(error.message || 'Reset failed');
    }
  };

  return (
    <form onSubmit={handleReset} className="flex flex-col gap-4 p-4 max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold text-center">Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border px-4 py-2 rounded"
        required
      />
      <button type="submit" className="bg-primary text-white py-2 rounded hover:opacity-90">
        Reset
      </button>
    </form>
  );
};

export default ForgetPassword;