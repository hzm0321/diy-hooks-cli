/**
 * title: 基本用法
 * desc: 仅在挂载阶段执行一次方法
 */
import React, { useState, useCallback } from 'react';
import { Button, message } from 'antd';
import { useMount } from 'diy-hooks';

const MountComponent = () => {
  useMount(() => {
    message.success('mount 阶段被执行了');
  });
  return <div>新组件挂载了</div>;
};

export default () => {
  const [isMount, setIsMount] = useState(false);

  const handleClick = useCallback(() => {
    setIsMount((v) => !v);
  }, [isMount]);

  return (
    <div>
      <Button type="primary" onClick={handleClick}>
        点击{isMount ? '卸载' : '挂载'} mount 组件
      </Button>
      {isMount && <MountComponent />}
    </div>
  );
};
