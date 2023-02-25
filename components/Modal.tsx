import { JSX } from "preact/jsx-runtime";

interface ModalProps {
  title: string;
  show: boolean;
  onClose: () => void;
  closeText?: string;
  children: JSX.Element | JSX.Element[];
}

function Modal({ title, children, show, onClose, closeText = "Close" }: ModalProps) {
  function handleBackgroundClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains("modal-background")) {
      onClose();
    }
  }

  if (!show) {
    return null;
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" onClick={handleBackgroundClick}>
      <div className="flex items-center justify-center min-h-screen px-4 pt-6 pb-24 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="modal-background absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:(inline-block align-middle h-screen)"></span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:(my-8 align-middle max-w-lg w-full)">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="mt-3 text-center sm:(mt-0 ml-4 text-left)">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
              <div className="mt-2">{children}</div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:(px-6 flex flex-row-reverse)">
            <button
              onClick={onClose}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:(outline-none ring-2 ring-offset-2 ring-blue-500) sm:(ml-3 w-auto text-sm)"
            >
              {closeText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
