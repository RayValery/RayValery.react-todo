import {Button, Checkbox, Dropdown, Menu, Typography} from 'antd';
import {CheckOutlined, DeleteOutlined, DownOutlined, FlagOutlined} from '@ant-design/icons';


const {Paragraph} = Typography;

export const ToDoItem = (props) => {
    const {item, onCheck, onRemove, onChange} = props;

    const priorityColorMapping = {
        '1': 'silver',
        '2': 'blue',
        '3': 'orange',
        '4': 'red'
    };

    const onRemoveItem = (e) => {
        e.preventDefault();
        if (onRemove) {
            onRemove(item.id);
        }
    }

    const onCheckItem = () => {
        if (onCheck) {
            onCheck(item.id);
        }
    }

    const onEditItem = (str) => {
        item.content = str;
        onChange(item.id);
    }

    const onSelectPriority = ({key: priority}) => {
        item.priority = Number(priority);
        onChange(item.id);
    };

    const renderPriorityIcon = (priority) => {
        return (
            <FlagOutlined style={{color: priorityColorMapping[priority]}}/>
        )
    };

    const renderPriorityDropdown = (currentPriority) => {
        const menu = (
            <Menu onClick={onSelectPriority}>
                {
                    Object.keys(priorityColorMapping).map((priority) =>
                        <Menu.Item key={priority}>
                            {renderPriorityIcon(priority)}
                            {Number(priority) === currentPriority ? <CheckOutlined/> : null}
                        </Menu.Item>
                    )
                }
            </Menu>
        );

        return (
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <DownOutlined/>
                </a>
            </Dropdown>
        );
    }

    return (
        <li className="todo-item" key={item.id}>
            <div className="todo-item-body">
                <Checkbox
                    checked={item.checked}
                    onChange={onCheckItem}
                ></Checkbox>
                <Paragraph style={item.checked ? {'color': 'grey', 'text-decoration': 'line-through'} : {'fontWeight': 'bold'}}
                           editable={{onChange: onEditItem}}>
                    {renderPriorityIcon(item.priority)} {renderPriorityDropdown(item.priority)} {item.content}
                </Paragraph>
            </div>
            <Button danger="true" type="primary" onClick={onRemoveItem} icon={<DeleteOutlined/>}></Button>
        </li>
    )
}