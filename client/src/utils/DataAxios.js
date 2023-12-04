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
    try {
        const res = await axios({
            method: 'POST',
            url: getURL('/api/postPlanner'),
            data,
            withCredentials: true,
        });
        return res;
    } catch (error) {
        console.log('error', error);
        return error;
    }
}

export async function postPlannerCards(unspecifiedplanner) {
    try {
        const res = await axios({
            method: 'POST',
            url: getURL('/api/postPlannerWithCards'),
            data: unspecifiedplanner,
            withCredentials: true,
        });
        console.log('post planner cards', res);
        return res;
    } catch (error) {
        console.log('error', error);
        return error;
    }
}

export async function getCardAxios(cardId) {
    try {
        const res = await axios({
            method: 'GET',
            url: getURL(`/api/getCard/${cardId}`),
            withCredentials: true,
        });
        console.log('get card axios', res);
        return res;
    } catch (error) {
        console.log('error', error);
        return error;
    }
}

export async function getTags() {
    try {
        const res = await axios({
            method: 'GET',
            url: getURL(`/api/getTags`),
            withCredentials: true,
        });
        console.log('getTags', res);
        return res;
    } catch (error) {
        console.log('error', error);
        return error;
    }
}

export async function getPlannerBtoA(btoaId) {
    try {
        const res = await axios({
            method: 'GET',
            url: getURL(`/api/getPlanner/${btoaId}`),
            withCredentials: true,
        });
        console.log('get planner btoa', res);
        return res;
    } catch (error) {
        console.log('error', error);
        return error;
    }
}

export async function getPlannerByTrend() {
    try {
        const res = await axios({
            method: 'GET',
            url: getURL(`/api/getPlanner/trending`),
            withCredentials: true,
        });
        console.log('get planner trending', res);
        return res;
    } catch (error) {
        console.log('error', error);
        return error;
    }
}

export async function getPlannerByBasic() {
    try {
        const res = await axios({
            method: 'GET',
            url: getURL(`/api/getPlanner/default`),
            withCredentials: true,
        });
        console.log('get planner default', res);
        return res;
    } catch (error) {
        console.log('error', error);
        return error;
    }
}
export async function getPlanners() {
    try {
        const res = await axios({
            method: 'GET',
            url: getURL(`/api/getPlanners`),
            withCredentials: true,
        });
        console.log('get planners', res);
        return res;
    } catch (error) {
        console.log('error', error);
        return error;
    }
}

export async function postCopyPlanners(plannerId) {
    try {
        const res = await axios({
            method: 'POST',
            url: getURL(`/api/postPlanner/copy`),
            data: { plannerId },
            withCredentials: true,
        });
        console.log('post planner copy', res);
        return res;
    } catch (error) {
        console.log('error', error);
        return error;
    }
}

export async function patchCard(data) {
    try {
        const res = await axios({
            method: 'PATCH',
            url: getURL(`/api/patchCard`),
            data,
            withCredentials: true,
        });
        console.log('patch card', res);
        return res;
    } catch (error) {
        console.log('error', error);
        return error;
    }
}

// 에러 수정이 애매해서 패스
export function patchMoveCards(data) {
    try {
        const res = axios({
            method: 'PATCH',
            url: getURL(`/api/patchMoveCards`),
            data,
            withCredentials: true,
        });
        console.log('patch move cards', res);
        return res;
    } catch (error) {
        console.log('error', error);
        return error;
    }
}

// 마찬가지로 수정 애매.. async 아님
export function deleteCardById(cardId) {
    try {
        const res = axios({
            method: 'DELETE',
            url: getURL(`/api/deleteCard/${cardId}`),
            withCredentials: true,
        });
        console.log('delete card by id', res);
        return res;
    } catch (error) {
        console.log('error', error);
        return error;
    }
}

export async function postCard(data) {
    try {
        const res = await axios({
            method: 'POST',
            url: getURL(`/api/postCard`),
            data,
            withCredentials: true,
        });
        console.log('post card', res);
        return res;
    } catch (error) {
        console.log('error', error);
        return error;
    }
}
export async function getMyPlanner() {
    try {
        const res = await axios({
            method: 'GET',
            url: getURL('/api/getMyPlanner'),
            withCredentials: true,
        });

        console.log('get my planner', res);
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function deleteMyPlanner(plannerId) {
    try {
        const res = await axios({
            method: 'DELETE',
            url: getURL(`/api/deletePlanner/${plannerId}`),
            withCredentials: true,
        });
        console.log('delete planner', res);
        return res;
    } catch (error) {
        console.log('error', error);
        return error;
    }
}

export async function patchPlanner(plannerData) {
    try {
        const res = await axios({
            method: 'PATCH',
            url: getURL(`/api/patchPlanner`),
            data: plannerData,
            withCredentials: true,
        });
        console.log('patch planner', res);
        return res;
    } catch (error) {
        console.log('error', error);
        return error;
    }
}
export async function deleteCheckList(id) {
    try {
        const res = await axios({
            method: 'DELETE',
            url: getURL(`/api/deleteCheckList/${id}`),
            withCredentials: true,
        });
        console.log('delete checklist', res);
        return res;
    } catch (error) {
        console.log('error', error);
        return error;
    }
}

// java 쪽에서 res status를 안 보내줌
export async function getLikesAxios() {
    try {
        const res = await axios({
            method: 'GET',
            url: getURL('/api/getLikes'),
            withCredentials: true,
        });
        console.log('get likes', res);
        return res;
    } catch (error) {
        console.log('error', error);
        return error;
    }
}

export async function postPlannerLike(plannerId) {
    try {
        const res = await axios({
            method: 'POST',
            url: getURL(`/api/postPlanner/like`),
            data: {
                plannerId,
            },
            withCredentials: true,
        });
        console.log('plannerLike', res);
        return res;
    } catch (error) {
        console.log('error', error);
        return error;
    }
}

export async function deletePlannerUnlike(plannerId) {
    try {
        const res = await axios({
            method: 'DELETE',
            url: getURL('/api/patchPlanner/unlike'),
            data: { plannerId },
            withCredentials: true,
        });
        console.log('delete planner like', res);
        return res;
    } catch (error) {
        console.log('error', error);
        return error;
    }
}

export async function postLogout() {
    try {
        const res = await axios({
            method: 'POST',
            url: getURL('/api/logout'),
            withCredentials: true,
        });
        console.log('logout', res);
        return res;
    } catch (error) {
        console.log('error', error);
        return error;
    }
}

export async function postPlanner(data) {
    try {
        const res = await axios({
            method: 'POST',
            url: getURL('/api/postPlanner'),
            data,
            withCredentials: true,
        });
        console.log('post planner', res);
        return res;
    } catch (error) {
        console.log('error', error);
        return error;
    }
}
