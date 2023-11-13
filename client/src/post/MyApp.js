import React, { Component, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from 'styled-components';
import MyAdapter from './adapter/MyAdapter';

const PostContainer = styled.div`
    height: 400px;
`;

export default function MyApp() {
    const [EditArea, setEditArea] = useState('');

    return (
        <PostContainer className="App">
            <div className="form-wrapper">
                <input className="title-input" type="text" placeholder="제목" />
                <CKEditor
                    editor={ClassicEditor}
                    config={{
                        // (4)
                        // plugins: [MyUploadAdapter],
                        extraPlugins: [MyAdapter],
                    }}
                    //뭔가 쓰고 싶으면 html 형식으로
                    data="asd"
                    onReady={(editor) => {
                        console.log('에디터 세팅', editor);
                        editor.editing.view.change((writer) => {
                            writer.setStyle('min-height', '300px', editor.editing.view.document.getRoot());
                        });
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setEditArea(editor);
                        console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
            </div>
            <button className="submit-button">입력</button>
        </PostContainer>
    );
}
