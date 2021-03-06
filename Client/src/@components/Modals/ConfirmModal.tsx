import React, { useState } from 'react';
import { Modal, Icon, Button } from 'rsuite';

const ConfirmModal : React.FunctionComponent<any> = (props) =>{
    const [show, setShow] = useState(false);

    const close = () =>{
      return null;
    }

    return(
        <Modal backdrop="static" show={show} onHide={close} size="xs">
          <Modal.Body>
            <Icon
              icon="remind"
              style={{
                color: '#ffb300',
                fontSize: 24
              }}
            />
            {'  '}
            Once a project is disabled, there will be no update on project report, and project
            members can access history data only. Are you sure you want to proceed?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={close} appearance="primary">
              Ok
            </Button>
            <Button onClick={close} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
    )
}

export default ConfirmModal;