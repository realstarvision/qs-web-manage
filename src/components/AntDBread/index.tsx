import React, { useEffect, useState } from 'react'

import { Breadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom';



export default function index(props) {

    const nowLocation = useLocation()
    const [bread, setBread] = useState({
        pathSnippets: null, //这个变量用于存放path
        extraBreadcrumbItems: null,  //这个变量用于存放面包屑的组件
    })
    const getPath = () => {
        const res = nowLocation.pathname.split('/').filter(i => i)
        const arr = res.map((value, index) => {
            let url = `/${res.slice(0, index + 1).join('/')}`;
            // console.log(url)
            // console.log(nowLocation)
            // console.log(props.breadcrumbNameMap[url])
            return <Breadcrumb.Item key={url} >
                <Link to={url}
                    style={{
                        color: url === nowLocation.pathname ? '#1D2129' : '#4E5969',
                        fontWeight: url === nowLocation.pathname ? 600 : 400
                    }}>
                    {props.breadcrumbNameMap[url]}
                </Link>
            </Breadcrumb.Item>
        })
        setBread({
            pathSnippets: null,
            extraBreadcrumbItems: arr

        })
    }
    useEffect(() => {

        getPath()

    }, [nowLocation,props])

    return (
        <Breadcrumb>
            {bread.extraBreadcrumbItems}
        </Breadcrumb>)
}
