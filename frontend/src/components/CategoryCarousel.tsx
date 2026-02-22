import React from 'react';
import { Button } from "./ui/button";
import { 
  Carousel, 
  CarouselItem, 
  CarouselContent, 
  CarouselNext, 
  CarouselPrevious 
} from "./ui/carousel";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/assignmentSlice";
import { Atom, Beaker, Calculator, Monitor, BookMarked, Sigma } from "lucide-react";

// Updated categories to be Academic Subjects
const categories = [
  { name: "Mathematics", icon: <Sigma size={18} /> },
  { name: "Physics", icon: <Atom size={18} /> },
  { name: "Chemistry", icon: <Beaker size={18} /> },
  { name: "Computer Science", icon: <Monitor size={18} /> },
  { name: "Biology", icon: <BookMarked size={18} /> },
  { name: "Engineering", icon: <Calculator size={18} /> },
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query: string) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="bg-codedex-cream py-16 border-y-[3px] border-black">
      <div className="text-center mb-10">
        <div className="inline-block bg-black text-white px-3 py-1 mb-3 rotate-1">
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">
              Select Your Mastery
            </p>
        </div>
        <h2 className="text-4xl font-[900] italic uppercase tracking-tighter">
            Choose Your <span className="text-codedex-purple">Quest Path</span>
        </h2>
      </div>

      <Carousel className="w-full max-w-4xl mx-auto px-12">
        <CarouselContent className="-ml-4">
          {categories.map((cat, index) => (
            <CarouselItem key={index} className="pl-4 basis-1/2 lg:basis-1/3">
              <button 
                onClick={() => searchJobHandler(cat.name)}
                className="group relative w-full bg-white border-[3px] border-black p-5 shadow-brutal hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all cursor-pointer h-full flex flex-col items-center justify-center gap-3"
              >
                <div className="bg-codedex-yellow border-2 border-black p-2 group-hover:bg-codedex-purple group-hover:text-white transition-colors">
                    {cat.icon}
                </div>
                <span className="font-extrabold uppercase text-[11px] tracking-widest text-center">
                  {cat.name}
                </span>
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Retro Navigation Arrows */}
        <CarouselPrevious className="h-12 w-12 border-[3px] border-black rounded-none bg-white shadow-brutal hover:bg-codedex-yellow hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all" />
        <CarouselNext className="h-12 w-12 border-[3px] border-black rounded-none bg-white shadow-brutal hover:bg-codedex-yellow hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;