import Select from 'react-select'; //라이브러리 import
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Button, Spinner } from 'react-bootstrap';
import CustomList from '../customList/CustomList';
import base64Str from '../../../constant/ImageBase64';
import axios from 'axios';
import LoadMap from '../../LoadMap/LoadMap';
import { getPlannerByTrend, getTags } from '../../../utils/DataAxios';
import { _componentTitle } from '../../../constant/css/styledComponents/__HomeComponent';
import noResult from '../../../constant/img/searchFail.svg';
const SearchContainer = styled.div`
    width: 75vw;
    display: flex;
    justify-content: center;
`;
const tags = [
    { value: 'Spring', label: 'Spring', image: '/svg/.svg' },
    { value: 'HTML', label: 'HTML', image: '/svg/HTML.svg' },
    { value: 'CSS', label: 'CSS', image: '/svg/css.svg' },
    { value: 'JS', label: 'JS', image: '/svg/JS.svg' },
]; //원래는 select 태그 안에 들어가는 애들을 배열로 만들어준다.
const options = [
    { value: 'stack', label: '스택' },
    { value: 'author', label: '작성자' },
    { value: 'title', label: '제목' },
    // Add more options as needed
];
const nullOptions = [
    { value: 'null', label: '해당하는 결과가 없습니다' },
    // Add more options as needed
];
export default function SearchComponent() {
    const selectInputRef = useRef();
    const [author, setAuthor] = useState([]);
    const [title, setTitle] = useState([]);
    const [datas, setDatas] = useState([]);
    const [filteredDatas, setFilteredDatas] = useState([]);
    const [selectTag, setSelectTag] = useState(tags[0]);
    const [option, setOption] = useState(options[0]);
    const [tags2, setTags] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let data;
            try {
                const response = await getPlannerByTrend();
                console.log('res : ', response.data);
                const res = await getTags();
                console.log('태그 데이터 받아온 결과 : ', res.data);
                setTags(res.data);
                if (response.data.data.length == 0) {
                } else {
                    const newData = response.data.data.map((item, idx) => {
                        const newItem = { ...item, cards: item.cards ? item.cards : [] };
                        return newItem;
                    });
                    data = newData;
                }
            } catch {
                const res = await getTags();
                console.log('데이터 받아온 결과 : ', res.data);
                setTags(res.data);
                const tmp = [
                    {
                        plannerId: 1,
                        creator: '123',
                        title: '230303',
                        likePlanner: 1,
                        thumbnail: base64Str,
                        createAt: '2023-03-02T15:00:00.000+00:00',
                        cardList: null,
                        description: '123',
                    },
                    {
                        plannerId: 2,
                        creator: '234',
                        title: '230304',
                        likePlanner: 2,
                        thumbnail: base64Str,
                        createAt: '2023-03-02T15:00:00.000+00:00',
                        cardList: null,
                        description: '123',
                    },
                    {
                        plannerId: 3,
                        creator: '456',
                        title: '230305',
                        likePlanner: 3,
                        thumbnail: base64Str,
                        createAt: '2023-03-02T15:00:00.000+00:00',
                        cardList: null,
                        description: '123',
                    },
                ];
                data = tmp;
            }
            setDatas(data);
            setFilteredDatas(data);

            //셋을 만들어서, 중복을 방지한다.
            const uniqueTitles = new Set();
            const uniqueAuthors = new Set();
            const Title = [];
            // uniqueTitles에도 값을 넣어서, 값을 체크하는 메커니즘.
            const Author = [];
            console.log('data', data);
            if (!data || data.length === 0) {
                setAuthor(nullOptions);
                setTitle(nullOptions);
            } else {
                data.map((item) => {
                    if (!uniqueAuthors.has(item.creator)) {
                        uniqueAuthors.add(item.creator);
                        Author.push({ value: item.creator, label: item.creator });
                    }
                    if (!uniqueTitles.has(item.title)) {
                        uniqueTitles.add(item.title);
                        Title.push({ value: item.title, label: item.title });
                    }
                    return null;
                });
                setAuthor(Author);
                setTitle(Title);
                console.log('uniqueTitles : ', Author);
            }

            // setTitle(data.map((item) => ({ value: item.title, label: item.title })));
            // setAuthor(data.map((item) => ({ value: item.creator, label: item.creator })));
        }
        fetchData();
    }, []);

    const changeOption = (v) => {
        selectInputRef.current.clearValue();
        setOption(v);
    };

    const handleSearch = (e) => {
        // 버튼 클릭 시, option에 따라 데이터 필터링
        e.stopPropagation();
        if (option.value === 'stack') {
            setFilteredDatas(datas.filter((item) => selectTag.some((tag) => item.title.includes(tag.value))));
        } else if (option.value === 'author') {
            setFilteredDatas(datas.filter((item) => selectTag.some((author) => item.creator.includes(author.value))));
        } else if (option.value === 'title') {
            setFilteredDatas(datas.filter((item) => selectTag.some((title) => item.title.includes(title.value))));
        }
    };

    return (
        <div style={{ padding: '15px' }}>
            <_componentTitle>로드맵 검색</_componentTitle>
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
                                // backgroundColor: "lightblue", // 선택된 항목의 배경색
                            }),
                        }}
                        options={tags2} //위에서 만든 배열을 select로 넣기
                        //label custom 해주는거임
                        formatOptionLabel={(tag) => (
                            <div className="tag-option">
                                <img src={tag.image} alt={tag.label} />
                            </div>
                        )}
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

                <Button onClick={(e) => handleSearch(e)}>검색</Button>
            </SearchContainer>
            <h2 style={{ marginTop: '30px', marginBottom: '10px', fontSize: '30px', fontWeight: '300' }}>검색결과</h2>
            {/* 데이터 없을 때 처리  */}
            {filteredDatas.length == 0 ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                    <img style={{ width: '200px', height: '200px', marginRight: '10px' }} src={noResult} />
                    <div>
                        <div style={{ fontSize: '25px' }}> 찾고자 하는 데이터가 없습니다</div>
                        <div style={{ fontSize: '20px', fontWeight: '300', color: 'gray', marginTop: '10px' }}> 다른 검색어로 검색을 해주세요.</div>
                    </div>
                </div>
            ) : (
                <CustomList datas={filteredDatas} loadMap={LoadMap} />
            )}
        </div>
    );
    // }
}

// //안에 들어가는 값을 받아야해서 state사용
// //검색결과가 없습니다로 바꿔야할듯.
// if (!datas || datas.length === 0) {
//     return (
//         //Spinner
//         <div
//             style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 minHeight: '60vh',
//             }}
//         >
//             <_componentTitle>검색결과</_componentTitle>
//             <Spinner animation="border" role="status">
//                 <span className="visually-hidden">Loading...</span>
//             </Spinner>
//         </div>
//     );
// } else {
