import React from 'react';
import { Form, Input, Button } from 'antd';

const { Item } = Form;

export const ToDoForm = (props) => {
    const [form] = Form.useForm();
    const {onSubmit} = props;
    const finish = (values) => {
        onSubmit(values.name);
    }

    return (
        <Form className={'todo-form'} form={form} layout={'inline'} onFinish={finish}>
            <Item name={'name'}>
                <Input placeholder={'Title'} minLength="3" pattern="[A-Z][a-z]*"/>
            </Item>
            <Item>
                <Button htmlType={'submit'}type="primary">Add</Button>
            </Item>
        </Form>
    )
}