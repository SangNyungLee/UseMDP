import { postPlannerCards } from "./DataAxios";

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

export function readSpecifiedPlanner(planner){
    const removedPlanner = removeUnspecifiedIdProperty(planner)
    const newPlanner = postPlannerCards(removedPlanner)
    return plannerCardStatusDevide(newPlanner);
}

export function readUnspecifiedPlanner(planner){
    const removedPlanner = removeSpecifiedIdProperty(planner);
    const newPlanner = postPlannerCards(removedPlanner)
    return plannerCardStatusDevide(newPlanner);
}

export function removeSpecifiedIdProperty(planner){
    const newPlanner = {...planner, cards: planner.cards.flat().map( card => {
        delete card.cardId
        return card
    })}
    delete newPlanner.plannerId;
    return newPlanner
}

export function removeUnspecifiedIdProperty(planner){
    const newPlanner = {...planner, cards: planner.cards.map( card => {
        delete card.cardId
        return card
    })}
    delete newPlanner.plannerId;
    return newPlanner
}

export function readSpecifiedPlannerList(plannerList){
    const removedPlannerList = removeSpecifiedListIdProperty(plannerList);
    const newPlannerList = removedPlannerList.map( planner => postPlannerCards(planner))
    return newPlannerList;
}

export function removeSpecifiedListIdProperty(plannerList){
    const newPlannerList = plannerList.map( planner => {
        delete planner.plannerId;
        return { ...planner,
            cards: planner.cards.flat().map( card => { delete card.cardId; return card; })
        }
    })
    return newPlannerList
}

export function readUnspecifiedPlannerList(plannerList){
    const removedPlannerList = removeUnspecifiedListIdProperty(plannerList);
    const newPlannerList = removedPlannerList.map( planner => postPlannerCards(planner) )
    return newPlannerList;
}

export function removeUnspecifiedListIdProperty(plannerList){
    const newPlannerList = plannerList.map( planner => {
        delete planner.plannerId;
        return { ...planner,
            cards: planner.cards.map( card => { delete card.cardId; return card; })
        }
    })
    return newPlannerList
}
