import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Form } from '../src/components/Cards/Form';
import { Header } from './components/Header';
import { CardDetails } from './components/Cards/CardDetails/CardDetails';
import { CardEdit } from './components/Cards/CardEdit';
import Clients from './components/pages/Clients';
import Orders from './components/pages/Orders';
import { FormOrder } from './components/Orders/FormOrder';
import { OrderDetails } from './components/Orders/OrderDetails';
import { FakeLoginComponent } from './components/Login/FakeLoginComponent';
import { FakeRegisterComponent } from './components/Login/FakeRegisterComponent';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient=new QueryClient({
  queryCache: new QueryCache(),
   defaultOptions: {
      queries: {
        staleTime: 60_000,
        // enabled: useRouter().isReady
      }
    }
})

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
          {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools position="top-right" initialIsOpen={false} />
      )}
      <BrowserRouter>
          <Header />
          <Routes>
              <Route path="/" element={<FakeLoginComponent />} />
              <Route path="/register" element={<FakeRegisterComponent />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/clients/add" element={<Form />} />
              <Route index path="/clients/:id" element={<CardDetails />} />
              <Route index path="/clients/:id/edit" element={<CardEdit />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/add" element={<FormOrder />} />
              <Route index path="/orders/:id" element={<OrderDetails />} />
              <Route path="/invoices" element={<div>/invoices</div>} />
              <Route element={<div>404</div>} path="*"/>
          </Routes>
        </BrowserRouter>
    </QueryClientProvider>

    </>
  )
}

export default App

