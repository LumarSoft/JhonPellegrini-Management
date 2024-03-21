"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/shared/context/userStore";
import { loginWithMailAndPassword } from "@/shared/services/firebase/login/login";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const LoginCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const { setUser } = useUserStore();

  const handleSubmit = async () => {
    const user = await loginWithMailAndPassword(email, password);
    if (user) {
      setUser(user.email ?? "");
      router.push("/dashboard");
    }
  };

  return (
    <div className="w-5/6 border py-10 px-4 rounded md:w-2/4 xl:w-2/5 flex justify-center flex-col gap-4">
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
      <Button onClick={handleSubmit}>Iniciar sesion</Button>
    </div>
  );
};
