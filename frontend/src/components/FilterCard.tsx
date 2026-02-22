import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/assignmentSlice';
import { Search, SlidersHorizontal, XCircle } from 'lucide-react';

const filterData = [
  {
    filterType: "Subject",
    array: ["Mathematics", "Science", "Computer Science", "Physics", "English"]
  },
  {
    filterType: "Budget Range",
    array: ["Under 500", "500-1000", "1000-5000", "5000+"]
  }
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
    dispatch(setSearchedQuery(value));
  };

  const clearFilters = () => {
    setSelectedValue("");
    setSearchText("");
  };
  // Inside FilterCard.jsx
useEffect(() => {
  // If user is typing, use that. Otherwise use the radio selection.
  const query = searchText.trim() !== "" ? searchText : selectedValue;
  console.log("Updating search query to:", query);
  dispatch(setSearchedQuery(query));
}, [selectedValue, searchText, dispatch]);


  return (
    <div className='w-full bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 font-sans'>
      
      {/* Search Section */}
      <div className="mb-8">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-codedex-purple mb-4 flex items-center gap-2">
          <Search size={14} strokeWidth={3} /> Search Assignments
        </h2>
        <div className="relative group">
          <input 
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search titles..."
            className="w-full bg-slate-50 border-[3px] border-black p-3 pr-10 font-bold text-sm focus:outline-none focus:bg-white transition-all focus:shadow-[4px_4px_0px_0px_rgba(109,40,217,1)]"
          />
          {searchText && (
            <XCircle 
              size={18} 
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-black" 
              onClick={() => setSearchText("")}
            />
          )}
        </div>
      </div>

      <div className='flex items-center justify-between mb-6'>
        <h1 className='font-black text-xl text-black uppercase italic tracking-tighter flex items-center gap-2'>
          <SlidersHorizontal size={20} /> Filters
        </h1>
        {(selectedValue || searchText) && (
          <button 
            onClick={clearFilters}
            className="text-[10px] font-black uppercase text-codedex-purple hover:underline"
          >
            Clear All
          </button>
        )}
      </div>
      
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index} className='mb-8 last:mb-0'>
            <h2 className='font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-4'>
              {data.filterType}
            </h2>

            <div className='space-y-3 pl-1'>
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div key={itemId} className='flex items-center space-x-3 group cursor-pointer'>
                    <RadioGroupItem 
                      value={item} 
                      id={itemId} 
                      className="border-2 border-black text-codedex-purple focus:ring-black w-4 h-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] data-[state=checked]:shadow-none data-[state=checked]:translate-x-[1px] data-[state=checked]:translate-y-[1px]"
                    />
                    <Label 
                      htmlFor={itemId} 
                      className="text-sm font-bold text-slate-600 group-hover:text-black cursor-pointer transition-colors"
                    >
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;