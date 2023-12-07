import Select from 'react-select';
import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { getPlanners, getTags } from '../../../utils/DataAxios';
import { _ComponentTitle } from '../../../constant/css/styledComponents/__HomeComponent';
import { useDispatch } from 'react-redux';
import { requestFail } from '../../etc/SweetModal';
import SearchCustomList from '../customList/SearchCustomList';
import SearchLoadMap from '../../LoadMap/SearechLoadMap';
import NoContent from '../../NoContent';
import { _ComponentContainer } from '../../../constant/css/styledComponents/__StarComponent';
import useGetData from '../../../hook/useGetData';

const SearchContainer = styled.div`
    width: 100%;
    display: flex;
    margin: auto;
    justify-content: center;
`;

const options = [
    { value: 'stack', label: '스택' },
    { value: 'author', label: '작성자' },
    { value: 'title', label: '제목' },
];

const nullOptions = [
    { value: 'null', label: '해당하는 결과가 없습니다' },
];

const _MediaSelect = styled(Select)``;

export default function SearchComponent() {
    const selectInputRef = useRef();
    const [author, setAuthor] = useState([]);
    const [title, setTitle] = useState([]);
    const [datas, setDatas] = useState([]);
    const [filteredDatas, setFilteredDatas] = useState([]);
    const [selectTag, setSelectTag] = useState([]);
    const [option, setOption] = useState(options[0]);
    const [tags2, setTags] = useState([]);

    const { getLikeAndDispatch } = useGetData();

    useEffect(() => {
        getLikeAndDispatch()
        async function fetchData() {
            let data;
            try {
                const response = await getPlanners();
                if (response.status === 200) {
                    const newData = response.data.data.map( item => ({ ...item, cards: item.cards ? item.cards : [] }));
                    data = newData;
                } else {
                    requestFail('트랜드 플래너 불러오기');
                    return;
                }
                const result = await getTags();
                if (result.status === 200) {
                    setTags(result.data.data);
                } else {
                    requestFail('태그 불러오기');
                    return;
                }
            } catch {
                const result = await getTags();
                if (result.status === 200) {
                    setTags(result.data.data);
                } else {
                    requestFail('태그 불러오기');
                    return;
                }
                data = [];
            }
            setDatas(data);
            setFilteredDatas([]);

            const uniqueTitles = new Set();
            const uniqueAuthors = new Set();
            const Title = [];
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
        }
        fetchData();
    }, []);

    const changeOption = (v) => {
        selectInputRef.current.clearValue();
        setOption(v);
    };
    const handleSelectTag = (v) => {
        setSelectTag(v);
    };
    const handleSearch = (e) => {
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
                        options={tags2}
                        formatOptionLabel={(tag) => (
                            <div className="tag-option">
                                <img style={{ height: '23px' }} src={tag.image} alt={tag.label} />
                            </div>
                        )}
                        onChange={(v) => {
                            handleSelectTag(v);
                        }}
                        isMulti
                        menuPlacement="auto"
                        maxMenuHeight={'250px'}
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
                                backgroundColor: 'lightblue',
                            }),
                        }}
                        options={author}
                        onChange={(e, v) => {
                            handleSelectTag(e, v);
                        }}
                        isMulti
                        menuPlacement="auto"
                        maxMenuHeight={'250px'}
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
                                backgroundColor: 'lightblue',
                            }),
                        }}
                        options={title}
                        onChange={setSelectTag}
                        isMulti
                        menuPlacement="auto"
                        maxMenuHeight={'250px'}
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
