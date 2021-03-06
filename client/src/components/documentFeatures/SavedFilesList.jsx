import React from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/react'

const unOrderList = css`
  padding: 0;
  margin: 0;
  list-style: none;
`;
const listItem = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const title = css`
  font-weight: 900;
  text-align:center;
  font-size:10px;
`


const SavedFiles = ({ editASavedFile, saveFileName, removedSelectedDoc }) => {
  return (
    <li css={listItem}>
      <h4>{saveFileName}</h4>
      <div>
        <button onClick={() => editASavedFile(saveFileName)}>🖊️</button>
        <button onClick={() => removedSelectedDoc(saveFileName)}>❌</button>
      </div>
    </li>
  );
};



function SavedFilesList({ editASavedFile,savedFilesHandler }) {
  const { localSavedFiles, setLocalSavedFiles } = savedFilesHandler;

  function removedSelectedDoc(deletedFileName) {
    const updateList = localSavedFiles.filter(
      (x) => x.fileName != deletedFileName
    );
    setLocalSavedFiles(updateList);
  }

  if (localSavedFiles.length === 0) {
    return (
      <h3
        css={css`
          ${title};
          color: gray;
        `}
      >
        No Saved Files
      </h3>
    );
  } else {
    return (
      <ul css={unOrderList}>
        <h4 css={title}>Saved Files</h4>
        {localSavedFiles.map((file) => {
          return (
            <SavedFiles
              key={file.id}
              editASavedFile={editASavedFile}
              removedSelectedDoc={removedSelectedDoc}
              saveFileName={file.fileName}
            />
          );
        })}
      </ul>
    );
  }
}

export default SavedFilesList;