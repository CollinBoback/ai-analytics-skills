import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Presentation } from "lucide-react";
import { slides } from "../data/slides";
import { cn } from "../utils/cn";

export function PresentationMode() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prev = () => setCurrentIdx((i) => Math.max(0, i - 1));
  const next = () => setCurrentIdx((i) => Math.min(slides.length - 1, i + 1));

  const slide = slides[currentIdx];
  const progress = ((currentIdx + 1) / slides.length) * 100;

  return (
    <div className="flex flex-col h-full w-full bg-[#F8FAFC]">
      
      {/* Slide Canvas */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
        
        {/* 16:9 Aspect Ratio Container for Presentation */}
        <div className="relative bg-white w-full max-w-[1280px] aspect-video shadow-2xl rounded-xl overflow-hidden flex flex-col ring-1 ring-slate-200">
           
           {/* Header Area (Optional based on slide) */}
           {!slide.full && (
             <div className="px-12 pt-12 pb-4 flex flex-col z-10">
               {slide.badge && (
                 <div className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded uppercase mb-2 self-start tracking-wide">
                   {slide.badge}
                 </div>
               )}
               {slide.title && (
                 <h2 className="text-3xl font-bold text-slate-900 leading-tight tracking-tight mb-2">{slide.title}</h2>
               )}
               {slide.subtitle && (
                 <p className="text-lg text-slate-500">{slide.subtitle}</p>
               )}
             </div>
           )}

           {/* Content Area */}
           <div className={cn("flex-1 overflow-y-auto", slide.full ? "" : "px-12 pb-12")}>
             {slide.content}
           </div>

           {/* Slide Footer */}
           {!slide.full && (
              <div className="absolute bottom-6 left-12 right-12 flex justify-between items-center text-xs text-slate-400 z-10">
                <div>AI Analytics Skills for BI Analysts — the repository is the product</div>
                <div className="font-bold text-blue-900 text-sm">
                   {slide.id < 10 ? `0${slide.id}` : slide.id}
                </div>
              </div>
           )}
        </div>
      </div>

      {/* Control Bar */}
      <div className="h-10 bg-white border-t border-slate-200 px-6 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Presentation className="w-4 h-4 text-slate-400" />
            <span className="text-[10px] font-medium text-slate-500">Facilitator mode</span>
          </div>
          <div className="h-4 w-[1px] bg-slate-200"></div>
          <span className="text-[10px] text-slate-400 font-mono">Slide {currentIdx + 1} of {slides.length}</span>
        </div>
        
        <div className="flex-1 max-w-xl mx-8 bg-slate-200 h-1.5 rounded-full overflow-hidden">
           <div 
             className="bg-blue-600 h-full transition-all duration-300 ease-out"
             style={{ width: `${progress}%` }}
           ></div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={prev}
            disabled={currentIdx === 0}
            className="px-3 py-1 text-xs font-medium text-slate-500 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button 
            onClick={next}
            disabled={currentIdx === slides.length - 1}
            className="px-4 py-1 bg-slate-900 text-white text-xs font-bold rounded-md hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Slide
          </button>
        </div>
      </div>
    </div>
  );
}
