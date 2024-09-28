import ReactModal from 'react-modal'
import { IoCloseOutline } from "react-icons/io5"

const Modal = ({ children, shown, closeFunc, className }) => {

    return (
        <ReactModal
            isOpen={shown}
            onRequestClose={closeFunc}
            closeTimeoutMS={490}
            preventScroll={true}
            overlayClassName="modal"
            className={{
                base: `modal-container ${className}`,
                beforeClose: "modal-closed"
            }}
        >

            <IoCloseOutline className='modal-icon' onClick={closeFunc}/>

            {children}

        </ReactModal>
    )
}

export default Modal