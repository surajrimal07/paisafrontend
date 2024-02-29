import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './component/Footer/Footer';
import FeaturesPage from './component/feathures/feathures';
import Login from './pages/login/login3';
import NrbData from './pages/nrbpage/nrb';
import MarketData from './pages/worldmarket/worldmarket';

//jest.mock('axios');

describe('Login Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the login form', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    const signInElements = screen.queryAllByText(/sign in/i);
    expect(signInElements.length).toBeGreaterThanOrEqual(2);
  });

  it('renders the register form when switching to register mode', () => {

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.click(screen.getByText(/Go to Sign Up Page/i));
    expect(screen.getByRole('button', { name: /Verify Email/i })).toBeInTheDocument();
  });

  it('renders the login form when switching to login mode', () => {

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.click(screen.getByText(/Go to Sign Up Page/i));
    fireEvent.click(screen.getByText(/Go Back To Sign In Page/i));
    const signInElements = screen.queryAllByText(/sign in/i);
    expect(signInElements.length).toBeGreaterThanOrEqual(2);
  });

  it('renders the forget password form when switching to forget password', () => {

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.click(screen.getByText(/forget password?/i));
    const signInElements = screen.queryAllByText(/forget password/i);
    expect(signInElements.length).toBeGreaterThanOrEqual(2);
  });

  it('logs in with email and password', async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'suraj@rimal.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: '111111' },
    });

    fireEvent.click(screen.getByTestId('sign-in-button'));

    await waitFor(() => {
      expect(screen.getByText('Login successful')).toBeInTheDocument();
    });
  });

  it('login with wrong email and password', async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'suraj@rimal.coms' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: '111111' },
    });

    fireEvent.click(screen.getByTestId('sign-in-button'));

    await waitFor(() => {
      expect(screen.getByText('Invalid email or password.')).toBeInTheDocument();
    });
  });

  it('renders wrong email and pass in forget password', async () => {

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.click(screen.getByText(/forget password?/i));

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'suraj@rimal.coms' },
    });
    fireEvent.click(screen.getByTestId('sign-in-button'));

    await waitFor(() => {
      expect(screen.getByText('Email Not found')).toBeInTheDocument();
    });
  });

  it('renders correct email and pass in forget password', async () => {

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.click(screen.getByText(/forget password?/i));

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'suraj@rimal.com' },
    });
    fireEvent.click(screen.getByTestId('sign-in-button'));

    await waitFor(() => {
      expect(screen.getByText('Please Wait...')).toBeInTheDocument();
    });
  });

  it('renders already used email in signup', async () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    fireEvent.click(screen.getByText(/Go to Sign Up Page/i));
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'suraj@rimal.com' },
    });
    fireEvent.click(screen.getByTestId('sign-up-button'));

    await waitFor(() => {
      expect(screen.getByText('Please Wait...')).toBeInTheDocument();
    });
  });

  it('renders homepage', async () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    fireEvent.click(screen.getByText(/Go to Sign Up Page/i));
    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'suraj@rimal.com' },
    });
    fireEvent.click(screen.getByTestId('sign-up-button'));

    await waitFor(() => {
      expect(screen.getByText('Please Wait...')).toBeInTheDocument();
    });
  });
});


describe('Footer Component', () => {

  it('renders Footer component properly', () => {
    render(
      <Router>
        <Footer />
      </Router>
    );
    expect(screen.getByText('Connect with us')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });
});

describe('world market Component', () => {

  it('renders news component properly', () => {
    render(
      <Router>
        <MarketData />
      </Router>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders Banking Data component after loading completes', async () => {
    render(
      <Router>
        <MarketData />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('World Market Today')).toBeInTheDocument();
    });
  });
});


describe('NRB Component', () => {

  it('renders nrb component properly', () => {
    render(
      <Router>
        <NrbData />
      </Router>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders nrb Data component after loading completes', async () => {
    render(
      <Router>
        <NrbData />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('NRB Data')).toBeInTheDocument();
    });
  });
});

describe('FeaturesPage Component', () => {
  it('renders feature cards with correct titles and descriptions', () => {
    render(<FeaturesPage />);
    const featureCards = screen.getAllByTestId('feature-card');
    expect(featureCards).toHaveLength(4);
    expect(screen.getByText('Intelligent Budgeting')).toBeInTheDocument();
    expect(screen.getByText('Smart Investments')).toBeInTheDocument();
    expect(screen.getByText('Real-time Analytics')).toBeInTheDocument();
    expect(screen.getByText('User-Friendly Interface')).toBeInTheDocument();
  });
});