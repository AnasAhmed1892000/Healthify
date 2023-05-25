import React from "react";
import { View } from "react-native";
import Svg, { Circle, ClipPath, Defs, Path } from "react-native-svg";

const HalfCircleClipper = () => {
  const size = 60;
  const radius = size / 2;
  const centerX = size / 2;
  const centerY = size - radius;

  const pathData = `
    M ${centerX},${centerY}
    A ${radius},${radius} 0 0 1 ${centerX - radius},${centerY}
    L 0,${centerY}
    L 0,0
    L ${size},0
    L ${size},${centerY}
    A ${radius},${radius} 0 0 1 ${centerX},${centerY}
    Z
  `;

  return (
    <Svg height={size} width={size}>
      <Defs>
        <ClipPath id="clip-path">
          <Path d={pathData} />
        </ClipPath>
      </Defs>
      <Circle cx={centerX} cy={centerY - 35} r={radius} fill="#fff" />
    </Svg>
  );
};
export default HalfCircleClipper;
