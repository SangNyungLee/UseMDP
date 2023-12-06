import Select from 'react-select'; //라이브러리 import
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { getLikesAxios, getPlanners, getTags } from '../../../utils/DataAxios';
import { _ComponentTitle } from '../../../constant/css/styledComponents/__HomeComponent';
import { useDispatch } from 'react-redux';
import { likeActions } from '../../../store/like';
import { requestFail } from '../../etc/SweetModal';
import SearchCustomList from '../customList/SearchCustomList';
import SearchLoadMap from '../../LoadMap/SearechLoadMap';
import { useMediaQuery } from 'react-responsive';
import NoContent from '../../NoContent';
import { _ComponentContainer } from '../../../constant/css/styledComponents/__StarComponent';
const SearchContainer = styled.div`
    width: 100%;
    display: flex;
    margin: auto;
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

const _MediaSelect = styled(Select)``;
export default function SearchComponent() {
    const is880 = useMediaQuery({
        query: '(max-width: 880px)',
    });

    const dispatch = useDispatch();
    const selectInputRef = useRef();
    const [author, setAuthor] = useState([]);
    const [title, setTitle] = useState([]);
    const [datas, setDatas] = useState([]);
    const [filteredDatas, setFilteredDatas] = useState([]);
    const [selectTag, setSelectTag] = useState([]);
    const [option, setOption] = useState(options[0]);
    const [tags2, setTags] = useState([]);

    useEffect(() => {
        async function getLike() {
            const result = await getLikesAxios();
            if (result.status === 200) {
                dispatch(likeActions.setLikesInit(result.data.data));
            } else {
                requestFail('좋아요 불러오기');
            }
        }
        async function fetchData() {
            let data;
            try {
                const response = await getPlanners();
                if (response.status === 200) {
                    const newData = response.data.data.map((item, idx) => {
                        const newItem = { ...item, cards: item.cards ? item.cards : [] };
                        return newItem;
                    });
                    data = newData;
                } else {
                    requestFail('트랜드 플래너 불러오기');
                }
                const result = await getTags();
                if (result.status === 200) {
                    setTags(result.data.data);
                } else {
                    requestFail('태그 불러오기');
                }
            } catch {
                const result = await getTags();
                if (result.status === 200) {
                    setTags(result.data.data);
                } else {
                    requestFail('태그 불러오기');
                }
                data = [];
            }
            setDatas(data);
            setFilteredDatas([]);

            //셋을 만들어서, 중복을 방지한다.
            const uniqueTitles = new Set();
            const uniqueAuthors = new Set();
            const Title = [];
            // uniqueTitles에도 값을 넣어서, 값을 체크하는 메커니즘.
            const Author = [];
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
            }

            // setTitle(data.map((item) => ({ value: item.title, label: item.title })));
            // setAuthor(data.map((item) => ({ value: item.creator, label: item.creator })));
        }
        fetchData();
        getLike();
    }, []);

    const changeOption = (v) => {
        selectInputRef.current.clearValue();
        setOption(v);
    };
    const handleSelectTag = (v) => {
        setSelectTag(v);
    };
    const handleSearch = (e) => {
        // 버튼 클릭 시, option에 따라 데이터 필터링
        e.stopPropagation();
        if (option.value === 'stack') {
            setFilteredDatas(datas.filter((item) => selectTag.some((tag) => item.taglist.includes(tag.value))));
        } else if (option.value === 'author') {
            setFilteredDatas(datas.filter((item) => selectTag.some((author) => item.creator.includes(author.value))));
        } else if (option.value === 'title') {
            setFilteredDatas(datas.filter((item) => selectTag.some((title) => item.title.includes(title.value))));
        }
    };
    return (
        <_ComponentContainer>
            <_ComponentTitle>로드맵 검색</_ComponentTitle>
            <SearchContainer>
                <div>
                    <Select
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                width: '100px',
                            }),
                            multiValue: (baseStyles) => ({
                                ...baseStyles,
                                // backgroundColor: "lightblue", // 선택된 항목의 배경색
                            }),
                        }}
                        options={options}
                        onChange={changeOption}
                        defaultValue={options[0]}
                        isSearchable={false}
                    />
                </div>
                {option.value === 'stack' ? (
                    <_MediaSelect
                        ref={selectInputRef}
                        styles={{
                            control: (base) => ({
                                ...base,
                                width: '50vw',
                                whiteSpace: 'nowrap',
                            }),
                            valueContainer: (base) => ({
                                ...base,
                                height: '37px',
                                overflowX: 'hidden',
                            }),
                            multiValue: (baseStyles) => ({
                                ...baseStyles,
                                display: 'none',
                            }),
                        }}
                        options={tags2} //위에서 만든 배열을 select로 넣기
                        //label custom 해주는거임
                        formatOptionLabel={(tag) => (
                            <div className="tag-option">
                                <img style={{ height: '23px' }} src={tag.image} alt={tag.label} />
                            </div>
                        )}
                        onChange={(v) => {
                            handleSelectTag(v);
                        }} //값이 바뀌면 setState되게
                        isMulti
                        menuPlacement="auto"
                        maxMenuHeight={'250px'}
                        // defaultValue={tags[0]}
                    />
                ) : option.value === 'author' ? (
                    <_MediaSelect
                        ref={selectInputRef}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                width: '50vw',
                                flex: 3,
                            }),
                            multiValue: (baseStyles) => ({
                                ...baseStyles,
                                backgroundColor: 'lightblue', // 선택된 항목의 배경색
                            }),
                        }}
                        options={author} //위에서 만든 배열을 select로 넣기
                        onChange={(e, v) => {
                            handleSelectTag(e, v);
                        }} //값이 바뀌면 setState되게
                        isMulti
                        menuPlacement="auto"
                        maxMenuHeight={'250px'}
                        // defaultValue={tags[0]}
                    />
                ) : (
                    <_MediaSelect
                        ref={selectInputRef}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                width: '50vw',
                            }),
                            multiValue: (baseStyles) => ({
                                ...baseStyles,
                                backgroundColor: 'lightblue', // 선택된 항목의 배경색
                            }),
                        }}
                        options={title} //위에서 만든 배열을 select로 넣기
                        onChange={setSelectTag} //값이 바뀌면 setState되게
                        isMulti
                        menuPlacement="auto"
                        maxMenuHeight={'250px'}
                        // defaultValue={tags[0]}
                    />
                )}

                <Button style={{ width: '70px' }} onClick={(e) => handleSearch(e)}>
                    검색
                </Button>
            </SearchContainer>

            {option.value == 'stack' && (
                <>
                    <_ComponentTitle style={{ marginTop: '30px', marginBottom: '10px' }}>선택한 태그</_ComponentTitle> <div style={{ marginTop: '10px' }}> {selectTag.length > 0 ? selectTag.map((tag) => <img style={{ margin: '3px' }} src={tag.image} alt={tag.label}></img>) : null}</div>
                </>
            )}

            <_ComponentTitle style={{ marginTop: '30px', marginBottom: '10px' }}>검색결과</_ComponentTitle>
            {filteredDatas.length == 0 ? <NoContent /> : <SearchCustomList datas={filteredDatas} loadMap={SearchLoadMap} />}
        </_ComponentContainer>
    );
    // }
}
