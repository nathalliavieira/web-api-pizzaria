"use client" //Vamos usar essa pagina do lado do cliente porque aqui iremos ter onChange, useStates e etc

import { ChangeEvent, useState } from "react";
import styles from "./styles.module.scss";

import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/dashboard/components/button";
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CategoryProps{
    id: string;
    name: string;
}

interface Props{
    categories: CategoryProps[];
}

export function Form({categories}: Props){
    const router = useRouter();
    const [image, setImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState("");

    async function handleRegisterProduct(formData: FormData){
        const categoryIndex = formData.get("category")
        const name = formData.get("name")
        const price = formData.get("price")
        const description = formData.get("description")

        if(!name || !categoryIndex || !price || !description || !image){
            toast.warning("Fill in all fields.");
            return;
        }

        const data = new FormData();

        data.append("name", name)
        data.append("price", price)
        data.append("description", description)
        data.append("category_id", categories[Number(categoryIndex)].id)
        data.append("file", image)

        const token = getCookieClient();

        await api.post("/product", data, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .catch((err) => {
            console.log(err);
            toast.warning("Failed to register this product.");
            return;
        })

        toast.success("Product successfully registered!");
        router.push("/dashboard");
    }

    function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(e.target.files && e.target.files[0]){
            const image = e.target.files[0];

            if(image.type !== "image/jpeg" && image.type !== "image/png"){
                toast.warning("Prohibited file format");
                return;
            }

            setImage(image);
            setPreviewImage(URL.createObjectURL(image)); //Aqui é um hack do nextjs no qual nos gera uma url pra preview da imagem
        }
    }

    return(
        <main className={styles.container}>
            <h1>New product</h1>

            <form className={styles.form} action={handleRegisterProduct}>
                <label className={styles.labelImage}>
                    <span>
                        <UploadCloud size={30} color="#FFF"/>
                    </span>

                    <input 
                        type="file"
                        accept="image/png, image/jpeg"
                        required
                        onChange={handleFile}
                    />

                    {previewImage && (
                        <Image src={previewImage} alt="Imagem de preview" className={styles.preview} fill={true} quality={100} priority={true} />
                    )}
                </label>

                <select name="category">
                    {categories.map( (category, index) => (
                        <option key={category.id} value={index}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <input 
                    type="text"
                    name="name"
                    placeholder="Enter the name of the product..."
                    required
                    className={styles.input}
                />

                <input 
                    type="text"
                    name="price"
                    placeholder="Enter the price of the product..."
                    required
                    className={styles.input}
                />

                <textarea className={styles.input} placeholder="Enter the product description..." required name="description"></textarea>

                <Button name="Register a product"/>
            </form>
        </main>
    )
}