import React from 'react';
import MediaQuery from 'react-responsive';

export const Mobile = props => <MediaQuery {...props} maxWidth={768} />;

export const Desktop = props => <MediaQuery {...props} minWidth={769} />;
