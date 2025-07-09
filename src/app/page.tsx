"use client"

import styles from "./page.module.scss"
import logoImg from "/public/logo.png";
import Image from "next/image"; //componente para carregar a imagem mais rápido
import Link from "next/link";

import { toast } from "sonner";
import { setCookie } from "cookies-next";

export default function Page() {
  async function onSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    
    const email = formData.get("email");
    const password = formData.get("password");

    if(!email || !password){
      toast.warning("Fill in all fields.");
      return;
    }

    try{
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/session`, {
        method: "POST",
        body: JSON.stringify({email, password}),
        headers:{
          "Content-Type": "application/json",
        }
      });

      const data = await response.json();

      if(!response.ok || !data.token){
        toast.error(data.message || "Email or password incorrect.");
        return;
      }

      // Salva o cookie com cookies-next
      setCookie("token", data.token, {
          maxAge: 60 * 60 * 24 * 30, //Isso equivale a 30 dias
          path: "/",
      });

      toast.success("Login successful!");
      window.location.href = "/dashboard";

    }catch(err){
      console.log(err);
      toast.error("An unexpected error occurred.");
      return;
    }
  }

  return (
    <>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo" />

        <section className={styles.login}>
          <form onSubmit={onSubmit}>
            <input type="email" required name="email" placeholder="Enter your email..." className={styles.input} />

            <input type="password" required name="password" placeholder="********" className={styles.input} />

            <button type="submit">Login</button>
          </form>

          <Link href="/signup" className={styles.text}>Don't have an account? Sign up.</Link>
        </section>
      </div>
    </>
  );
}
