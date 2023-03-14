import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, Badge } from 'antd'
import { MenuContext } from "@/utils/context";
import { get } from 'loadsh'
import { sideClose, sideOpen } from '@/assets/index';

const { SubMenu } = Menu
let sideTimer;

const getTreeNode = (treeData, key, value) => {
  for (let i = 0; i < treeData.length; i++) {
    const node = treeData[i];
    if (node[key] === value) {
      return node;
    }
    if (node.childNodes?.length > 0) {
      return getTreeNode(node.childNodes, key, value);
    }
  }
  return null;
}

function Sidebar(props) {
  let navigate = useNavigate()
  const Menus = useContext(MenuContext)
  const { menu, selectmenu } = Menus
  // const sideBarMenu = React.useMemo(() => {
  // return (menu.childNodes || []).map((i, idx) => ({ ...i, key: i.uri ? menu.uri + i.uri : 'sub' + (idx + 1) }))
  // }, [menu])
  console.log();

  const [sideBarWidth, setSideBarWidth] = useState('0');
  const [isOpen, setIsOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState([''])
  // 获取pathname
  let location = useLocation()
  const { pathname } = location
  const toggleSideBar = () => {
    if (isOpen) {
      setSideBarWidth('-250px')
      setIsOpen(false)
    } else {
      setSideBarWidth('0')
      setIsOpen(true)
    }

    // 解决antd 3.x版本table组件固定列在高度变化时和其他列对不齐的问题
    sideTimer && clearTimeout(sideTimer);
    sideTimer = setTimeout(() => {
      let e = new Event('resize');
      window.dispatchEvent && window.dispatchEvent(e)
    }, 500)
  }

  // useEffect(() => {
  //   const { ACTION_TOGGLE_MENU } = actions;

  //   addListenerEvent(ACTION_TOGGLE_MENU, (msg) => {
  //     toggleSideBar();
  //   })
  // }, []);

  useEffect(() => {
    // const { pathname } = props.history && props.history.location || {};
    const { pathname } = location
    // const result = pathname.split('/')
    // console.log('执行result了吗？？？');

    setActiveMenu([pathname]);

  }, [menu]);
  // console.log('执行result了吗？？？11', activeMenu);
  useEffect(() => {
    // if (historyAction === 'POP') {
    // const result = pathname.split('/')
    // setActiveMenu([`/${result[1]}`]);
    // }
  }, [pathname]);

  // useEffect(() => {
  //   const onHashchange = () => {
  //     const path = location.hash.split('/').slice(1);
  //     if (menu.includes(path)) {
  //       setActiveMenu([path]);
  //     }
  //     const node = getTreeNode(sideBarMenu, 'uri', path);
  //     if (node && node.uri !== activeMenu[0]) {
  //       setActiveMenu([node.uri]);
  //     }
  //   }
  //   window.addEventListener('hashchange', onHashchange, false);
  //   return () => window.removeEventListener('hashchange', onHashchange);
  // }, [sideBarMenu]);

  const handleClick = (e) => {
    navigate(e.key)
  }
  {
    // console.log('123', sideBarMenu)
  }
  return (
    <div style={{ width: 240, height: '100%', overflowY: 'auto', overflowX: 'hidden', marginLeft: sideBarWidth, transition: 'margin 0.3s ease', backgroundColor: '#fff' }}>
      {/* <Head
        style={{ display: sideBarWidth === '0' ? 'flex' : 'none' }}
        icon={selectmenu && selectmenu.iconUrl}
        title={selectmenu && selectmenu.name}
      /> */}

      <Menu
        onClick={handleClick}
        style={{
          // height: '100%', padding: '46px 0 10px 0',
          height: '100%',
          border: 'none'
        }}
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6', 'sub7', 'sub8', 'sub9', 'sub10']}
        selectedKeys={activeMenu}
        onSelect={(item) => {
          setActiveMenu(item.selectedKeys)
        }}
      >
        {
          menu.map((item, index) => {
            return get(item, 'childNodes') ? (
              <SubMenu
                style={{ fontWeight: 'bold', fontSize: '14px', fontFamily: 'PingFangSC-Medium' }}
                key={item.key || item.uri || index}
                title={(
                  <span style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <span style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                      {/* { item.iconUrl && <img style={{marginRight: 10}} src={item.iconUrl} />} */}
                      <span className="empty-box"></span>
                      {item.name}
                    </span>
                    {false && <Badge color="red" />}
                  </span>
                )}
              >
                {get(item, 'childNodes') && (get(item, 'childNodes')).map((sub, idx) => {
                  return (
                    <Menu.Item
                      style={{ fontWeight: 'normal' }}
                      key={sub.uri ? sub.uri : `${index}-${idx}`}
                    >
                      <span className="empty-box"></span>
                      {sub.name}
                    </Menu.Item>
                  )
                })}
              </SubMenu>
            ) : (
              <Menu.Item
                style={{ fontWeight: 'bold' }}
                key={item.uri ? item.uri : index}
              >
                <span style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  {/* { item.iconUrl && <img style={{marginRight: 10}} src={item.iconUrl} />} */}
                  <span className="empty-box"></span>
                  {item.name}
                </span>
              </Menu.Item>
            )
          })
        }
      </Menu>
      <img className={`sidebar-img ${isOpen ? '' : 'close'}`} src={sideClose} onClick={toggleSideBar} />
    </div>
  )
}

// const Head = ({ icon, title, style }) => {

//   return (
//     <div className="head-bar" style={style}>
//       {icon && <img className="head-img" src={icon} />}
//       <div className="head-title">{title}</div>
//     </div>
//   );
// }

export default Sidebar
