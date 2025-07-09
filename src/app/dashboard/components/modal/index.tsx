"use client"

import styles from "./styles.module.scss";
import { X } from "lucide-react";
import { OrderContext } from "@/providers/order";
import { use } from "react";
import { calculateTotalOrder } from "@/lib/helper";


export function ModalOrder(){
    const {onRequestClose, order, finishOrder} = use(OrderContext);

    async function handleFinishOrder(){
        finishOrder(order[0].order.id);
    }

    return(
        <dialog className={styles.dialogContainer}>
            <section className={styles.dialogContent}>
                <button className={styles.dialogBack} onClick={onRequestClose}>
                    <X size={40} color="#FF3f4b"/>
                </button>

                <article className={styles.container}>
                    <h2>Order Details</h2>
                    <span className={styles.table}>Table <b>{order[0].order.table}</b></span>

                    {order.map((item) => (
                        <section className={styles.item} key={item.id}>
                            <span>
                                Qty: {item.amount} - <b>{item.product.name}</b> - {parseFloat(item.product.price) * item.amount} €
                            </span>
                            <span className={styles.description}>{item.product.description}</span>
                        </section>
                    ))}

                    <h3 className={styles.total}>Total: {calculateTotalOrder(order)} € </h3>

                    <button className={styles.buttonOrder} onClick={handleFinishOrder}>Complete order</button>
                </article>
            </section>
        </dialog>
        
    )
}