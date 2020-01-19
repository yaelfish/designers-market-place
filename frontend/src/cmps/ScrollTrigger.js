import React from 'react';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

export default function ScrollTrigger(props) {
    return useScrollTrigger({ threshold: 0, disableHysteresis: true })
}