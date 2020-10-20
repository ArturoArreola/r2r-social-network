import React from 'react';
import "./HomePage.scss";
import BasicLayout from "../../layout/BasicLayout";

export default function HomePage(props) {

    const { setRefreshCheckLogin } = props;
    return (
        <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin} >
            <h2>This is the home page</h2>
        </BasicLayout>
    )
}
