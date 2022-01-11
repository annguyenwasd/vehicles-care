/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type Motorbike = {
  name: string;
  plateNumber: string;
  purchaseDate?: Date;
  thumbnail?: ImagePicker.ImagePickerResult | null;
};

export type MotorbikeRecord = Record<string, Motorbike>;

export type Item = {
  id?: string;
  name: string;
  icon?: any;
  timeInterval: {
    enabled: boolean;
    value: number | string;
    unit: 'd' | 'y' | 'm';
  };
  kmInterval: {
    enabled: boolean;
    value: number | string;
  };
};

export type ItemRecord = Record<string, Item>;

export type CreateItemStackParamList = {
  CreateItem: { item?: Item, icon?: any } | undefined;
  Icons: undefined;
};

export type CreateItemStackScreenProps<Screen extends keyof CreateItemStackParamList> =
  NativeStackScreenProps<CreateItemStackParamList, Screen>;

export type ListItemStackParamList = {
  ListItem: undefined,
  CreateItemStack: CreateItemStackScreenProps<'CreateItem'>
};

export type ListItemStackScreenProps<Screen extends keyof ListItemStackParamList> =
  NativeStackScreenProps<ListItemStackParamList, Screen>;



export const timeOptionMap = {
  'd': 'days',
  'm': 'months',
  'y': 'years'
}
