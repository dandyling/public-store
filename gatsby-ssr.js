import React from "react"

import { RecoilRoot } from "recoil"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

export const wrapPageElement = ({ element, props }) => (
  <RecoilRoot {...props}>{element}</RecoilRoot>
)
