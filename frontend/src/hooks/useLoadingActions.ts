import { useAppDispatch } from "@/lib/hooks";
import {
  showLoading,
  hideLoading,
  updateLoadingMessage,
} from "@/lib/slices/loadingSlice";

export const useLoadingActions = () => {
  const dispatch = useAppDispatch();

  const showLoadingModal = (message?: string, type?: string) => {
    dispatch(showLoading({ message, type }));
  };

  const hideLoadingModal = () => {
    dispatch(hideLoading());
  };

  const updateMessage = (message: string) => {
    dispatch(updateLoadingMessage(message));
  };

  return {
    showLoading: showLoadingModal,
    hideLoading: hideLoadingModal,
    updateMessage,
  };
};
