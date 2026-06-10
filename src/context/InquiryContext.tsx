import React, { createContext, useContext, useState } from "react";
import { INQUIRIES, type Inquiry } from "../data/inquiries";

interface InquiryContextType {
  inquiries: Inquiry[];
  markAsRead: (oid: string) => void;
  markAllRead: () => void;
}

const InquiryContext = createContext<InquiryContextType | null>(null);

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(INQUIRIES);

  function markAsRead(oid: string) {
    setInquiries((prev) =>
      prev.map((i) => (i._id.$oid === oid ? { ...i, isRead: true } : i))
    );
  }

  function markAllRead() {
    setInquiries((prev) => prev.map((i) => ({ ...i, isRead: true })));
  }

  return (
    <InquiryContext.Provider value={{ inquiries, markAsRead, markAllRead }}>
      {children}
    </InquiryContext.Provider>
  );
}

export function useInquiries() {
  const ctx = useContext(InquiryContext);
  if (!ctx) throw new Error("useInquiries must be used inside InquiryProvider");
  return ctx;
}
