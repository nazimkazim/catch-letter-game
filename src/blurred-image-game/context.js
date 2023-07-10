import React, { useEffect, useState } from 'react';

export const AppContext = React.createContext(null);

export const BlurGameWrapper = (props) => {

	return <AppContext.Provider>{props.children}</AppContext.Provider>;
};
