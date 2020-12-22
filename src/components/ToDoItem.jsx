import { Button, Checkbox, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export const ToDoItem = (props) => {
    const { item, onCheck, onRemove, onChange } = props;
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

    const { Paragraph } = Typography;

    return (
        <li className="todo-item" key={item.id}>
            <div className="todo-item-body">
            <Checkbox
                checked={item.checked}
                onChange={onCheckItem}
            ></Checkbox>
            <Paragraph style={ item.checked ? {'color': 'grey', 'text-decoration': 'line-through'} : {'fontWeight': 'bold'}}editable={{ onChange: onEditItem }}>{item.content}</Paragraph>
            </div>
            <Button danger = "true" type = "primary" onClick={onRemoveItem} icon={<DeleteOutlined />}></Button>
        </li>
    )
}