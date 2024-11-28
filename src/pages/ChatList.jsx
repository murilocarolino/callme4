import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default () => {

    const [value, setValue] = useState();
    const navigate = useNavigate()

    const handJoinRoom = useCallback(() => {
        navigate(`./room/${value}`)
    }, [navigate, value])

    return (
        <div>
            <input type="text" placeholder='Digite o código' onChange={(e) => setValue(e.target.value)} />
            <button onClick={handJoinRoom}> Entrar </button>
        </div>
    );
};