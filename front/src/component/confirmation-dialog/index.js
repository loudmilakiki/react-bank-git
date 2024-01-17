const ConfirmationDialog = ({ confirmationCode, onConfirm, onCancel }) => (
  <div className="confirmation-dialog">
    <p>Your confirmation code is: {confirmationCode}</p>
    <button onClick={onConfirm}>Proceed</button>
    <button onClick={onCancel}>Cancel</button>
  </div>
);

export default ConfirmationDialog;
