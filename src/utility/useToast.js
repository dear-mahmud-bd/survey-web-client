import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const showToast = (type, message) => {
    toast[type](message, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
};

export const sweetToast = (s_title, s_message, s_icon) => {
    Swal.fire({
        title: s_title,
        text: s_message,
        icon: s_icon,
        confirmButtonText: 'Okay',
        customClass: {
            confirmButton: 'btn btn-success text-white'
        }
    });
};