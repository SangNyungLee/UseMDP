import noResult from '../constant/img/searchFail.svg';

export default function NoContent() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '20vh' }}>
            <img style={{ width: '200px', height: '200px', marginRight: '10px' }} src={noResult} />
            <div>
                <div style={{ fontSize: '23px', color: '#eeeeee' }}> 찾고자 하는 데이터가 없습니다</div>
                <div style={{ fontSize: '20px', fontWeight: '300', color: '#eeeeee', marginTop: '10px' }}>다른 정보로 검색해주세요.</div>
            </div>
        </div>
    );
}
