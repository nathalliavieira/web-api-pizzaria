"use client"

import styles from "./styles.module.scss";
import { Button } from "../components/button";
import { getCookieClient } from "@/lib/cookieClient";

import { toast } from "sonner";

export default function Category(){
    async function onSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const name = formData.get("name");

        if(!name){
            toast.warning("Fill in all fields.");
            return;
        } 

        try{
            const token = await getCookieClient();

            const response = await fetch(`${process.env.NEXT_PUBLIC_API}/category`, {
                method: "POST",
                body: JSON.stringify({name}),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if(!response.ok){
                toast.error(data.message || "This category already exists.");
                return;
            }

            toast.success("Category successfully created.");
            window.location.href = "/dashboard";
        }catch(err){
            toast.error("An unexpected error occurred.");
            console.log(err);
            return;
        }
    }

    return(
        <main className={styles.container}>
            <h1>New Category</h1>

            <form className={styles.form} onSubmit={onSubmit}>
                <input type="text" name="name" placeholder="Category name, e.g. Pizzas" required className={styles.input}/>

                <Button name="Register"/>
            </form>
        </main>
    )
}