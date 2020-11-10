import React, { useState } from "react";

import "./CommentEditorStyle.scss";

import Editor from "../Editor";

import styled from "styled-components";

const CommentEditorArea = styled.div``;

const CommentButtons = styled.div``;

function CommentEditor(props) {
  const cancelClickHandler = props.cancelClickHandler;
  const submitClickHandler = props.submitClickHandler;
  const defaultValue = props.defaultValue;

  const [typed, setTyped] = useState(defaultValue);

  const typingHandler = (value) => {
    setTyped(value);
  };

  return (
    <CommentEditorArea>
      <Editor
        typingHandler={typingHandler}
        defaultValue={defaultValue}
      ></Editor>
      <CommentButtons id="commentButtonArea">
        <button className="cancel" onClick={(e) => cancelClickHandler(e)}>
          Cancel
        </button>
        <button className="update" onClick={() => submitClickHandler(typed)}>
          Update comment
        </button>
      </CommentButtons>
    </CommentEditorArea>
  );
}

export default CommentEditor;
