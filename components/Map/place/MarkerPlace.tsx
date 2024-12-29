import { FC, memo } from "react";
import { useMap } from "../MapContext";
import { MarkerAnimated } from "react-native-maps";
import { PointRipple, ripples } from "./PointRipple";



export const MarkerPlace: FC = memo(function MarkerPlace() {

  const {newPlace} = useMap();

  const coordinate = newPlace?.coordinate;


  if (!newPlace?.open || !coordinate) return null;


  return (
    <MarkerAnimated
      coordinate={coordinate}
    >
        {ripples.map((index) => (
          <PointRipple
            key={index}
            index={index}
          />
        ))}
    </MarkerAnimated>
  );
});