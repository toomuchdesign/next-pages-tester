import { getPage } from '../../index';
import { render, screen } from '@testing-library/react';
import path from 'path';
import userEvent from '@testing-library/user-event';

describe('real-world-example', () => {
  it('Should be able to access authenticated page by client side login with setting cookis', async () => {
    const { page } = await getPage({
      nextRoot: path.join(__dirname, '__fixtures__'),
      route: '/login',
      useDocument: true,
    });

    render(page);

    userEvent.click(await screen.findByText('Login'));

    await screen.findByText('Authenticated content');
    expect(
      screen.getByText('Cookie: SessionId=super-secret')
    ).toBeInTheDocument();
  });

  it('Should be able to access authenticated page directly using requestOptions cookie header', async () => {
    const { page } = await getPage({
      nextRoot: path.join(__dirname, '__fixtures__'),
      route: '/authenticated',
      useDocument: true,
      req: (req) => {
        req.headers.cookie = 'SessionId=super-secret';
        return req;
      },
    });

    render(page);

    await screen.findByText('Authenticated content');
    expect(
      screen.getByText('Cookie: SessionId=super-secret')
    ).toBeInTheDocument();
  });

  it('Should correctly render _document and work with client side interactions', async () => {
    const { page } = await getPage({
      nextRoot: path.join(__dirname, '__fixtures__'),
      route: '/?name=Matthew',
      useDocument: true,
    });

    const { container } = render(page);

    const head = container.querySelector('head') as HTMLHeadElement;
    const html = container.querySelector('html') as HTMLHtmlElement;

    expect(html).toHaveAttribute('lang', 'en');
    expect(head.querySelector('meta[name="Description"]')).toHaveAttribute(
      'Content',
      'Custom document description'
    );

    expect(head.querySelector('title')?.textContent).toEqual('Create Next App');

    // Correctly passes query
    expect(screen.getByText('Hello Matthew')).toBeInTheDocument();

    expect(screen.getByText('Count: 0')).toBeInTheDocument();

    // Make sure that click handlers work
    userEvent.click(screen.getByText('Click me'));
    expect(screen.getByText('Count: 1')).toBeInTheDocument();

    // Make sure cleint navigation work
    userEvent.click(screen.getByText('To page A'));

    const formSubmitButton = await screen.findByText('Submit form');

    await userEvent.type(
      screen.getByPlaceholderText('Email'),
      'john.doe@gmail.com'
    );

    userEvent.click(formSubmitButton);
    await screen.findByText('Got values: {"email":"john.doe@gmail.com"}');

    // TODO: something like this should work
    // screen.getByText('Came from http://localhost:3000/');

    // Make sure head title is updated with the new page
    expect(head.querySelector('title')?.textContent).toEqual('Page A');

    userEvent.click(screen.getByText('Back to root'));

    await screen.findByText('Count: 0');
  });
});