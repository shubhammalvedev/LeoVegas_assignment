import '../styles/ModalPlayer.scss';

const ModalPlayer = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className='modal_container'>
         <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>
                X
                </button>
                {children}
            </div>
    </div>
    </div>
   
  );
};

export default ModalPlayer;
