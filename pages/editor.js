import react, { useState, useEffect, Children } from "react";

import {CurrentDocProvider,useCurrentDocState} from "../context/DocPage-context"

import Layout from "../components/general/Layout"
import EditorDoc from "../components/editor/EditorDoc";
import VewDocController from "../components/editor/VewDocController";


const Editor = () => {
    const [currentMarkdownRaw, setCurrentMarkdownRaw] = useState([]);
  
  function clearAll() {
    setCurrentMarkdownRaw([])

  }
  React.useEffect(() => {
    console.log(currentMarkdownRaw);
  })

  
  return (
    <Layout>
      <CurrentDocProvider>
        <EditorDoc clearAll={clearAll}>
          <VewDocController
            mkdHandler={{ currentMarkdownRaw, setCurrentMarkdownRaw }}
          />
        </EditorDoc>
      </CurrentDocProvider>
    </Layout>
  );
};
export default Editor;
