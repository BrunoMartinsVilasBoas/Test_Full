import React from 'react';
import { IGitHubSearchUser } from '../types/github';

/**
 * Props for the ActionsSelected component
 */
interface ActionsSelectedProps {
  /** Array of currently selected users */
  selectedUsers: IGitHubSearchUser[];
  /** Callback function to duplicate all selected users */
  duplicateSelectedUsers: () => void;
  /** Callback function to delete all selected users */
  deleteSelectedUsers: () => void;
  /** Callback function to either reset selection or select all users */
  resetSelectedUsersOrSelectAllUsers: () => void;
  /** Boolean to indicate if the edit mode is active */
  edit: boolean;
  /** Callback function to toggle the edit mode */
  toggleEdit: () => void;
}

/**
 * ActionsSelected component displays action buttons for managing selected users.
 * Shows the count of selected items and provides actions to duplicate, delete, or reset the selection.
 *
 * @param {ActionsSelectedProps} props - The component props
 * @returns {JSX.Element} The rendered actions bar component
 */
export const ActionsSelected: React.FC<ActionsSelectedProps> = ({
  selectedUsers,
  duplicateSelectedUsers,
  deleteSelectedUsers,
  resetSelectedUsersOrSelectAllUsers,
  edit,
  toggleEdit,
}) => {
  return (
    <div className="container_actions_selected">
      <div className="container_actions_selected_reste_content">
        <div
          className={`container_actions_selected_reste ${selectedUsers.length > 0 && 'background_actions_selected'}`}
          onClick={resetSelectedUsersOrSelectAllUsers}
        >
          <hr />
        </div>
        <span> {selectedUsers.length}</span>elements selected
      </div>
      <div className="container_actions_selected_buttons">
        <img src={'/icon/edit.svg'} alt="Edit" className="icon_actions_selected" onClick={toggleEdit} />

        {edit && (
          <>
            <img
              src={'/icon/duplicate.svg'}
              alt="Duplicate"
              onClick={duplicateSelectedUsers}
              className="icon_actions_selected"
            />
            <img src={'/icon/trash.svg'} alt="Delete" onClick={deleteSelectedUsers} className="icon_actions_selected" />
          </>
        )}
      </div>
    </div>
  );
};
