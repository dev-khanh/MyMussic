/* eslint-disable prettier/prettier */
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Drag(props) {
	return (
		<Svg {...props} viewBox="0 0 49 49">
			<Path
				d="m8.568,28.89065c0,0.531 0.21,1.039 0.585,1.414c0.376,0.376 0.94109,0.44327 1.47209,0.44327c5.745,0 22.16836,-0.11419 27.91436,-0.11419c0.53,0 1.06755,-0.03872 1.44255,-0.41472c0.375,-0.375 0.47181,-0.76881 0.47181,-1.29981c0,-0.53 -0.09681,-1.06755 -0.47181,-1.44255c-0.375,-0.375 -0.884,-0.30053 -1.64238,-0.30053c-0.75837,0 -22.05517,-0.05709 -27.80017,-0.05709c-0.531,0 -1.01045,-0.01738 -1.38645,0.35762c-0.375,0.375 -0.585,0.884 -0.585,1.414c0,0 0,0 0,0zm0,-7.998c-0.04265,1.06135 0.86535,1.53955 1.96935,1.53955c5.743,0 22.02577,0.08596 27.77277,0.08596c0.53,0 1.15361,0.07653 1.52861,-0.29947c0.375,-0.375 0.586,-0.883 0.586,-1.414c0,-0.53 -0.18234,-0.92439 -0.55734,-1.29939c-0.375,-0.375 -0.8267,-0.47138 -1.3567,-0.47138c-5.746,0 -22.19769,-0.14327 -27.94269,-0.14327c-0.531,0 -1.039,0.211 -1.415,0.586c-0.375,0.375 -0.585,0.884 -0.585,1.414c0,0.001 0.04265,-1.05935 0,0.002z"
				fill="#fff"
			/>
		</Svg>
	);
}
