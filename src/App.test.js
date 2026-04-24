import { render, screen } from '@testing-library/react';
import App from './App';

// Mock react-icons so SVG icons don't break in jsdom
jest.mock('react-icons/wi', () => ({
  WiDaySunny: () => <span>WiDaySunny</span>,
  WiCloud: () => <span>WiCloud</span>,
  WiRain: () => <span>WiRain</span>,
  WiSnow: () => <span>WiSnow</span>,
  WiHumidity: () => <span>WiHumidity</span>,
  WiStrongWind: () => <span>WiStrongWind</span>,
  WiDayCloudy: () => <span>WiDayCloudy</span>,
}));

jest.mock('react-icons/fi', () => ({
  FiSearch: () => <span>FiSearch</span>,
}));

test('renders weather app title', () => {
  render(<App />);
  const titleElement = screen.getByRole('heading', { name: /Weather/i });
  expect(titleElement).toBeInTheDocument();
}); 
