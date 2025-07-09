"use client"

import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";
import logoImg from "/public/logo.png";
import { LogOutIcon } from "lucide-react";

import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation"; //o use router só pode ser usando em componentes do lado do cliente. ou seja, "use client"

import { toast } from "sonner";

export function Header(){
    const router = useRouter();

    async function handleLogout(){
        deleteCookie("session", {path: "/"});
        toast.success("Logout successful!");
        router.replace("/");
    }

    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <Image alt="Logo" src={logoImg} width={190} height={50} priority={true} quality={100}/> {/* priority é prioridade no carregamento */}                
                </Link>

                <nav>
                    <Link href="/dashboard/category">
                        Category
                    </Link>
                    <Link href="/dashboard/product">
                        Product
                    </Link>

                    <form action={handleLogout}>
                        <button type="submit">
                            <LogOutIcon size={24} color="#FFF"/>
                        </button>
                    </form>
                </nav>
            </div>
        </header>
    )
}