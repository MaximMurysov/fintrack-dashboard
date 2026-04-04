import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const STORAGE_CURRENCY = "fintrack_currency";
export const STORAGE_COMPACT = "fintrack_compact_amounts";

export type CurrencyCode = "USD" | "EUR" | "GBP";

function parseCurrency(raw: string | null): CurrencyCode {
  if (raw === "EUR" || raw === "GBP") return raw;
  return "USD";
}

function currencyGlyph(code: CurrencyCode): string {
  switch (code) {
    case "EUR":
      return "€";
    case "GBP":
      return "£";
    default:
      return "$";
  }
}

function formatPositive(n: number, compact: boolean): string {
  if (compact && n >= 1000) {
    return new Intl.NumberFormat(undefined, {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(n);
  }
  return n.toLocaleString();
}

export type DisplayPreferencesContextType = {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  compactAmounts: boolean;
  setCompactAmounts: (v: boolean) => void;
  currencySymbol: string;
  formatPositiveAmount: (n: number) => string;
  formatSignedAmount: (n: number) => string;
};

const DisplayPreferencesContext =
  createContext<DisplayPreferencesContextType | null>(null);

export function DisplayPreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() =>
    parseCurrency(localStorage.getItem(STORAGE_CURRENCY)),
  );
  const [compactAmounts, setCompactAmountsState] = useState(
    () => localStorage.getItem(STORAGE_COMPACT) === "1",
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_CURRENCY, currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem(STORAGE_COMPACT, compactAmounts ? "1" : "0");
  }, [compactAmounts]);

  const setCurrency = useCallback((c: CurrencyCode) => {
    setCurrencyState(c);
  }, []);

  const setCompactAmounts = useCallback((v: boolean) => {
    setCompactAmountsState(v);
  }, []);

  const currencySymbol = useMemo(
    () => currencyGlyph(currency),
    [currency],
  );

  const formatPositiveAmount = useCallback(
    (n: number) => formatPositive(n, compactAmounts),
    [compactAmounts],
  );

  const formatSignedAmount = useCallback(
    (amount: number) => {
      const sign = amount < 0 ? "-" : "";
      const abs = Math.abs(amount);
      const body = formatPositive(abs, compactAmounts);
      return `${sign}${currencySymbol}${body}`;
    },
    [compactAmounts, currencySymbol],
  );

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      compactAmounts,
      setCompactAmounts,
      currencySymbol,
      formatPositiveAmount,
      formatSignedAmount,
    }),
    [
      currency,
      setCurrency,
      compactAmounts,
      setCompactAmounts,
      currencySymbol,
      formatPositiveAmount,
      formatSignedAmount,
    ],
  );

  return (
    <DisplayPreferencesContext.Provider value={value}>
      {children}
    </DisplayPreferencesContext.Provider>
  );
}

export function useDisplayPreferences(): DisplayPreferencesContextType {
  const ctx = useContext(DisplayPreferencesContext);
  if (!ctx) {
    throw new Error(
      "useDisplayPreferences must be used within DisplayPreferencesProvider",
    );
  }
  return ctx;
}
