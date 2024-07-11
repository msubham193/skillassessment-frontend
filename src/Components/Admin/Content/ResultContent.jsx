import React from 'react'

const ResultContent = ({batchId}) => {
    console.log(batchId)
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
    <div className="flex items-center justify-between space-y-2">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-muted-foreground">
          Here&apos;s a Mark list of All students present in this Batch!
        </p>
      </div>
    </div>
    {/* Data table for the student result */}
  </div>
  )
}

export default ResultContent
