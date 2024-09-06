import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components(shadcn)/ui/card";
import { Tabs, TabsContent } from "@/components(shadcn)/ui/tabs";
const DataTabs = ({ cardData }) => {
  // console.log(cardData)
  return (
    <>
      <TabsContent value="overview" className="space-y-4 ">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 ">
          {cardData.map((carddata, index) => (
            <Card key={index} className="bg-blue-900">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-200">
                  {carddata.titel}
                </CardTitle>
                <div className="text-orange-700"> 
                  <carddata.logo />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-400">
                  {carddata.total}
                </div>
                <p className="text-xs text-muted-foreground text-gray-300">
                  {carddata.fromLast}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </>
  );
};

export default DataTabs;
