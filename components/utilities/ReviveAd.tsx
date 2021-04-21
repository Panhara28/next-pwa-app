import { FC, useEffect, useState } from "react";
import useScript from "../hooks/useScript";

interface Props {
  zoneId: number;
  screens: string[];
  categorySlug?: string;
  fullWidth?: boolean;
  className?: string
}

const ReviveAd:FC<Props> = (props) => {
  const reviveId = "cd1bc51d84152257e4b8d51bcbb27650";
  const [scriptReviveAd, setReviveAdScript] = useState('');
  const [hasReviveAdLoaded] = useScript(scriptReviveAd, { async: true, isEnabled: !!scriptReviveAd });
  const [display, setDisplay] = useState(false);
  const breakpoints = {
    "mobile": [0, 699],
    "tablet": [700, 768],
    "tablet-big": [769, 1024],
    "desktop": [1024, 9999999]
  };

  useEffect(() => {
    if(!display) {
      for(const screen of props.screens) {
        if(window.innerWidth >= breakpoints[screen][0] && window.innerWidth <= breakpoints[screen][1]) {
          setDisplay(true);
          break;
        }
      }
    } else {
      if(hasReviveAdLoaded && (window as any).reviveAsync) {
        (window as any).reviveAsync[reviveId].apply(
          (window as any).reviveAsync[reviveId].detect()
        );
      } else {
        setReviveAdScript("https://ads.groupincorp.com/www/delivery/asyncjs.php");
      }
    }
  }, [hasReviveAdLoaded, display, props.categorySlug]);

  return (
    display ? 
      <div key={props.categorySlug} className={`revive-ads ${(props.fullWidth ? "full-width": "")} ${props.className}`}>
        {
          props.categorySlug ?
            <ins
              data-revive-category={props.categorySlug}
              data-revive-zoneid={props.zoneId}
              data-revive-id={reviveId}
            /> : 
            <ins
              data-revive-zoneid={props.zoneId}
              data-revive-id={reviveId}
            />
        } 
      </div> : <></>
  );
}

export default ReviveAd;