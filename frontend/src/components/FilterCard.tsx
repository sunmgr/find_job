import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: "Location",
    array: ["Bhakatapur", "Kathmandu", "Dharan", "Pokhara"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-10k", "10k-20k", "20k-30k"]
  }
];

const FilterCard = () => {

  const [selectedValue,setSelectedValue] = useState("")
  const dispatch = useDispatch()
  

  const changeHandler = (value)=>{
    setSelectedValue(value)
  }

  useEffect(()=>{
    dispatch(setSearchedQuery(selectedValue))
  },[selectedValue])


  return (
    <div className='w-full bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm'>
      {/* Header */}
      <div className='flex items-center justify-between mb-2'>
        <h1 className='font-black text-2xl text-[#0f172a] tracking-tight'>
          Filter Jobs
        </h1>
      </div>
      <p className='text-xs text-slate-400 font-medium mb-6 uppercase tracking-widest'>Refine your search</p>
      
      <RadioGroup  value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index} className='mb-8 last:mb-0'>
            {/* Category Title */}
            <h2 className='font-bold text-sm text-[#4a3728] mb-4 flex items-center gap-2'>
              <span className='w-1 h-4 bg-[#4a3728] rounded-full inline-block'></span>
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
                      className="border-slate-300 text-[#4a3728] focus:ring-[#4a3728] w-4 h-4"
                    />
                    <Label 
                      htmlFor={itemId} 
                      className="text-sm font-semibold text-slate-500 group-hover:text-[#0f172a] cursor-pointer transition-colors"
                    >
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
            
            {/* Subtle Divider between groups */}
            {index !== filterData.length - 1 && (
              <Separator className="mt-6 bg-slate-50" />
            )}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;