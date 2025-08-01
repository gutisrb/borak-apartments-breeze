
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ApartmentDetail from "./pages/ApartmentDetail";
import Apartments from "./pages/Apartments";
import Location from "./pages/Location";
import NotFound from "./pages/NotFound";
import LanguageWrapper from "./components/LanguageWrapper";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Default route redirects to user's preferred language */}
          <Route path="/" element={<Navigate to="/en" replace />} />
          
          {/* Language-based routes */}
          <Route path="/:lang" element={<LanguageWrapper><Index /></LanguageWrapper>} />
          <Route path="/:lang/apartments" element={<LanguageWrapper><Apartments /></LanguageWrapper>} />
          <Route path="/:lang/apartments/:slug" element={<LanguageWrapper><ApartmentDetail /></LanguageWrapper>} />
          <Route path="/:lang/location" element={<LanguageWrapper><Location /></LanguageWrapper>} />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
