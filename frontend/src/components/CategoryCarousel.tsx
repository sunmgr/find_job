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
import {setSearchedQuery} from "@/redux/jobSlice"


const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "Fullstack Developer",
];



const CategoryCarousel = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

   const searchJobHandler= (query)=>{
      dispatch(setSearchedQuery(query))
      navigate("/browse")
    }

  return (
    <div className="bg-white py-10">
      <div className="text-center mb-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
          Browse by Specialization
        </p>
      </div>

      <Carousel className="w-full max-w-xl mx-auto px-12">
        <CarouselContent className="-ml-2 md:-ml-4">
          {category.map((cat, index) => (
            /* Showing more items on larger screens makes the carousel feel "fuller" and more premium */
            <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 lg:basis-1/3 flex justify-center">
              <Button 
                variant="outline"
                onClick={()=>searchJobHandler(cat)}
                className="rounded-xl border-slate-200 text-[#0f172a] font-bold hover:bg-[#4a3728] hover:text-white hover:border-[#4a3728] transition-all duration-300 w-full py-6 shadow-sm hover:shadow-md active:scale-95"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation Arrows: Styled to match the Navy/Brown theme */}
        <CarouselPrevious className="border-slate-200 text-slate-400 hover:text-[#4a3728] hover:border-[#4a3728]" />
        <CarouselNext className="border-slate-200 text-slate-400 hover:text-[#4a3728] hover:border-[#4a3728]" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;