import { WeelinkPage } from './app.po';

describe('weelink App', function() {
  let page: WeelinkPage;

  beforeEach(() => {
    page = new WeelinkPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
