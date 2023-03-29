import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from './components/Header';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import { lazy, Suspense } from 'react';
import { UserProvider } from './contexts/UserContext';
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

function App() {
  return (
    <>
      <ErrorBoundary>
        <ThemeProvider>
          <UserProvider>
          <QueryClientProvider client={queryClient}>
              {process.env.NODE_ENV === "development" && (
            <ReactQueryDevtools position="top-right" initialIsOpen={false} />
          )}
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
                    <Route path="/invoices" element={<div>/invoices</div>} />
                    <Route element={<div>404</div>} path="*"/>
                </Routes>
              </Suspense>
            </BrowserRouter>
          </QueryClientProvider>
          </UserProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </>
  )
}

export default App

