import firebase from "gatsby-plugin-firebase"
import React, { useEffect, useState } from "react"
import { useSetRecoilState } from "recoil"
import { isLoadingState, toastState } from "../states/state"
import { Button, Column, Panel } from "../styles/style"
import { Contribution } from "../pages/app/contribution"
import { ContributionPane } from "./contribution-pane"

export const ContributionsPanel = ({ orderId }) => {
  const [contributions, setContributions] = useState<Contribution[]>([])

  const setIsloading = useSetRecoilState(isLoadingState)
  const setToast = useSetRecoilState(toastState)

  useEffect(() => {
    loadContributions()
  }, [])

  const loadContributions = async () => {
    const db = firebase.firestore()
    const query = await db.collection("contributions").doc(orderId).get()
    const cons = query.data()
    if (cons) {
      setContributions(cons.contributions)
    }
  }

  const handleAddContribution = () => {
    const newContribution: Contribution = {
      amount: 0,
      remark: "",
      image: "",
    }
    const cons = [...contributions]
    cons.push(newContribution)
    setContributions(cons)
  }

  const uploadFile = async (file, i) => {
    try {
      const storageRef = firebase.storage().ref()
      const imageRef = storageRef.child(`${orderId}-${i}-receipt`)
      await imageRef.put(file)
      const url = await imageRef.getDownloadURL()
      const cons = [...contributions]
      cons[i].image = url
      setContributions(cons)
    } catch (error) {
      console.error("Image upload error", error)
    }
  }

  const handleSave = async () => {
    setIsloading(true)
    const db = firebase.firestore()
    await db.collection("contributions").doc(orderId).set({ contributions })
    setIsloading(false)
    setToast("Contributions saved")
  }

  const handleAmountChange = (e, i) => {
    const cons = [...contributions]
    cons[i].amount = +e.currentTarget.value
    setContributions(cons)
  }

  const handleRemarkChange = (e, i) => {
    const cons = [...contributions]
    cons[i].remark = e.currentTarget.value
    setContributions(cons)
  }

  const hasMore = contributions.length > 0

  let canSave = contributions.length !== 0 ? true : false
  for (let i = 0; i < contributions.length; i++) {
    if (contributions[i].image === "") {
      canSave = false
      break
    }
  }

  return (
    <Panel fillWidth padding="16px">
      <Column fillWidth>
        {contributions.map((c, i) => {
          return (
            <ContributionPane
              key={i}
              contribution={c}
              onUploadFile={file => uploadFile(file, i)}
              onAmountChange={e => handleAmountChange(e, i)}
              onRemarkChange={e => handleRemarkChange(e, i)}
            />
          )
        })}
        {canSave && (
          <Button mt={16} padding="8px" onClick={handleSave}>
            Click Here to Save Contribution
          </Button>
        )}
        <Button
          padding="8px"
          variant={hasMore ? "light" : null}
          onClick={handleAddContribution}
          pointer
        >
          Add {hasMore ? "More " : ""}Contribution
        </Button>
      </Column>
    </Panel>
  )
}
