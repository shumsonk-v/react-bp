import React from 'react';
import { Link } from 'react-router-dom';

const RouteLink = React.forwardRef((props: any, ref) => <Link to={props.to} {...props} ref={ref} />);
export default RouteLink;