import styles from "./page.module.scss"
import logoImg from "/public/logo.svg";
import Image from "next/image"; //componente para carregar a imagem mais rápido
import Link from "next/link";

import { api } from "@/services/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Page() {
  async function handleLogin(formData: FormData){
    "use server"
    
    const email = formData.get("email");
    const password = formData.get("password");

    if(email === "" || password === ""){
      console.log("Email ou senha inválida!");
      return;
    }

    try{
      
      const response = await api.post("/session", {
        email,
        password
      })

      if(!response.data.token){
        return;
      }

      console.log(response.data);

      const expressTime = 60 * 60 * 24 * 30; //Isso equivale a 30 dias

      (await cookies()).set("session", response.data.token, { //session é o nome que NÓS ESCOLHEMOS para chamar esse cookie
        maxAge: expressTime, //Tempo que esse token irá expirar
        path: "/", //Aqui é qual caminho que queremos acessar esse cookie, e no nosso caso sao todos os caminhos A PARTIR da nossa home
        httpOnly: false,
        secure: process.env.NODE_ENV === "production" //SE fizermos o deploy do nosso projeto essa variavel se torna true
      })

    }catch(err){
      console.log("error");
      console.log(err);
      return;
    }

    redirect("/dashboard");

  }

  return (
    <>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo da pizzaria" />

        <section className={styles.login}>
          <form action={handleLogin}>
            <input type="email" required name="email" placeholder="Digite seu email..." className={styles.input} />

            <input type="password" required name="password" placeholder="********" className={styles.input} />

            <button type="submit">Acessar</button>
          </form>

          <Link href="/signup" className={styles.text}>Não possui uma conta? Cadastre-se</Link>
        </section>
      </div>
    </>
  );
}
