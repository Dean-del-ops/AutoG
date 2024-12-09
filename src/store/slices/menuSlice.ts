import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MenuItem, menuConfig } from '@/utils/menuConfig';

export interface MenuState {
  menu: MenuItem[];
}

const initialState: MenuState = {
  menu: [],
};

// Recursive filter to handle submenus
const filterMenuByRoles = (menu: MenuItem[], roles: string[]): MenuItem[] => {
  return menu
    .filter((item) => item.roles.some((role) => roles.includes(role))) // Filter top-level menu
    .map((item) => ({
      ...item,
      children: item.children ? filterMenuByRoles(item.children, roles) : undefined, // Filter submenus
    }));
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenu: (state, action: PayloadAction<string[]>) => {
      const roles = action.payload;
      state.menu = filterMenuByRoles(menuConfig, roles);
    },
  },
});

export const { setMenu } = menuSlice.actions;

export default menuSlice.reducer;
