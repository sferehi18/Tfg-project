import { useState } from "react";
import { Overlay, OverlayTrigger, Tooltip } from "react-bootstrap";
function TooltipTitle({ fontsize, text, tooltipText,customClasses,placement}) {
    const [show, setShow] = useState(false);
    const tooltip = 
        <Tooltip placement="bottom" show={show}>
                {tooltipText}
            </Tooltip>;

    return (
        <>
        <OverlayTrigger placement={placement} style={{width:"fit-content"}} overlay={tooltip}>
            {fontsize == "text" ? <p 
                className={`${customClasses}`}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            >
                {text}
            </p> : (<h2
            className={`${customClasses}`}
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)} 
            >{text}</h2>)}
        </OverlayTrigger>
            
            
        </>
    );
}

export default TooltipTitle;