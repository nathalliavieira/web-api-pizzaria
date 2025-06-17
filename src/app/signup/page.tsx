//O simples fato de ter colocado dentro de app e com o nome igual ao href que demos na pagina home e ter criado o arquivo page.tsx, automaticamente esse arquivo aqui se torna uma rota

import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.scss";
import logoImg from "/public/logo.svg";
import { api } from "@/services/api";
import { redirect } from "next/navigation";

export default function Signup(){
    async function handleRegister(formData: FormData){
        "use server" //Passamos essa diretiva para que essa funcao possa ser executada do lado do servidor

        const name = formData.get("name"); //O que está entre aspas precisa ser IGUAL ao campo name que demos ao nosso input

        const email = formData.get("email");

        const password = formData.get("password");

        if(name === "" || email == "" || password == ""){
            console.log("Preencha todos os campos.");
            return;
        }

        try{
            await api.post("/users", {
                name,
                email,
                password
            })
        }catch(err){
            console.log("error");
            console.log(err);
        }

        redirect("/");
    }

    return(
        <>
            <div className={styles.containerCenter}>
                <Image src={logoImg} alt="Logo da pizzaria" />

                <section className={styles.login}>
                    <h1>Criando sua conta</h1>
                    <form action={handleRegister}>
                        <input type="text" required name="name" placeholder="Digite seu nome..." className={styles.input} />

                        <input type="email" required name="email" placeholder="Digite seu email..." className={styles.input} />

                        <input type="password" required name="password" placeholder="********" className={styles.input} />

                        <button type="submit">Cadastrar</button>
                    </form>

                    <Link href="/" className={styles.text}>Já possui uma conta? Faça o login.</Link>
                    </section>
            </div>
        </>
    )
}