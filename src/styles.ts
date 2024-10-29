import { COLORS } from "./constants";

export const styles = `
  .qi_infoBlock {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 3px 6px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    transition: box-shadow 0.5s;
  }

  .qi_infoContainer {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 3px;
    font-weight: bold;
  }

  .qi_altStacking {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .qi_behind {
    z-index: 5;
  }

  .qi_highlighted {
    box-shadow: 0 0 10px 10px white !important;
  }

  .qi_infoContainer:not(.qi_warnOff) .qi_warning { 
    animation: qi-warning-blink 1s infinite;
  }

  @keyframes qi-warning-blink {
    0% { color: ${COLORS.red}; }
    50% { color: white; }
    100% { color: ${COLORS.red}; }
  }
`