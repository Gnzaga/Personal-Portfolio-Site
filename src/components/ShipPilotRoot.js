import { useNavigate, useLocation } from 'react-router-dom';
import { ShipPilotProvider } from '@shippilot/react';
import siteGraph from '../shippilot/site-graph.json';
import ShipPilotWidget from './ShipPilotWidget';

export function ShipPilotRoot({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const router = {
    getCurrentPath: () => location.pathname,
    navigate: (to) => navigate(to),
  };

  return (
    <ShipPilotProvider
      config={{
        chatEndpoint: '/chat',
        siteGraph,
        welcomeMessage: "Hi! I can help you navigate this site or answer questions about Alex's work.",
        agentModeLabel: 'Agent Navigating...',
      }}
      router={router}
    >
      {children}
      <ShipPilotWidget />
    </ShipPilotProvider>
  );
}
