import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import ErrorBoundary from './components/ErrorBoundary';
import { Header } from './components/Header';
import Invoices from './components/Invoices/Invoices';
import Money from './components/Money';
import { NotificationProvider } from './contexts/NotificationContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import { useAppSelector } from './redux/hooks';

import './App.css'
const FakeLoginComponent = lazy(() => import("./components/Login/FakeLoginComponent"));
const FakeRegisterComponent = lazy(() => import("./components/Login/FakeRegisterComponent"));
const Clients = lazy(() => import("./components/pages/Clients"));
const Form = lazy(() => import("./components/Cards/CardForm/CardForm"));
const CardDetails = lazy(() => import("./components/Cards/CardDetails/CardDetails"));
const CardEdit = lazy(() => import("./components/Cards/CardEdit/CardEdit"));
const Orders = lazy(() => import("./components/pages/Orders"));
const FormOrder = lazy(() => import("./components/Orders/OrderForm/OrderForm"));
const OrderDetails = lazy(() => import("./components/Orders/OrderDetails/OrderDetails"));

const queryClient=new QueryClient({
  queryCache: new QueryCache(),
   defaultOptions: {
      queries: {
        staleTime: 60_000,
        // enabled: useRouter().isReady
      }
    }
})

const App = () => {
  const moneySlice = useAppSelector((state) => state.counter.value);

  return (
    <>
      <ErrorBoundary>
        <NotificationProvider>
          <ThemeProvider>
            <UserProvider>
                <QueryClientProvider client={queryClient}>
                    {process.env.NODE_ENV === "development" && (
                  <ReactQueryDevtools position="top-right" initialIsOpen={false} />
                )}
                <div>Money: {moneySlice} $</div>
                <BrowserRouter>
                    <Header />
                    <Suspense fallback={<h1>Still Loading…</h1>}>
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
                          <Route path="/money" element={<Money />} />
                          <Route path="/invoices" element={<Invoices />} />
                          <Route element={<div>404</div>} path="*"/>
                      </Routes>
                    </Suspense>
                  </BrowserRouter>
                </QueryClientProvider>
            </UserProvider>
          </ThemeProvider>
          </NotificationProvider>
      </ErrorBoundary>
    </>
  )
}

export default App

