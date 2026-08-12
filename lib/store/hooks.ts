import { AppDispatch, RootState } from "./store";
import { useSelector, useDispatch } from "react-redux";

export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()