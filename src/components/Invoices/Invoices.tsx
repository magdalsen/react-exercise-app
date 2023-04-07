import { Link } from 'react-router-dom';

import { useAppSelector } from '../../redux/hooks';
import { CounterState } from '../../redux/orderSlice';
import LoginWrapper from '../LoginWrapper'

import InvoicesWrapper from './InvoicesWrapper';

import style from "./Invoices.module.css"

const Invoices = () => {
  const orderSlice = useAppSelector((state) => {return state.invoice});

  return (
    <>
        <LoginWrapper>
          <InvoicesWrapper>
            <div className={style.invoiceBox}>
              <div className={style.invoiceTitle}>Invoice</div>
              <div className={style.invoiceData}>{orderSlice.orders.map((el:CounterState, i)=>{return (
                // eslint-disable-next-line react/jsx-key
                <Link to={`/orders/${el.id}`}>
                  <div>{i+1}. {el.title}</div>
                </Link>
              )})}</div>
            </div>
          </InvoicesWrapper>
        </LoginWrapper>
    </>
  )
}

export default Invoices

