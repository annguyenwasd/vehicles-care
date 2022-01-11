import * as React from 'react';
import { HelperText as HelperTextBase } from 'react-native-paper';

const noop = () => {};

type Props = {
  visible?: boolean;
  type: 'info'| 'error'
  children: React.ReactNode;
  [key:string]: any;
};

export function HelperText(props: Props) {
  const { children, visible = true, type = 'info', ...rest } = props;

  return (
    <HelperTextBase
      type={type}
      visible={visible}
      onPressIn={noop}
      onPressOut={noop}
      {...rest}
    >
      {children}
    </HelperTextBase>
  );
}
