import CustomList from './customList/CustomList';
import MyLoadMap from '../LoadMap/MyLoadMap';
import useDefaultCheck from '../../hook/useDefaultCheck';
import { HOME } from '../../constant/constant';
import { useSelector, useDispatch } from 'react-redux';
// Styled Components
import { _ComponentContainer, _ComponentTitle, _TitleContainer, _FilterSelect } from '../../constant/css/styledComponents/__HomeComponent';
import { useEffect, useState } from 'react';

const statusIndexMap = {
    TODO: 0,
    DOING: 1,
    DONE: 2,
};

export default function HomeComponent() {
    //이미 저장된 값이 있으면 그 list를 불러온다.

    const plannerList = useSelector((state) => state.plannerList);
    const calendar = useSelector((state) => state.calendar);
    useDefaultCheck(HOME);

    const [sortOption, setSortOption] = useState('title');

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    return (
        <_ComponentContainer $fluid id="_ComponentContainerHOME">
            <_TitleContainer>
                <div>
                    <_ComponentTitle id="_ComponentTitle">MY PLANNERS</_ComponentTitle>
                </div>
                <div>
                    <_FilterSelect id="sort" value={sortOption} onChange={handleSortChange} className="form-select form-select-sm">
                        <option value="title">이름</option>
                        <option value="createdAt">생성</option>
                        <option value="updatedAt">수정</option>
                    </_FilterSelect>
                </div>
            </_TitleContainer>
            <CustomList loadMap={MyLoadMap} sortOption={sortOption}></CustomList>
        </_ComponentContainer>
    );
}
