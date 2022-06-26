import React from 'react';

import { Dialog, DialogTitle } from '@mui/material';
import Slide from '@mui/material/Slide';
import { Close } from '@mui/icons-material';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogComp = ({ open, handleClose, children }) => {

    return (
        <Dialog
            fullWidth={true}
            maxWidth={"sm"}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <div style={{ backgroundColor: "black" }}>
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', fontSize: '35px', color: "#fff" }}>
                    Account Info
                    <Close onClick={handleClose} sx={{ position: "absolute", right: '20px', margin: "10px", borderRadius: "50%", backgroundColor: "grey" }} />
                </DialogTitle>
                {children}

            </div>

        </Dialog>
    )
}

export default DialogComp