import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useCookies } from 'react-cookie';
import { useDispatch } from "react-redux";
import { siteActions } from "../store/site";
import { plannerListActions } from "../store/plannerList";

export default function useDefaultCheck(){
    const site = useSelector( state => state.site);
    const { isLogin, isData } = site;

    const [cookies, setCookie, removeCookie] = useCookies('auth');

    const dispatch = useDispatch();

    useEffect(()=>{
        if( !isLogin && Object.keys(cookies).length > 0 ) {
            const fetchData = async() => {
                const res = await axios({
                    method: "GET",
                    url: "http://localhost:8080/api/getMyPlanner",
                    withCredentials: true
                })
                dispatch(plannerListActions.setPlannersInit(res.data.data))
            }
            fetchData()
            dispatch(siteActions.setAllTrue(true));
        } else if( isLogin && !isData ) {
            const fetchData = async() => {
                const res = await axios({
                    method: "GET",
                    url: "http://localhost:8080/api/getMyPlanner",
                    withCredentials: true
                })
                dispatch(plannerListActions.setPlannersInit(res.data.data))
            }
            fetchData()
            dispatch(siteActions.setIsData(true));
        }
    },[site])

    return isLogin;
}