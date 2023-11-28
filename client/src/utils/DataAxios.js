import axios from "axios";


const LOCAL = 'local'
const PROD = 'prod'

const status = {
    local: 'http://localhost:8080',
    prod: 'https://www.usemdp.site'
}

const MDP = status[LOCAL];

const getURL = (url) => {
    return MDP + url;
}

export async function getPlannerId(data){
    const res = await axios({
        method: 'POST',
        url: getURL('/api/postPlanner'),
        data,
        withCredentials: true
    })
    return res.data
}

export async function postPlannerCards(unspecifiedplanner){
    const res = await axios({
        method: 'POST',
        url: getURL('/api/postPlannerWithCards'),
        data: unspecifiedplanner,
        withCredentials: true
    })
    console.log("res",res)
    return res.data.data
}

export async function getCardAxios(cardId){
    const res = await axios({
        method: 'GET',
        url: getURL(`/api/getCard/${cardId}`),
        withCredentials:true,
    })
    return res.data.data
}