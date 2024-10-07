import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";

import { Button } from "@/components(shadcn)/ui/button"
import { Input } from "@/components(shadcn)/ui/input"

const TableToolBar = ({table,filter1}) => {
  const [filterValue, setFilterValue] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setFilterValue(newValue);

    const column = table.getColumn(filter1);
    // const column2=table.getColumn("")
    if (column) {
      column.setFilterValue(newValue);
    }

    
  };
  const isFiltered = table.getState().columnFilters.length > 0
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
        placeholder={`filter by ${filter1}`}
        value={filterValue}
        onChange={handleChange}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          > 
            Reset
            <RxCross2 className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}

export default TableToolBar
