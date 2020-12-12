import 'mocha';

import { AppPage } from './app.po';
import { expect } from './expect';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', async () => {
    await page.navigateTo();

    await expect(page.getTitleText()).to.eventually.equal('todo-app-ui app is running!');
  });
});
