import copy from 'fast-copy';

export function reorder(list, startIndex, endIndex) {
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

export function move(source, destination, droppableSource, droppableDestination) {
    const sourceClone = copy(source);
    const destClone = copy(destination);
    for (let i = droppableSource.index + 1; i < sourceClone.length; i++) {
        sourceClone[i].intOrder--;
    }
    for (let i = droppableDestination.index + 1; i < destClone.length; i++) {
        destClone[i].intOrder++;
    }
    sourceClone[droppableSource.index].intOrder = droppableDestination.index;
    sourceClone[droppableSource.index].cardStatus = droppableDestination.droppableId == 0 ? ('TODO' ? droppableDestination.droppableId == 1 : 'DOING') : 'DONE';

    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
}
