import { v4 } from 'uuid';

const grid = 8;

// 가짜 데이터 생성기, coverColor, title이 있음.
//title이야 content 바꿔쓰면 되지만, coverColor를 제공하는 것을 해볼것.
// getItems = (count, offset=0) => {}  :   count랑 offset을 변수로 받되 offset은 기본값을 0으로
// Array.from({ length: count }, (v, k) => k) : 길이가 count인 배열을 생성하는데
// (v,k) => k 를 적어 넣으면 k 값을 0부터 count - 1 까지 for문 돌리듯 대응시킨다 (관용적으로 쓴다 봐도 될듯)
// 가짜 데이터 생성기, coverColor, title이 있음.
//title이야 content 바꿔쓰면 되지만, coverColor를 제공하는 것을 해볼것.
export function getItems(count, offset = 0, separatorStr = 'TODO') {
    return Array.from({ length: count }, (v, k) => k).map((k) => {
        const r1 = Math.floor(Math.random() * 31);
        const r2 = Math.floor(Math.random() * 3) + 1;
        const currentTime = new Date();
        return {
            cardId: v4(),
            post: ``,
            title: `title ${k + offset}`,
            coverColor: '#FFD6DA',
            startDate: new Date(Date.now() + (r1 - 15) * 24 * 60 * 60 * 1000).toISOString(),
            endDate: new Date(Date.now() + (r1 + r2 - 15) * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: currentTime.toISOString(),
            updatedAt: currentTime.toISOString(),
            cardStatus: separatorStr,
            checklists: [
                {
                    checklistId: (k + offset) * 2,
                    checked: 0,
                    title: 'done',
                    createdAt: currentTime.toISOString(),
                    updatedAt: currentTime.toISOString(),
                },
                {
                    checklistId: (k + offset) * 2 + 1,
                    checked: 0,
                    title: 'jpa',
                    createdAt: currentTime.toISOString(),
                    updatedAt: currentTime.toISOString(),
                },
            ],
            intOrder: offset,
            sourceResource: null,
        };
    });
}

export function getItemStyle(isDragging, draggableStyle) {
    return {
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        padding: `0 0 ${grid * 2}px 0`,
        margin: `0 0 ${grid}px 0`,
        borderTopRightRadius: '10px',
        borderTopLeftRadius: '10px',
        // change background colour if dragging
        background: isDragging ? 'lightgreen' : 'white',

        // styles we need to apply on draggables
        ...draggableStyle,
    };
}

export function getListStyle(isDraggingOver) {
    return {
        background: isDraggingOver ? 'lightblue' : 'lightgrey',
        padding: grid,
        width: 250,
    };
}

export function getOneCard(offset, status) {
    return getItems(1, offset, status)[0];
}

export function getOneDefaultPlanner() {
    const cards = [getItems(8, 0, 'TODO'), getItems(5, 8, 'DOING'), getItems(5, 13, 'DONE')];
    const currentTime = new Date();
    const planner = {
        plannerId: 0,
        creator: 'default user name',
        title: 'useMDP',
        likePlanner: 0,
        thumbnail: '',
        plannerAccess: 'PRIVATE',
        isDefault: 0,
        createdAt: currentTime.toISOString(),
        updatedAt: currentTime.toISOString(),
        cards,
    };
    return planner;
}
