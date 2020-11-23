import { storiesOf as storiesOfReal } from '@andoshin11/storybook-vue3'

import {
  specs as specsReal,
  describe as describeReal,
  it as itReal,
  beforeEach as beforeEachReal,
  before as beforeReal,
  after as afterReal,
  afterEach as afterEachReal,
  xit as xitReal,
  fit as fitReal,
  xdescribe as xdescribeReal
} from 'storybook-addon-specifications'

export const storiesOf = storiesOfReal;
export const specs = specsReal;
export const describe = describeReal;
export const it = itReal;

export const beforeEach = beforeEachReal;
export const afterEach = afterEachReal;
export const before = beforeReal;
export const after = afterReal;

export const xit = xitReal;
export const fit = fitReal;
export const xdescribe = xdescribeReal;
