import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";
import Base64UploaderPlugin from "./plugin/Plugin";
import { useSelector } from "react-redux";
import "../../../constant/css/index.css";

const PostContainer = styled.div`
  height: 400px;
  font-family: "SUITE-Regular";
`;

const _Title = styled.div`
  margin-top: 30px;
  letter-spacing: 1px;
  margin-bottom: 5px;
  font-size: 20px;
  font-weight: bolder;
`;

const _Button = styled.button`
  /* border: none;
  background: #198754;
  color: white; */
  height: 35px;
  width: 100%;
  border-radius: 2px;
  margin-top: 10px;

  &:active {
    background: #ccc;
  }
`;

export default function CardEditor(props) {
  const [EditArea, setEditArea] = useState(
    props.editpost[0] ? props.editpost[0] : "default"
  );
  // console.log(props.editpost);
  function saveEditArea(e) {
    //객체 로직으로 저장
    e.stopPropagation();
    console.log("EditArea", EditArea);
    props.editpost[1](EditArea);
  }

  return (
    <PostContainer className="App">
      <div className="form-wrapper">
        <_Title>Content</_Title>
        <CKEditor
          editor={ClassicEditor}
          config={{
            // (4)
            // plugins: [MyAdapter],
            extraPlugins: [Base64UploaderPlugin],
          }}
          //뭔가 쓰고 싶으면 html 형식으로
          data={props.post}
          onReady={(editor) => {
            // console.log('에디터 세팅', editor);
            editor.editing.view.change((writer) => {
              writer.setStyle(
                "min-height",
                "300px",
                editor.editing.view.document.getRoot()
              );
            });
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setEditArea(data);
            // console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            // console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            // console.log('Focus.', editor);
          }}
        />
      </div>
      <_Button className="submit-button" onClick={ e => saveEditArea(e) }>
        입력
      </_Button>
    </PostContainer>
  );
}
