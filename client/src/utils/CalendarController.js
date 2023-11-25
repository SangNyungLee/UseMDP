export function getNestedElement(array, indices) {
    if(array.length === 0){
      return array;
    }

    let result = (array[indices[0]]).cards;

    switch (indices.length){
      case 0:
        return array.map( e => e.cards.flat());
      case 1:
        return result.flat();
      case 2:
        return result[indices[1]].flat();
      case 3:
        return [result[indices[1]][indices[2]]]
    }
}

export function dateParsing(planner){
    return planner.flat().map( e => ({ ...e,
        startDate: new Date(e.startDate),
        endDate: new Date(e.endDate)}));
}

