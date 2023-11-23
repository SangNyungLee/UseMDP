import Select from 'react-select'; //라이브러리 import
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Button, Spinner } from 'react-bootstrap';
import CustomList from '../customLIst/CustomList';
import base64Str from '../../constant/ImageBase64';
import axios from 'axios';
import LoadMap2 from '../LoadMap2/LoadMap';
const SearchContainer = styled.div`
    width: 75vw;
    display: flex;
    justify-content: center;
`;
const tags = [
    { value: 'Spring', label: 'Spring' },
    { value: 'HTML', label: 'HTML' },
    { value: 'CSS', label: 'CSS' },
    { value: 'JS', label: 'JS' },
]; //원래는 select 태그 안에 들어가는 애들을 배열로 만들어준다.
const options = [
    { value: 'stack', label: '스택' },
    { value: 'author', label: '작성자' },
    { value: 'title', label: '제목' },
    // Add more options as needed
];
export default function SearchComponent() {
    const selectInputRef = useRef();
    const [author, setAuthor] = useState();
    const [title, setTitle] = useState();
    const [datas, setDatas] = useState();
    const [filteredDatas, setFilteredDatas] = useState([]);
    const [selectTag, setSelectTag] = useState(tags[0]);
    const [option, setOption] = useState(options[0]);

    useEffect(() => {
        async function fetchData() {
            let data;
            try {
                const response = await axios.get('/api/getPlanners');
                data = response.data;
            } catch {
                const tmp = [
                    { plannerId: 1, creator: '123', title: '230303', likePlanner: 1, thumbnail: base64Str, createAt: '2023-03-02T15:00:00.000+00:00', cardList: null, description: '123' },
                    { plannerId: 2, creator: '234', title: '230304', likePlanner: 2, thumbnail: base64Str, createAt: '2023-03-02T15:00:00.000+00:00', cardList: null, description: '123' },
                    { plannerId: 3, creator: '456', title: '230305', likePlanner: 3, thumbnail: base64Str, createAt: '2023-03-02T15:00:00.000+00:00', cardList: null, description: '123' },
                ];
                data = tmp;
            }
            setDatas(data);
            setFilteredDatas(data);
            setTitle(data.map((item) => ({ value: item.title, label: item.title })));
            setAuthor(data.map((item) => ({ value: item.creator, label: item.creator })));
        }
        fetchData();
    }, []);

    const changeOption = (v) => {
        selectInputRef.current.clearValue();
        setOption(v);
    };

    const handleSearch = () => {
        // 버튼 클릭 시, option에 따라 데이터 필터링
        if (option.value === 'stack') {
            setFilteredDatas(datas.filter((item) => selectTag.some((tag) => item.title.includes(tag.value))));
        } else if (option.value === 'author') {
            setFilteredDatas(datas.filter((item) => selectTag.some((author) => item.creator.includes(author.value))));
        } else if (option.value === 'title') {
            setFilteredDatas(datas.filter((item) => selectTag.some((title) => item.title.includes(title.value))));
        }
    };

    //안에 들어가는 값을 받아야해서 state사용
    // console.log('State 확인 : ', selectTag, option);
    if (!datas) {
        return (
            //Spinner
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    } else {
        return (
            <div style={{ padding: '15px' }}>
                <h2>로드맵 검색</h2>

                <SearchContainer>
                    <div>
                        <Select options={options} onChange={changeOption} defaultValue={options[0]} isSearchable={false} />
                    </div>
                    {option.value === 'stack' ? (
                        <Select
                            ref={selectInputRef}
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    width: '500px',
                                    flex: 3,
                                }),
                                multiValue: (baseStyles) => ({
                                    ...baseStyles,
                                    backgroundColor: 'lightblue', // 선택된 항목의 배경색
                                }),
                            }}
                            options={tags} //위에서 만든 배열을 select로 넣기
                            onChange={setSelectTag} //값이 바뀌면 setState되게
                            isMulti
                            // defaultValue={tags[0]}
                        />
                    ) : option.value === 'author' ? (
                        <Select
                            ref={selectInputRef}
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    width: '500px',
                                    flex: 3,
                                }),
                                multiValue: (baseStyles) => ({
                                    ...baseStyles,
                                    backgroundColor: 'lightblue', // 선택된 항목의 배경색
                                }),
                            }}
                            options={author} //위에서 만든 배열을 select로 넣기
                            onChange={setSelectTag} //값이 바뀌면 setState되게
                            isMulti
                            // defaultValue={tags[0]}
                        />
                    ) : (
                        <Select
                            ref={selectInputRef}
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    width: '500px',
                                }),
                                multiValue: (baseStyles) => ({
                                    ...baseStyles,
                                    backgroundColor: 'lightblue', // 선택된 항목의 배경색
                                }),
                            }}
                            options={title} //위에서 만든 배열을 select로 넣기
                            onChange={setSelectTag} //값이 바뀌면 setState되게
                            isMulti
                            // defaultValue={tags[0]}
                        />
                    )}

                    <Button onClick={handleSearch}>검색</Button>
                </SearchContainer>
                <hr></hr>
                <h2 style={{ marginTop: '30px', marginBottom: '10px' }}>검색결과</h2>
                <CustomList datas={filteredDatas} loadMap={LoadMap2}></CustomList>
            </div>
        );
    }
}
