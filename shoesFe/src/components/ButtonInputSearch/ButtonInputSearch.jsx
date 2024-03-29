import React from "react";
import { Input, Button } from "antd";

const ButtonInputSearch = (props) => {
    const { size, placeholder, textbutton, bordered } = props
    return (
        <div style={{ display: 'flex' }}>
            <Input size={size} placeholder={placeholder} {...props} />
            <Button style={{ background: '#7D7C7C' }} size={size} icon={<i className="fa-solid fa-magnifying-glass"></i>}>{textbutton}</Button>

        </div>

    )
}
export default ButtonInputSearch