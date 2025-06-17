import { NextRequest, NextResponse } from "next/server";
import {getCookieServer} from "@/lib/cookieServer";

import { api } from "./services/api";

export async function middleware(req: NextRequest){
    const {pathname} = req.nextUrl; //O pathname retornar para gente a rota que o usuário está navegando, ex.: localhost:3000/dashboard, ou /...

    if(pathname.startsWith("/_next") || pathname === "/"){
        return NextResponse.next(); //Se pathname for igual a home a gente deixa renderizar. o /_next é um padrao que devemos colocar primeiro que o nextjs exige, mas o caminho que importa para a gente realmente é o "/"
    }

    const token = await getCookieServer();

    if(pathname.startsWith("/dashboard")){
        if(!token){
            return NextResponse.redirect(new URL("/", req.url));
        }

        const isValid = await validateToken(token);

        if(!isValid){
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    return NextResponse.next();
}

async function validateToken(token: string){
    if(!token) return false;

    try{
        await api.get("/me", {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })

        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}