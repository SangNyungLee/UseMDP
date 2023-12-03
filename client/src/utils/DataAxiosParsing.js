import { postPlannerCards } from "./DataAxios";
import { plannerCardStatusDevide, plannerListCardStatusDevide, removeSpecifiedIdProperty, removeSpecifiedListIdProperty, removeUnspecifiedIdProperty, removeUnspecifiedListIdProperty } from "./DataParsing";

export async function readPlanner(planner,specified){
    let removedPlanner;
    if(specified){
        removedPlanner = removeSpecifiedIdProperty(planner)
    } else {
        removedPlanner = removeUnspecifiedIdProperty(planner);
    }
    const result = await postPlannerCards(removedPlanner);
    if( result.status === 201 ){
        return plannerCardStatusDevide(result.data.data);
    } else {
        return null;
    }
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
        const result = await postPlannerCards(planner)
        if(result.status === 201){
            newPlannerList = [ ...newPlannerList, result.data.data ]
        } else {
            console.log("error",result)
        }
    }
    if( newPlannerList.length > 0 ){
        return plannerListCardStatusDevide(newPlannerList);
    } else {
        return null;
    }
}