"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/shared/context/userStore";
import { loginWithMailAndPassword } from "@/shared/services/firebase/login/login";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { setUser } = useUserStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Por favor, rellene todos los campos");
    }
    
    const user = await loginWithMailAndPassword(email, password);
    if (user) {
      setUser(user.email ?? "");
      router.push("/dashboard");
    }
  };

  return (
    <form
      className="w-5/6 border py-10 px-4 rounded md:w-2/4 xl:w-2/5 flex justify-center flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl text-center ">Iniciar sesion</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label>Email</Label>
          <Input onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <div>
          <Label>Contraseña</Label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
          />
        </div>
      </div>
      <Button type="submit">Iniciar sesion</Button>
      <ToastContainer />
    </form>
  );
};
