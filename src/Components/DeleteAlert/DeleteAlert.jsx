import { useEffect } from "react";
import Swal from "sweetalert2";

export default function DeleteAlert({
  onConfirm,
  title = "Are you sure?",
  text = "You won't be able to revert this!",
  onClose,
  
}) {
  useEffect(() => {

    Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
      customClass: {
        confirmButton:
          "bg-red-600 text-white px-4  mx-2 py-2 rounded mr-2 hover:bg-red-700",
        cancelButton:
          "bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
        Swal.fire({
          title: "Deleted!",
          text: "Your item has been deleted.",
          icon: "success",
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "Your item is safe 🙂",
          icon: "error",
        });
      }

      if (onClose) onClose();
    });
  }, []);

  return null;
}
