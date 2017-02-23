import { RaProject03Page } from './app.po';

describe('ra-project03 App', function() {
  let page: RaProject03Page;

  beforeEach(() => {
    page = new RaProject03Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
