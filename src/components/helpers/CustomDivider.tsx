import React from 'react';
import { CustomBox } from './CustomBox';
import { Divider } from '@material-ui/core';

const CustomDivider = (props: any) => (
  <CustomBox {...props}>
    <Divider />
  </CustomBox>
);

export default CustomDivider;