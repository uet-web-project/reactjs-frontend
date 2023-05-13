import { increment, decrement, incrementByAmount} from "../slices/depSlice"
import { useAppSelector,RootState } from "../store"
import { useDispatch } from "react-redux"


export const depHook = () => {
    const dispatch = useDispatch()
    
    const {value, loading} = useAppSelector((state: RootState) => state.counter)
    
    function callIncrement() {
        dispatch(increment())
    }

    return {
        value,
        loading,
        callIncrement
    }
}