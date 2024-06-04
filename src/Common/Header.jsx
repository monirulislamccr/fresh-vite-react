import React, { useContext } from 'react';
import DataProvider from './Context/DataProvider';

const Header = () => {
    const {token} = useContext(DataProvider);
    return (
        <div className='text-center text-5xl my-9 text-black'>
            This is header {token}
        </div>
    );
};

export default Header;