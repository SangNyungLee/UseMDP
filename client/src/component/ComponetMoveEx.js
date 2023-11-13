import { forwardRef } from "react";

const ComponenetMoveEx = forwardRef((props,ref) => {
    return <div ref={ref} {...props}> 이동 예시 </div>
})

export default ComponenetMoveEx;