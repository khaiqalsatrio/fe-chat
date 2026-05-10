import { LogOut, X, Loader2 } from 'lucide-react';
import '../assets/css/components/LogoutModal.css';

interface LogoutModalProps {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, isLoading, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>
        
        <div className="modal-icon-wrapper">
          <div className="modal-icon">
            <LogOut size={32} />
          </div>
        </div>
        
        <div className="modal-header">
          <h2>Sign Out</h2>
          <p>Are you sure you want to sign out of your account? You will need to login again to access your messages.</p>
        </div>
        
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose} disabled={isLoading}>
            Cancel
          </button>
          <button className="btn-logout" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 size={18} className="spinner" style={{ animation: 'spin 1s linear infinite' }} />
                <span>Signing Out...</span>
              </>
            ) : (
              'Sign Out'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
