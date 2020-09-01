import React from 'react'
import "./BasicLayout.scss";

export default function BasicLayout(props) {

    const { children } = props;
    return (
        <div>
            <h2>This is the layout...</h2>
            { children }
        </div>
    )
}
