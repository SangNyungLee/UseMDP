export function dateParsing(planner){
    return planner.flat().map( e => ({ ...e,
        startDate: new Date(e.startDate),
        endDate: new Date(e.endDate)}));
}

export function plannerCardStatusDevide(planner){
    const { cards } = planner
    return {...planner, cards :[
        cards.filter( card => card.cardStatus === "TODO"),
        cards.filter( card => card.cardStatus === "DOING"),
        cards.filter( card => card.cardStatus === "DONE"),
    ]}
}

export function plannerListCardStatusDevide( plannerList ){
    return plannerList.map( planner => plannerCardStatusDevide(planner))
}

