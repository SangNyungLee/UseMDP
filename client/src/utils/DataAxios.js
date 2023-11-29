import axios from 'axios';

const LOCAL = 'local';
const PROD = 'prod';

const status = {
    local: 'http://localhost:8080',
    prod: 'https://www.usemdp.site',
};

const MDP = status[LOCAL];

const getURL = (url) => {
    return MDP + url;
};

export async function getPlannerId(data) {
    const res = await axios({
        method: 'POST',
        url: getURL('/api/postPlanner'),
        data,
        withCredentials: true,
    });
    return res.data;
}

export async function postPlannerCards(unspecifiedplanner) {
    const res = await axios({
        method: 'POST',
        url: getURL('/api/postPlannerWithCards'),
        data: unspecifiedplanner,
        withCredentials: true,
    });
    return res.data.data;
}

export async function getCardAxios(cardId) {
    const res = await axios({
        method: 'GET',
        url: getURL(`/api/getCard/${cardId}`),
        withCredentials: true,
    });
    return res.data.data;
}

export async function getPlannerBtoA(btoaId) {
    const res = await axios({
        method: 'GET',
        url: getURL(`/api/getPlanner/${btoaId}`),
        withCredentials: true,
    });
    return res.data;
}

export async function getPlannerByTrend() {
    const res = await axios({
        method: 'GET',
        url: getURL(`/api/getPlanner/trending`),
        withCredentials: true,
    });
    return res;
}

export async function getPlannerByBasic() {
    const res = await axios({
        method: 'GET',
        url: getURL(`/api/getPlanner/default`),
        withCredentials: true,
    });
    return res;
}
export async function getPlanners() {
    const res = await axios({
        method: 'GET',
        url: getURL(`/api/getPlanners`),
        withCredentials: true,
    });
    return res;
}

export async function postCopyPlanners(plannerId) {
    const res = await axios({
        method: 'POST',
        url: getURL(`/api/postPlanner/copy`),
        data: { plannerId },
        withCredentials: true,
    });
    return res;
}

export async function patchCard(data) {
    const res = axios({
        method: 'PATCH',
        url: getURL(`/api/patchCard`),
        data,
        withCredentials: true,
    });
    return res;
}

export function patchMoveCards(data) {
    const res = axios({
        method: 'PATCH',
        url: getURL(`/api/patchMoveCards`),
        data,
        withCredentials: true,
    });
    return res;
}

export function deleteCardById(cardId) {
    const res = axios({
        method: 'DELETE',
        url: getURL(`/api/deleteCard/${cardId}`),
        withCredentials: true,
    });
    return res;
}

export async function postCard(data) {
    const res = await axios({
        method: 'POST',
        url: getURL(`/api/postCard`),
        data,
        withCredentials: true,
    });
    return res;
}
export async function getMyPlanner() {
    const res = await axios({
        method: 'GET',
        url: getURL('/api/getMyPlanner'),
        withCredentials: true,
    });
    return res.data.data;
}

export async function deleteMyPlanner(plannerId) {
    const res = await axios({
        method: 'DELETE',
        url: getURL(`/api/deletePlanner/${plannerId}`),
        withCredentials: true,
    });
    console.log('del', res);
}
