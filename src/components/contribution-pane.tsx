import React from "react"
import { useSetRecoilState } from "recoil"
import { UploadFiles } from "./upload-files"
import { isLoadingState } from "../states/state"
import { Button, Column, PlainInput, Row, Text } from "../styles/style"
import { theme } from "../styles/theme"
import { Document, Page } from "react-pdf/dist/esm/entry.webpack"
import { pdfjs } from "react-pdf"
import styled from "styled-components"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

export const ContributionPane = ({
  contribution,
  onUploadFile,
  onAmountChange,
  onRemarkChange,
}) => {
  let refFile = null

  const setIsloading = useSetRecoilState(isLoadingState)

  const handleFiles = async () => {
    const { files } = refFile
    setIsloading(true)
    await onUploadFile(files[0])
    setIsloading(false)
  }

  const hasReceipt = contribution.image !== ""

  const isPdf = contribution?.image?.includes("pdf")

  return (
    <Column border={`1px solid ${theme.brandColor}`} fillWidth padding={"8px"}>
      <Row pl={8} alignCenter>
        <Text mr={8}>Enter Amount:</Text>
        <PlainInput
          type="number"
          value={contribution.amount}
          onChange={onAmountChange}
        />
      </Row>
      <Row padding="8px" alignCenter>
        <Text mr={8}>Remarks: </Text>
        <PlainInput
          width="100%"
          placeholder="Enter your remarks here"
          value={contribution.remark}
          onChange={onRemarkChange}
        />
      </Row>
      {isPdf && (
        <PdfWrapper id="pdf-wrapper">
          <Document file={contribution.image}>
            <Page pageNumber={1} />
          </Document>
        </PdfWrapper>
      )}
      {!isPdf && <img style={{ margin: 0 }} src={contribution.image}></img>}
      <UploadFiles
        handleRef={node => (refFile = node)}
        handleFiles={handleFiles}
      />
      <Button
        padding="8px"
        variant="light"
        onClick={() => refFile.click()}
        pointer
        style={{ textDecoration: "underline" }}
      >
        {hasReceipt ? "Change" : "Attach"} Receipt
      </Button>
    </Column>
  )
}

const PdfWrapper = styled.div`
  max-width: 100%;
  > div {
    max-width: 100%;
  }
  .react-pdf__Page {
    aspect-ratio: 3 / 4;
  }
  canvas {
    object-fit: cover;
    max-width: 100%;
    max-height: 100%;
  }
`
