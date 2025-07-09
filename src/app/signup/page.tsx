//O simples fato de ter colocado dentro de app e com o nome igual ao href que demos na pagina home e ter criado o arquivo page.tsx, automaticamente esse arquivo aqui se torna uma rota
"use client"

import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.scss";
import logoImg from "/public/logo.png";
import { toast } from "sonner";

export default function Signup(){
    async function onSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const name = formData.get("name"); //O que está entre aspas precisa ser IGUAL ao campo name que demos ao nosso input
        const email = formData.get("email");
        const password = formData.get("password");

        if(!name || !email || !password){
            toast.warning("Please fill in all fields.");
            return;
        }

        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/users`,{
                method: "POST",
                body: JSON.stringify({name, email, password}),
                headers:{
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            console.log(data);

            if(!response.ok){
                // Exemplo: sua API pode enviar { message: "User already exists." }
                toast.error(data.message || "User already exists.");
                return;
            }

            toast.success("Account created successfully! You can now log in.");
            window.location.href = "/";

        }catch(err){
            console.log("error");
            toast.error("Unexpected error occurred.");
        }
    }

    return(
        <>
            <div className={styles.containerCenter}>
                <Image src={logoImg} alt="Logo da pizzaria" />

                <section className={styles.login}>
                    <h1>Creating an account</h1>
                    <form onSubmit={onSubmit}>
                        <input type="text" required name="name" placeholder="Enter your name..." className={styles.input} />

                        <input type="email" required name="email" placeholder="Enter your best email..." className={styles.input} />

                        <input type="password" required name="password" placeholder="********" className={styles.input} />

                        <button type="submit">Sign up</button>
                    </form>

                    <Link href="/" className={styles.text}>Already have an account? Log in.</Link>
                    </section>
            </div>
        </>
    )
}