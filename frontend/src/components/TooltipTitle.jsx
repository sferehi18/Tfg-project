import { useState } from "react";
import { Overlay, OverlayTrigger, Tooltip } from "react-bootstrap";
function TooltipTitle({ fontsize, text, tooltipText,customClasses }) {
    const [show, setShow] = useState(false);
    const tooltip = 
        <Tooltip placement="bottom" show={show}>
                {tooltipText}
            </Tooltip>;

    return (
        <>
        <OverlayTrigger placement="top" overlay={tooltip}>
            <p
                className={`${customClasses}`}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            >
                {text}
            </p>
        </OverlayTrigger>
            
            
        </>
    );
}

export default TooltipTitle;