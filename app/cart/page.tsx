import CartView from "@/components/cart-view"
import ClientOnly from "@/components/ClientOnly"

const CartPage = () => {
    return (
        <ClientOnly>
            <CartView />
        </ClientOnly>
    )
}

export default CartPage