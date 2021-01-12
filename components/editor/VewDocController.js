import { useState} from 'react'
import { convertInput } from "../../utils/convertInput";

import DocSheet from "./DocSheet";
import MkdownInput from "./MkdownInput";
import MkdownOut from "./MkdownOut";

import { useCurrentDocState } from "../../context/DocPage-context";

function VewDocController({ currentMarkdownRaw, setCurrentMarkdownRaw }) {
  const { docState } = useCurrentDocState();
  const viewSelector = docState.viewSelector;
  function newLineOfMkDown(newRawLine) {
    //updateRawData
    const nextLineId = currentMarkdownRaw.length + 1;
    let [content] = newRawLine.split("\n");
    const construct = {
      lineId: nextLineId,
      lineContent: content,
    };
    console.log(construct);
    setCurrentMarkdownRaw([...currentMarkdownRaw, construct]);
  }

  function updateSelectInput(contentLine) {
    setCurrentMarkdownRaw('');
    let contentUpdate = currentMarkdownRaw;
    let listId = contentUpdate.map((x) => x.lineId).indexOf(contentLine.lineId);
    contentUpdate.splice(listId, 1, contentLine);
    setCurrentMarkdownRaw(contentUpdate);
    // how to refresh the page once we have the an updated value????
  }

  React.useEffect(() => {
    console.log(currentMarkdownRaw);
  });

  // controls how docs are organized, one page, or 2 page with instant conversion to html
  if (viewSelector === "singleSheet") {
    return (
      <DocSheet>
        <MkdownOut
          currentMarkdownRaw={currentMarkdownRaw}
          updateSelectInput={updateSelectInput}
        />
        <MkdownInput newLineOfMkDown={newLineOfMkDown} />
      </DocSheet>
    );
  } else if (viewSelector === "sideBySide") {
    return (
      <>
        <DocSheet>
          {currentMarkdownRaw.map((x) => (
            <pre>{x.lineContent}</pre>
          ))}
          <MkdownInput newLineOfMkDown={newLineOfMkDown} />
        </DocSheet>
        <DocSheet>
          <MkdownOut mkDwonText={currentDocHTML} />
        </DocSheet>
      </>
    );
  } else {
    return <p>Nothing</p>;
  }
}
export default VewDocController;