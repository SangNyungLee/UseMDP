import { postPlannerCards } from "./DataAxios";
import { plannerCardStatusDevide, plannerListCardStatusDevide, removeSpecifiedIdProperty, removeSpecifiedListIdProperty, removeUnspecifiedIdProperty, removeUnspecifiedListIdProperty } from "./DataParsing";

export async function readPlanner(planner,specified){
    let removedPlanner;
    if(specified){
        removedPlanner = removeSpecifiedIdProperty(planner)
    } else {
        removedPlanner = removeUnspecifiedIdProperty(planner);
    }
    const newPlanner = await postPlannerCards(removedPlanner);
    return plannerCardStatusDevide(newPlanner);    
}

export async function readPlannerList(plannerList,specified){
    let removedPlannerList;
    if(specified){
        removedPlannerList = removeSpecifiedListIdProperty(plannerList)
    } else {
        removedPlannerList = removeUnspecifiedListIdProperty(plannerList);
    }
    let newPlannerList = [];
    for (const planner of removedPlannerList){
        const newPlanner = await postPlannerCards(planner)
        newPlannerList = [...newPlannerList,newPlanner]
    }
    return plannerListCardStatusDevide(newPlannerList);
}