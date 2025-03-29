
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
import NotFound from "./pages/NotFound";

// Add these imports when we create the remaining category pages
// import ThreeDModels from "./pages/ThreeDModels";
// import Electronics from "./pages/Electronics";
// import OtherProjects from "./pages/OtherProjects";

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
          <Route path="/code" element={<CodeExamples />} />
          <Route path="/3d-printing" element={<ThreeDPrinting />} />
          
          {/* Placeholders for remaining category pages */}
          <Route path="/3d-models" element={<ThreeDPrinting />} />
          <Route path="/electronics" element={<ThreeDPrinting />} />
          <Route path="/other" element={<ThreeDPrinting />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
