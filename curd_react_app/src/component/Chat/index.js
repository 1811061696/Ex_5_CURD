import { Bar } from 'react-chartjs-2';


import classNames from 'classnames/bind';
import styles from './Chat.module.scss'
const cx = classNames.bind(styles)



function Chat() {
    return ( <div className={cx("chat")}>
        {/* <Bar
        data={{
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        }}
            max-width={600}
            height={600}
            options = {{
                maintainAspectRatio: false,
            }}
         /> */}
         <h1>Chart</h1>
    </div> );
}

export default Chat;