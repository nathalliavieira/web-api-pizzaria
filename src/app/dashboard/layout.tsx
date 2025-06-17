import { Header } from "./components/header";
import { OrderProvider } from "@/providers/order";

export default function DashboardLayout({children}: {children: React.ReactNode}){ //Por ser um layout, o next js nos diz que devemos tipar ele dessa forma
    return(
        <>  
            <Header/>
            <OrderProvider>
                {children}
            </OrderProvider>
        </>
    )
}