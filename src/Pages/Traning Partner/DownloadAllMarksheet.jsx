import React from 'react'
import { useParams } from 'react-router-dom'
const DownloadAllMarksheet = () => {
    const {batchId}=useParams()
  return (
    <div>
      <p>{batchId}</p>
    </div>
  )
}

export default DownloadAllMarksheet
