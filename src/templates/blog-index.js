import React from "react"
import { graphql, navigate } from "gatsby"
import PageLayout from "../components/page-layout"
import List from "../components/list"
import "./index.less"

export default () => {
  if (typeof window !== `undefined`) {
    navigate("/post/page/1")
  }
  return null
}
