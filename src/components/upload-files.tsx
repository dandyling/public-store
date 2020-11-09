import React from "react"

export interface UploadFilesProps {
  handleRef: any
  handleFiles()
}

export const UploadFiles = (props: UploadFilesProps) => {
  const { handleRef, handleFiles } = props
  return (
    <input
      ref={handleRef}
      type="file"
      style={{ display: "none" }}
      accept="*/*"
      onChange={handleFiles}
    />
  )
}

export default UploadFiles
