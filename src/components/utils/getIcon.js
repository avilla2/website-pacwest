import React from 'react';
import * as Icons from '@mui/icons-material';
import Ducklogo from '../../images/ducklogo';

export default function GetIcon({ iconName, classes, fontSize }) {
    let DynamicIcon = iconName === 'Oregon' ? Ducklogo : Icons[iconName];
    return(
        <DynamicIcon className={classes} fontSize={fontSize} />
      );
}