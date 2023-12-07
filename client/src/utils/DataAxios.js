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

export async function postPlannerCards(unspecifiedplanner) {
    try {
        const res = await axios({
            method: 'POST',
            url: getURL('/api/postPlannerWithCards'),
            data: unspecifiedplanner,
            withCredentials: true,
        });
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
        return res;
    } catch (error) {
        console.log('error', error);
        return error;
    }
}

export async function patchPlanner(plannerData) {
    const { taglist } = plannerData;
    try {
        const res = await axios({
            method: 'PATCH',
            url: getURL(`/api/patchPlanner`),
            data: {
                ...plannerData,
                taglist: taglist ? taglist : [],
            },
            withCredentials: true,
        });
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
        return res;
    } catch (error) {
        console.log('error', error);
        return error;
    }
}

export async function deleteTagList(data) {
    try {
        const res = await axios({
            method: 'delete',
            url: getURL(`/api/deleteTaglist/${data}`),
            withCredentials: true,
        });
        return res;
    } catch (error) {
        console.log('error', error);
        return error;
    }
}
