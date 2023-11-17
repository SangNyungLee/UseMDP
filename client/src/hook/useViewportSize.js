import { useState } from 'react';

export default function useViewportSize(size) {
	const [viewportWidth, setViewportWidth] = useState();
	const [viewportHeight, setViewportHeight] = useState();
}
