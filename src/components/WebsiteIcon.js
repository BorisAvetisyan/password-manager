import { memo } from "react";

function WebsiteIcon({ domain, width = '50px', height = '50px' }) {
    return <img src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${domain}&size=50`} alt={"Website icon"} style={{ height, width }} />
}

export default memo(WebsiteIcon);