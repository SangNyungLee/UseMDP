import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { siteActions } from '../store/site';
import { plannerListActions } from '../store/plannerList';
import { plannerListCardStatusDevide } from '../utils/DataParsing';
import { getMyPlanner, postLogout } from '../utils/DataAxios';
import { useLocation, useNavigate } from 'react-router';
import { calendarActions } from '../store/calendar';
import { cookieFail, loginCheckFail, requestFail } from '../component/etc/SweetModal';

export default function useDefaultCheck() {
    const site = useSelector((state) => state.site);
    const navi = useNavigate();
    const location = useLocation();
    const { isLogin, isData } = site;

    const [ cookies ] = useCookies();

    const authCookie = cookies.auth;

    const dispatch = useDispatch();

    useEffect(() => {
        if (!authCookie) {
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
            if (!authCookie) {
                navi('/', { state: null });
            }
        };
    }, [site]);

    const getMyPlannerAndDispatch = async () => {
        const result = await getMyPlanner();
        if(result.status === 200){
            const plannerList = result.data.data
            if(plannerList.length > 0){
                const newPlannerList = plannerListCardStatusDevide(plannerList);
                dispatch(plannerListActions.setPlannersInit(newPlannerList));
                const plannerId = newPlannerList[0].plannerId;
                dispatch(
                    calendarActions.setAll([plannerId])    
                );
            }
            dispatch(siteActions.setAllTrue());
        } else {
            try {
                const res = await postLogout();
                if(res.status !== 200){
                    requestFail("로그아웃")
                }
            } catch (error) {
                console.log(error)
            }
        }
    };

    const naviCookieCheck = (e) => {
        if(!isLogin){
            e.preventDefault();
            loginCheckFail("이동")
        } else if(!authCookie){
            e.preventDefault();
            cookieFail("이동")
        }
    }

    const cookieCheckCallback = (e,callback) => {
        if(!authCookie){
            e.preventDefault();
            callback();
        }
    }


    return {
        isLogin,
        naviCookieCheck,
        cookieCheckCallback,
    }
}
