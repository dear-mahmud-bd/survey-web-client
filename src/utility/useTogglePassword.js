import { useState } from 'react';

const useTogglePassword = () => {
    const [visible, setVisible] = useState(false);
    const toggleVisibility = () => {
        setVisible((prevVisible) => !prevVisible);
    };
    return [visible, toggleVisibility];
};

export default useTogglePassword;