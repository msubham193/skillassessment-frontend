import { Button } from "@/components(shadcn)/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components(shadcn)/ui/tooltip";
import { Download } from "lucide-react";
import React from "react";

const DownLoadJson = ({ data, fileName }) => {
  const convertToCSV = (objArray) => {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';

    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in array[i]) {
        if (line !== '') line += ',';

        line += array[i][index];
      }
      str += line + '\r\n';
    }
    return str;
  };

  const downloadCSV = () => {
    const csvData = new Blob([convertToCSV(data)], { type: 'text/csv' });
    const csvURL = URL.createObjectURL(csvData);
    const link = document.createElement('a');
    link.href = csvURL;
    link.download = `${fileName}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          {" "}
          {/* here i create he function for download  the row data.. */}
          <Button onClick={downloadCSV}>
            <Download />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Downlload the data as XL Format.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DownLoadJson;
