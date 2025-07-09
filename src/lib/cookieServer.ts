import { cookies } from "next/headers";

export async function getCookieServer(){
    const token = (await cookies()).get("token")?.value;

    return token || null;
}