"use client"

import styles from "./styles.module.scss";
import { useFormStatus } from "react-dom";

interface Props{
    name: string;
}

export function Button({name}: Props){
    const {pending} = useFormStatus(); //É uma propriedade do nextjs que quando ele coleta a informacao e manda essas informacoes pra algum lugar, a gente consegue ver que está fazendo essa acao. Mas isso SÓ VALE se o botao estiver sendo usado DENTRO DE UM FORM. E para utilizar essa funcao APENAS EM USE CLIENT.

    return(
        <button type="submit" disabled={pending} className={styles.button}>
            {pending ? "Loading..." : name}
        </button>
    )
}