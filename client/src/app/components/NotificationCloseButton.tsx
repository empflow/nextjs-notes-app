import CloseIcon from "@/icons/Close";
import { CloseButtonProps } from "react-toastify";

export default function NotificationCloseButton({
  closeToast,
}: CloseButtonProps) {
  return (
    <div onClick={closeToast} className="fill-white">
      <CloseIcon pxSize={15} />;
    </div>
  );
}
