// import React, { useState } from 'react';
// import { Toast } from 'react-bootstrap';

// function CustomToast() {
//     const [showToast, setShowToast] = useState(true);

//     const handleClose = () => setShowToast(false);

//     return (
//         <div
//             style={{
//                 position: 'fixed',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 zIndex: 1000 // Adjust z-index as needed
//             }}
//         >
//             <Toast show={showToast} onClose={handleClose}>
//                 <Toast.Header>
//                     {/* <img
//                         src="..."
//                         className="rounded me-2"
//                         alt="..."
//                     /> */}
//                     <strong className="me-auto">Bootstrap</strong>
//                     <small className="text-body-secondary">now</small>
//                     <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
//                 </Toast.Header>
//                 <Toast.Body>You can only add one review buddy!!</Toast.Body>
//             </Toast>
//         </div>
//     );
// }

// export default CustomToast;


// import React from "react";

// export default function CustomToast()
// {
//     return(
//         <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
//             <div className="toast-header">
//                 <img src="..." className="rounded me-2" alt="..." />
//                 <strong className="me-auto">Bootstrap</strong>
//                 <small className="text-body-secondary">11 mins ago</small>
//                 <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
//             </div>
//             <div className="toast-body">
//                 Hello, world! This is a toast message.
//             </div>
//         </div>
//     )
// }

import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';

export default function CustomToast() {
    const [showToast, setShowToast] = useState(true);

    const handleClose = () => setShowToast(false);

    return (
        <Toast show={showToast} onClose={handleClose}>
            <Toast.Header>
                <img src="..." className="rounded me-2" alt="..." />
                <strong className="me-auto">Bootstrap</strong>
                <small className="text-body-secondary">11 mins ago</small>
                <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
            </Toast.Header>
            <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
        </Toast>
    );
}
