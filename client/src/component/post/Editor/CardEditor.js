import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from 'styled-components';
import Base64UploaderPlugin from './plugin/Plugin';
import '../../../constant/css/index.css';

const PostContainer = styled.div`
    height: 400px;
    font-family: 'SUITE-Regular';
`;

const AcceptButton = styled.button`
    background-color: #007bff !important;
    color: white;
    width: 50px;
    font-size: 12px;
    font-weight: bold;
    border: 3px #091e420f;
    border-radius: 3px;
    height: 35px;
    margin-right: 5px;
    margin-top: 10px;
`;

const CancelButton = styled.button`
    width: 50px;
    font-size: 12px;
    font-weight: bold;
    background-color: #091e420f;
    border: 3px #091e420f;
    border-radius: 3px;
    margin-top: 10px;
    background-color: '#091E420F';
    &:hover {
        background: #ccc;
    }
`;

export default function CardEditor(props) {
    const [EditArea, setEditArea] = useState(props.editpost[0] ? props.editpost[0] : 'default');
    const { setHide } = props;
    function saveEditArea(e) {
        e.stopPropagation();
        props.editpost[1](EditArea);
        setHide(true);
    }

    return (
        <PostContainer className="App">
            <div className="form-wrapper">
                <CKEditor
                    editor={ClassicEditor}
                    config={{
                        // (4)
                        extraPlugins: [Base64UploaderPlugin],
                        //  toolbar: ['heading', '|', 'bold', 'italic', 'codeBlock', '|', 'bulletedList', 'numberedList', '|', 'undo', 'redo'],
                    }}
                    //뭔가 쓰고 싶으면 html 형식으로
                    data={props.post}
                    onReady={(editor) => {
                        editor.editing.view.change((writer) => {
                            writer.setStyle('min-height', '300px', editor.editing.view.document.getRoot());
                        });
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setEditArea(data);
                    }}
                    onBlur={(event, editor) => {
                    }}
                    onFocus={(event, editor) => {
                    }}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <AcceptButton onClick={(e) => saveEditArea(e)}>입력</AcceptButton>
                <CancelButton onClick={() => setHide(true)}>취소</CancelButton>
            </div>
        </PostContainer>
    );
}
