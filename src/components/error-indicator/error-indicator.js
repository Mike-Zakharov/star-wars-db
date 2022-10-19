import React from "react";

import './error-indicator.css';

const ErrorIndicator = () => {
    return(
        <div className="error-indicator">
            <span className="dps">!DROID PANIC SOUNDS!</span>
            <span>Something went wrong</span>
            <span>(we already sent the droids to fix it)</span>
        </div>
    );
}

export default ErrorIndicator;