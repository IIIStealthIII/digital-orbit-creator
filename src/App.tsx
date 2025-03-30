
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Games from "./pages/Games";
import Apps from "./pages/Apps";
import CodeExamples from "./pages/CodeExamples";
import ThreeDPrinting from "./pages/ThreeDPrinting";
import ThreeDModels from "./pages/ThreeDModels";
import Electronics from "./pages/Electronics";
import OtherProjects from "./pages/OtherProjects";
import WebSites from "./pages/WebSites";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/games" element={<Games />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/websites" element={<WebSites />} />
          <Route path="/code" element={<CodeExamples />} />
          <Route path="/3d-printing" element={<ThreeDPrinting />} />
          <Route path="/3d-models" element={<ThreeDModels />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/other" element={<OtherProjects />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
