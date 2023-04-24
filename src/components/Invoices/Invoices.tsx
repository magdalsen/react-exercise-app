import { Link } from 'react-router-dom';

import { useAppSelector } from '../../redux/hooks';
import LoginWrapper from '../LoginWrapper/LoginWrapper'

import InvoicesForm from './InvoicesForm';
import InvoicesWrapper from './InvoicesWrapper';

import style from "./Invoices.module.css"

const Invoices = () => {
  const orderSlice = useAppSelector((state) => state.invoice);

  return (
    <>
        <LoginWrapper>
          <InvoicesWrapper>
            <div className={style.invoiceBox}>
              <div className={style.invoiceTitle}>Invoice</div>
              <div className={style.invoiceData}>{orderSlice.orders.map((el, i)=>(
                <Link key={el.id} to={`/orders/${el.id}`}>
                  <div>{i+1}. {el.title}</div>
                </Link>
              ))}</div>
              <InvoicesForm />
            </div>
          </InvoicesWrapper>
        </LoginWrapper>
    </>
  )
}

export default Invoices

