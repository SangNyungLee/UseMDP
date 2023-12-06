import { postPlannerCards } from "./DataAxios";
import { plannerCardStatusDevide, removeSpecifiedIdProperty, removeUnspecifiedIdProperty } from "./DataParsing";

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