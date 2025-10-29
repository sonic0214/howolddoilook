import { useEffect, useState } from 'react';

const ENABLE_SERVICE_WORKER = import.meta.env.VITE_ENABLE_SW === 'true';

export default function useServiceWorker() {
  const [isSupported, setIsSupported] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    setIsSupported(true);

    if (!ENABLE_SERVICE_WORKER) {
      navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => {
          registrations.forEach((reg) => {
            reg.unregister().catch((error) => {
              console.warn('Service Worker unregister failed:', error);
            });
          });
        })
        .catch((error) => {
          console.warn(
            'Unable to fetch service worker registrations:',
            error
          );
        });
      return;
    }

    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        console.log('Service Worker registered successfully:', reg);
        setRegistration(reg);
        setIsRegistered(true);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }, []);

  const updateServiceWorker = () => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      registration.waiting.addEventListener('statechange', (event) => {
        const target = event.target as ServiceWorker;
        if (target.state === 'activated') {
          window.location.reload();
        }
      });
    }
  };

  return {
    isSupported,
    isRegistered,
    updateServiceWorker,
  };
}
