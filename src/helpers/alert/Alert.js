import React from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

const Alert = {
    show(alert) {
        confirmAlert({
            closeOnClickOutside: false,
            customUI: ({ onClose }) => {
              return (
                <div className="modal-alert">
                    <div className={"modal-content " + alert.type}>       
                        <div className="content">
                            <div className="alert-content">
                                <p className="alert-title">{alert.title}</p>
                                <p className="alert-message">{alert.message}</p>
                            </div>
                            <div className="alert-buttons">
                                <button type="submit" className="btn-large" onClick={() => (onClose(), alert.fnOk())}>{alert.btnOk}</button>
                                { alert.fnCancel ? (
                                    <button type="submit" className="btn-large outline" onClick={() => (onClose(),alert.fnCancel())}>{alert.btnCancel}</button>
                                ) : null }
                            </div>
                        </div>
                    </div>
                </div>
              );
            }
        }); 
    }

}


export default Alert
