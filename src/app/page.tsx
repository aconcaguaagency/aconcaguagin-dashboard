"use client";

import Image from "next/image";
import { signIn } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUser } from "@/lib/auth";
import { Button, Input, Checkbox } from "@nextui-org/react";

import { EyeFilledIcon } from "@/components/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/icons/EyeSlashFilledIcon";

export default function Home() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const [remember, setRemember] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const [submitting, setSubmitting] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user && !isLoading) {
      console.log("adentroo");
      router.push("/admin/pedidos");
    }
  }, [router, user, isLoading]);

  async function handleSubmit(event: any) {
    event.preventDefault();
    setSubmitting(true);
    const { email, password } = values;
    if (!email || !password) {
      setSubmitting(false);
      return setError("Por favor ingrese sus datos");
    }

    setError("");
    try {
      const response: any = await signIn(email, password, remember);
      if (response?.user.uid) {
        router.push("/admin/pedidos");
        setValues({ email: "", password: "" });
      }
    } catch (error) {
      setSubmitting(false);
      setError("Datos incorrectos");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  return (
    <main className="flex min-h-screen items-center justify-between w-full">
      <div className=" hidden lg:block lg:w-1/2 bg-aconcagua h-screen bg-cover bg-center">
        <div className="bg-[#001230]/50   w-full h-full flex items-center justify-center">
          {/* <Image
            alt="aconcagua logo"
            width={300}
            height={300}
            src="/images/aconcagua_logo.svg"
          /> */}
        </div>
      </div>
      <div className=" w-full h-screen lg:w-1/2  flex flex-col  justify-center px-8 lg:p-24 relative">
        <div>
          <Image
            alt="client logo"
            width={120}
            height={120}
            src="/images/abs_logo.svg"
            className="brightness-0	invert mb-8"
          />
          <h1 className="mb-12 font-semibold text-3xl uppercase text-left w-full">
            Iniciar sesión
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <Input
              name="email"
              type="email"
              label="Email"
              value={values.email}
              labelPlacement="outside"
              placeholder="Email"
              className="mb-4"
              onChange={handleChange}
            />
            <Input
              name="password"
              label="Contraseña"
              labelPlacement="outside"
              value={values.password}
              placeholder="Ingrese contraseña"
              onChange={handleChange}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />

            <Checkbox
              className="mt-2 text-sm"
              isSelected={remember}
              onValueChange={setRemember}
            >
              Recordarme
            </Checkbox>

            <Button
              isLoading={submitting}
              type="submit"
              color="primary"
              className="mt-8 uppercase text-xl font-medium"
              size="lg"
            >
              ingresar
            </Button>
            {error && <p className="text-red-500 text-left  mt-2">{error}</p>}
          </form>
        </div>

        <div className=" w-full h-auto flex items-center justify-center absolute bottom-10 left-0">
          Developed by
          <a
            href="https://www.aconcagua.agency/"
            target="_blank"
            className="ml-2"
          >
            <Image
              alt="aconcagua logo"
              width={100}
              height={100}
              src="/images/aconcagua_logo.svg"
            />
          </a>
        </div>
      </div>
    </main>
  );
}
