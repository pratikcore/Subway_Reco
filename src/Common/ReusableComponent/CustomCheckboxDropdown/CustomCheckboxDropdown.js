import React, { memo, useCallback, useMemo } from 'react';
import { Tree } from 'antd';
import './index.css'

const CustomCheckboxDropdown = ({
  treeData,
  defaultExpandedKeys,
  defaultSelectedKeys,
  defaultCheckedKeys,
  onSelect,
  onCheck,
  prefixCls,
  autoExpandParent,
  defaultExpandAll,
  defaultExpandParent,
}) => {
  const memoizedOnCheck = useCallback((checkedKeys, info) => {
    onCheck({ checkedKeys, info });
  }, [onCheck]);

  const memoizedOnSelect = useCallback((selectedKeys, info) => {
    onSelect(selectedKeys, info);
  }, [onSelect]);

  const memoizedTreeData = useMemo(() => treeData, [treeData]);

  return (
    <Tree
      checkable
      defaultExpandedKeys={defaultExpandedKeys}
      defaultSelectedKeys={defaultSelectedKeys}
      defaultCheckedKeys={defaultCheckedKeys}
      onSelect={memoizedOnSelect}
      onCheck={memoizedOnCheck}
      prefixCls={prefixCls}
      treeData={memoizedTreeData}
      autoExpandParent={autoExpandParent}
      defaultExpandAll={defaultExpandAll}
      defaultExpandParent={defaultExpandParent}
    />
  );
};

CustomCheckboxDropdown.defaultProps = {
  defaultExpandedKeys: [],
  defaultSelectedKeys: [],
  defaultCheckedKeys: [],
  onSelect: (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  },
  onCheck: (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
    return {checkedKeys, info}
  },
  prefixCls: 'custom-check-dropdown',
  autoExpandParent: false,
  defaultExpandAll: false,
  defaultExpandParent: false,
};

export default memo(CustomCheckboxDropdown);