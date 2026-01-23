import React from 'react';
import { ZeroToApp } from 'zero-to-app';
import { storybookBrand } from './brandConfig';

export const withZeroToApp = (Story: React.ComponentType) => (
  <ZeroToApp brand={storybookBrand}>
    <Story />
  </ZeroToApp>
);
