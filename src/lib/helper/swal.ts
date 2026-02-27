import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const Toast = MySwal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const confirmAlert = (
  title: string,
  text: string,
  confirmButtonText: string,
  cancelButtonText?: string,
) => {
  return MySwal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#059669", // Warna Forest/Green
    cancelButtonColor: "#d33",
    confirmButtonText,
    cancelButtonText,
    customClass: {
      popup: "rounded-2xl",
      confirmButton: "rounded-lg px-4 py-2",
      cancelButton: "rounded-lg px-4 py-2",
    },
  });
};

export default MySwal;
