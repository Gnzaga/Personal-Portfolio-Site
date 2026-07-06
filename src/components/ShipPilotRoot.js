import { useNavigate, useLocation } from 'react-router-dom';
import { ShipPilotProvider, ChatWidget } from '@shippilot/react';
import siteGraph from '../shippilot/site-graph.json';

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
        accentColor: '#a855f7',
        welcomeMessage: "Hi! I can help you navigate this site or answer questions about Alex's work.",
        position: 'bottom-right',
      }}
      router={router}
    >
      {children}
      <ChatWidget />
    </ShipPilotProvider>
  );
}
