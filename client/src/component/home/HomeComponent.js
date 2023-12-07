import CustomList from './customList/CustomList';
import MyLoadMap from '../LoadMap/MyLoadMap';
import useDefaultCheck from '../../hook/useDefaultCheck';
import { HOME } from '../../constant/constant';
import { _ComponentContainer, _ComponentTitle, _TitleContainer, _FilterSelect } from '../../constant/css/styledComponents/__HomeComponent';
import { useState } from 'react';

export default function HomeComponent() {
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
