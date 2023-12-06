import { v4 } from 'uuid';

const grid = 8;

export function getItems(count, offset = 0, separatorStr = 'TODO') {
    return Array.from({ length: count }, (v, k) => k).map((k) => {
        const r1 = Math.floor(Math.random() * 31);
        const r2 = Math.floor(Math.random() * 3) + 1;
        const currentTime = new Date();
        return {
            cardId: v4(),
            post: ``,
            title: `title ${k + offset}`,
            coverColor: '#390099',
            startDate: new Date(Date.now() + r1 * 24 * 60 * 60 * 1000).toISOString(),
            endDate: new Date(Date.now() + (r1 + r2) * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: currentTime.toISOString(),
            updatedAt: currentTime.toISOString(),
            cardStatus: separatorStr,
            intOrder: offset,
            sourceResource: null,
        };
    });
}

export function getItemStyle(isDragging, draggableStyle) {
    return {
        userSelect: 'none',
        padding: `0 0 ${grid * 2}px 0`,
        margin: `0 0 ${grid}px 0`,
        borderTopRightRadius: '10px',
        borderTopLeftRadius: '10px',
        borderBottomRightRadius: '10px',
        borderBottomLeftRadius: '10px',
        background: isDragging ? 'lightgreen' : 'white',
        ...draggableStyle,
    };
}

export function getListStyle(isDraggingOver) {
    return {
        background: isDraggingOver ? 'lightblue' : '#f1f3f5',
        padding: grid,
        width: '25%',
        marginLeft: '5px',
        borderRadius: '10px',
        minHeight: 'auto',
        maxHeight: '80vh'
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
        taglist: [],
    };
    return planner;
}
