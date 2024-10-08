import {  Tabs,
    TabsList,
    TabsTrigger,
    TabsContent, } from '@/components(shadcn)/ui/tabs';
import AaCartificateForm from '@/Components/Admin/Content/AaCartificateForm';
import AaMarksheeForm from '@/Components/Admin/Content/AaMarksheeForm';
import SideNav from '@/Components/Admin/Content/SideNav'
import TopBar from '@/Components/Admin/Content/TopBar'
import TpCertificateForm from '@/Components/Admin/Content/TpCertificateForm';
import TpMarksheetForm from '@/Components/Admin/Content/TpMarksheetForm';
import React, { useState } from 'react'

const CreateCertificate = ({children}) => {
    const [selectedTab, setSelectedTab] = useState("AaCertificate");

    return (
      <>
      <div className="min-h-screen bg-white text-black flex flex-col">
        {/*top Bar */}
        <TopBar />
        {/* side bar */} 
        <div className="min-h-screen bg-white text-black flex">
          <SideNav />
  
          {/* main page */}
  
          <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
          <div>
            <h3 className="text-2xl font-bold tracking-tight">
              Here you can create Certificate and Mark sheet for Assessment agency and Traning Partner!
            </h3>
           
          </div>
          <div className="flex items-center space-x-2">
            {/* add the functionality like search and filter */}
            {/* For now  there is nothing to add in facture if there some data  then we will put there */}
          </div>
        </div>
          <Tabs defaultValue="AaCertificate" className="space-y-4">
          <TabsList>
         
             <TabsTrigger
              onClick={() => setSelectedTab("AaCertificate")}
              value="AaCertificate"
            >
              Assessment Agency Certificate
            </TabsTrigger>
          
            {/*<TabsTrigger
              onClick={() => setSelectedTab("AaMarkSheet")}
              value="AaMarkSheet"
            >
            Assessment Agency MarkSheet
            </TabsTrigger>*/}
           
             <TabsTrigger
              onClick={() => setSelectedTab("TpCertificate")}
              value="TpCertificate"
            >
              Training Partner Certificate
            </TabsTrigger>
            
            {/*<TabsTrigger
              onClick={() => setSelectedTab("TpMarkSheet")}
              value="TpMarkSheet"
            >
              Training Partner Marksheet
            </TabsTrigger>*/}
          </TabsList>

          <TabsContent value="AaCertificate">
            {selectedTab === "AaCertificate" && <AaCartificateForm />}
          </TabsContent>
          <TabsContent value="AaMarkSheet">
          {selectedTab === "AaMarkSheet" && <AaMarksheeForm />} 
        </TabsContent>
          <TabsContent value="TpCertificate">
            {selectedTab === "TpCertificate" && <TpCertificateForm />}
          </TabsContent>
          <TabsContent value="TpMarkSheet">
            {selectedTab === "TpMarkSheet" && <TpMarksheetForm />}
          </TabsContent>
         
        </Tabs>
          </div>
        </div>
      </div>
    </>
    )
  }
export default CreateCertificate
