import { FC, Fragment, memo } from "react";
import { PointRipple } from "@/components/Map/marker";


const ripples = [0, 1, 2];


export const IconApp: FC = memo(function IconApp() {
  return (
    <Fragment>
      {ripples.map((index) => (
        <PointRipple
          key={index}
          index={index}
        />
      ))}
    </Fragment>
  );
});