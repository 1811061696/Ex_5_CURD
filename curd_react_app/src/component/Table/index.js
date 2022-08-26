
import classNames from 'classnames/bind';
import styles from './index'

const cx = classNames.bind(styles)

function Table({data}) {
    console.log(data)
    return ( <div>
        <h1>Table</h1>
    </div> );
}

export default Table;