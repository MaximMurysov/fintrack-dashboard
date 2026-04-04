import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Analytics from "./pages/Analytics/Analytics";
import Transactions from "./pages/Transactions/Transactions";
import Settings from "./pages/Settings/Settings";
import Layout from "./components/Layout";
import { LoginProvider } from "./components/LoginContext/LoginContext";
import { DisplayPreferencesProvider } from "./components/DisplayPreferences/DisplayPreferencesContext";
import TransactionsProvider from "./components/TransactionContext/TransactionProvider";
function App() {
  return (
    <TransactionsProvider>
      <DisplayPreferencesProvider>
        <LoginProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="transactions" element={<Transactions />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </LoginProvider>
      </DisplayPreferencesProvider>
    </TransactionsProvider>
  );
}

export default App;
