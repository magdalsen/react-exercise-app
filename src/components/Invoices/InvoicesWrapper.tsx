import { useAppSelector } from "../../redux/hooks";

const InvoicesWrapper = ({children}:{children:React.ReactNode}) => {
    const orderSlice = useAppSelector((state) => {return state.invoice});
    return (
        <>
            {orderSlice.orders.length >= 1 ? <>{children}</> : <div>No invoices selected.</div>}
        </>
    )
}

export default InvoicesWrapper