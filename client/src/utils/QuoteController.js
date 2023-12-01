import copy from 'fast-copy';

//reOrder
//2) 같은 칸톤 보드에서 위치 바꿈
//3) 위에서 아래로 갔으면, 그 사이에 있는 값들의 intOrder를 ++해주고,
//4)아래서 위로 갔으면 그 사이에 있는 값들의 intOrder를 --해준다.
export function reorder(list, startIndex, endIndex) {
    //아래에서 위로 갔다면
    const newList = copy(list);
    if (startIndex < endIndex) {
        newList[startIndex].intOrder = endIndex;
        for (let i = startIndex + 1; i <= endIndex; i++) {
            newList[i].intOrder--;
        }
    } else {
        newList[startIndex].intOrder = endIndex;
        for (let i = endIndex + 1; i <= startIndex; i++) {
            newList[i].intOrder++;
        }
    }
    const result = Array.from(newList);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
}

// idx를 받았을 때, idx4개를 받아 order를 바꿔줘야함.
//시작지에서는 droppableSource로 접근하고, index초과인 친구들의 intOrder를 -1하면 된다.
// 도착지에서는 droppableid로 접근하고, index초과인 친구들의 intOrder를 +1하면 된다.
export function move(source, destination, droppableSource, droppableDestination) {
    console.log('move : ', source, destination, droppableSource, droppableDestination);
    const sourceClone = copy(source);
    const destClone = copy(destination);
    //시작지에서는 droppableSource로 접근하고, index초과인 친구들의 intOrder를 -1하면 된다.
    for (let i = droppableSource.index + 1; i < sourceClone.length; i++) {
        sourceClone[i].intOrder--;
    }
    // 도착지에서는 droppableDestination 접근하고, index초과인 친구들의 intOrder를 +1하면 된다
    for (let i = droppableDestination.index + 1; i < destClone.length; i++) {
        destClone[i].intOrder++;
    }
    //그리고 옮길 source card의 intOrder는, 도착지의 index로 재조정
    sourceClone[droppableSource.index].intOrder = droppableDestination.index;
    //separtorPlan도 수정해주자.
    sourceClone[droppableSource.index].cardStatus = droppableDestination.droppableId == 0 ? ('TODO' ? droppableDestination.droppableId == 1 : 'DOING') : 'DONE';

    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
}
