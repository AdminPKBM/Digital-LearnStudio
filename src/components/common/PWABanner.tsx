import React, { useState, useEffect } from 'react';
import { Download, WifiOff, X } from 'lucide-react';

export const PWABanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [showInstallBanner, setShowInstallBanner] = useState<boolean>(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const triggerInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted PWA install prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <>
      {/* Persistent Top Bar when Offline */}
      {!isOnline && (
        <div
          id="pwa-offline-topbar"
          className="bg-amber-500/90 text-slate-950 px-4 py-1.5 text-xs font-bold flex items-center justify-center gap-2 sticky top-0 z-40 shadow-md"
        >
          <WifiOff className="w-4 h-4 shrink-0" />
          <span>Mode Luring PWA Aktif — Seluruh materi, kuis, dan data tetap dapat diakses offline.</span>
        </div>
      )}

      {/* PWA Install Banner */}
      {deferredPrompt && showInstallBanner && (
        <div
          id="pwa-install-banner"
          className="bg-gradient-to-r from-cyan-950 to-blue-950 border-b border-cyan-500/30 px-4 py-2.5 text-xs text-white flex items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Install aplikasi <strong>Digital LearnStudio</strong> di Home Screen smartphone/laptop Anda untuk akses cepat offline!</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              id="btn-install-pwa-banner"
              onClick={triggerInstall}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-3 py-1 rounded-lg transition cursor-pointer"
            >
              Install PWA
            </button>
            <button
              id="btn-dismiss-pwa-banner"
              onClick={() => setShowInstallBanner(false)}
              className="text-slate-400 hover:text-white p-1 cursor-pointer"
              aria-label="Tutup banner instalasi PWA"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
