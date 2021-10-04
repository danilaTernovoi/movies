import React from 'react';
import { createPortal } from 'react-dom';
import { Alert as AntdAlert } from 'antd';

const modalContainer = document.getElementById('modal');

const Alert = ({ message }) => createPortal(
  <AntdAlert message={message} />,
  modalContainer
);


export default Alert;
