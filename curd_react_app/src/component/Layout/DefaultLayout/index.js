import Header from "./Header";
import Sidebar from "./Sidebar";

import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
const cx = classNames.bind(styles);

function DefaultLayout({children}) {
    return ( 
        <div>
            <Header />
            <div className={cx("container")}>
                <Sidebar />
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
     );
}

export default DefaultLayout;