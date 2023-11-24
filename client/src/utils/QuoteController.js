import copy from 'fast-copy';

//reOrder
//2) 같은 칸톤 보드에서 위치 바꿈
//3) 위에서 아래로 갔으면, 그 사이에 있는 값들의 intOrder를 ++해주고,
//4)아래서 위로 갔으면 그 사이에 있는 값들의 intOrder를 --해준다.
export function reorder (list, startIndex, endIndex) {
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
};