import { useDispatch } from "react-redux";
import { likeActions } from "../store/like";
import { getLikesAxios } from "../utils/DataAxios";
import { requestFail } from "../component/etc/SweetModal";

export default function useGetData(){
    const dispatch = useDispatch();
    
    const getLikeAndDispatch = async () => {
		const result = await getLikesAxios();
		if (result.status === 200) {
			dispatch(likeActions.setLikesInit(result.data.data));
		} else {
			requestFail('좋아요 불러오기');
		}
	}

    return {
        getLikeAndDispatch,
    }
}