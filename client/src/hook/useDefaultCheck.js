import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { siteActions } from '../store/site';
import { plannerListActions } from '../store/plannerList';
import { plannerListCardStatusDevide } from '../utils/DataParsing';
import { getMyPlanner } from '../utils/DataAxios';
import { useLocation, useNavigate } from 'react-router';
import { calendarActions } from '../store/calendar';

export default function useDefaultCheck(target) {
    const site = useSelector((state) => state.site);
    const navi = useNavigate();
    const location = useLocation();
    const { isLogin, isData } = site;

    const [cookies, setCookie, removeCookie] = useCookies('auth');

    const dispatch = useDispatch();

    useEffect(() => {
        if (Object.keys(cookies).length === 0) {
            if (isLogin) {
                navi('/', {
                    state: {
                        message: '쿠키가 만료되어 재로그인이 필요합니다',
                    },
                });
            } else if (location.pathname !== '/') {
                navi('/', {
                    state: {
                        message: '로그인 되지 않은 사용자 입니다',
                    },
                });
            }
        } else if (!isLogin || !isData) {
            getMyPlannerAndDispatch();
        }

        return () => {
            if (Object.keys(cookies).length === 0) {
                navi('/', { state: null });
            }
        };
    }, [site]);

    const getMyPlannerAndDispatch = async () => {
        const plannerList = await getMyPlanner();
        const newPlannerList = plannerListCardStatusDevide(plannerList);
        console.log('plannerList', newPlannerList);
        dispatch(plannerListActions.setPlannersInit(newPlannerList));
        if (newPlannerList.length > 0) {
            const plannerId = newPlannerList[0].plannerId;
            dispatch(
                calendarActions.setSelect({
                    target,
                    value: [plannerId],
                })
            );
        }
        dispatch(siteActions.setAllTrue(true));
    };

    return isLogin;
}
