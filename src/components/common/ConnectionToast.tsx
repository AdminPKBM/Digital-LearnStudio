import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Wifi,
  WifiOff,
  X,
  ShieldCheck,
  Sparkles,
  BookOpen,
  HelpCircle,
  Database,
  RefreshCw,
  Info
} from 'lucide-react';

interface ConnectionToastProps {
  /** Optional className to adjust positioning if needed */
  className?: string;
}

export const ConnectionToast: React.FC<ConnectionToastProps> = ({ className = '' }) => {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [showOfflineToast, setShowOfflineToast] = useState<boolean>(
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );
  const [showOnlineToast, setShowOnlineToast] = useState<boolean>(false);
  const [showDetailedInfo, setShowDetailedInfo] = useState<boolean>(false);

  useEffect(() => {
    // Handler when connection is lost
    const handleOffline = () => {
      setIsOnline(false);
      setShowOnlineToast(false);
      setShowOfflineToast(true);
    };

    // Handler when connection is restored
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineToast(false);
      setShowOnlineToast(true);

      // Automatically dismiss the online notification after 5 seconds
      const timer = setTimeout(() => {
        setShowOnlineToast(false);
      }, 5000);

      return () => clearTimeout(timer);
    };

    // Bind using standard window.ononline and window.onoffline event handlers
    window.onoffline = handleOffline;
    window.ononline = handleOnline;

    // Supplementary event listeners for full cross-browser event compatibility
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.onoffline = null;
      window.ononline = null;
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return (
    <div
      id="connection-toast-container"
      className={`fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50 pointer-events-none ${className}`}
    >
      <div className="flex flex-col items-end gap-3 pointer-events-auto max-w-md w-[calc(100vw-2rem)] sm:w-96">
        <AnimatePresence>
          {/* OFFLINE TOAST NOTIFICATION */}
          {showOfflineToast && !isOnline && (
            <motion.div
              key="offline-toast"
              id="offline-connection-toast"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full bg-slate-900/95 text-slate-100 border-2 border-amber-500/50 rounded-3xl p-5 shadow-2xl backdrop-blur-xl space-y-4"
              role="status"
              aria-live="polite"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30 shrink-0">
                    <WifiOff className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-white tracking-wide">
                        Koneksi Terputus
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                        PWA Offline
                      </span>
                    </div>
                    <p className="text-xs text-amber-400/90 font-medium mt-0.5">
                      Mode Pembelajaran Luring Aktif
                    </p>
                  </div>
                </div>

                <button
                  id="btn-close-offline-toast"
                  onClick={() => setShowOfflineToast(false)}
                  className="text-slate-400 hover:text-white p-1.5 hover:bg-slate-800 rounded-xl transition cursor-pointer shrink-0"
                  aria-label="Tutup notifikasi koneksi"
                  title="Tutup Notifikasi"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* PWA Capabilities Highlight Message */}
              <div className="bg-slate-950/70 border border-amber-500/20 rounded-2xl p-3.5 space-y-2">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Aplikasi ini dilengkapi fitur <strong>Progressive Web App (PWA)</strong>. Anda tetap dapat melanjutkan pembelajaran tanpa hambatan:
                </p>

                <ul className="space-y-1.5 pt-1 text-[11px] text-slate-300">
                  <li className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Membaca seluruh 16 modul materi tersimpan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Mengerjakan kuis interaktif & latihan mandiri</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Database className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Nilai & catatan otomatis disimpan di memori lokal</span>
                  </li>
                </ul>
              </div>

              {/* Extra Details Expandable */}
              {showDetailedInfo && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-[11px] text-slate-400 bg-slate-950/90 border border-slate-800 p-3 rounded-xl space-y-1.5"
                >
                  <p className="flex items-center gap-1.5 text-amber-300 font-semibold">
                    <Info className="w-3.5 h-3.5" />
                    Mekanisme Sinkronisasi Otomatis
                  </p>
                  <p className="leading-relaxed">
                    Seluruh aktivitas, perolehan XP, dan presensi belajar saat offline disimpan dalam cache lokal peramban. Saat internet pulih, sistem akan menyinkronkannya ke server sekolah secara otomatis.
                  </p>
                </motion.div>
              )}

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <button
                  id="btn-toggle-offline-info"
                  onClick={() => setShowDetailedInfo(!showDetailedInfo)}
                  className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 font-medium transition cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{showDetailedInfo ? 'Sembunyikan Info' : 'Info Sinkronisasi'}</span>
                </button>

                <button
                  id="btn-dismiss-offline"
                  onClick={() => setShowOfflineToast(false)}
                  className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 hover:text-amber-200 border border-amber-500/30 font-medium rounded-xl text-xs transition cursor-pointer"
                >
                  Mengerti
                </button>
              </div>
            </motion.div>
          )}

          {/* ONLINE RESTORED TOAST NOTIFICATION */}
          {showOnlineToast && isOnline && (
            <motion.div
              key="online-toast"
              id="online-connection-toast"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="w-full bg-slate-900/95 text-slate-100 border-2 border-emerald-500/50 rounded-3xl p-4 shadow-2xl backdrop-blur-xl space-y-2.5"
              role="status"
              aria-live="polite"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30 shrink-0">
                    <Wifi className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-white">
                        Koneksi Internet Kembali Aktif
                      </h4>
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-xs text-emerald-400/90 font-medium">
                      PWA Synced • Terhubung Kembali
                    </p>
                  </div>
                </div>

                <button
                  id="btn-close-online-toast"
                  onClick={() => setShowOnlineToast(false)}
                  className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-lg transition cursor-pointer shrink-0"
                  aria-label="Tutup notifikasi online"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/60 border border-emerald-500/20 px-3 py-2 rounded-xl">
                <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                <span>Seluruh data aktivitas lokal PWA telah disinkronkan secara aman.</span>
              </div>
            </motion.div>
          )}

          {/* MINIFIED PERSISTENT BADGE WHEN OFFLINE TOAST DISMISSED */}
          {!isOnline && !showOfflineToast && (
            <motion.button
              key="offline-min-badge"
              id="offline-min-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setShowOfflineToast(true)}
              className="flex items-center gap-2 bg-amber-500/90 hover:bg-amber-500 text-slate-950 px-3 py-1.5 rounded-full font-bold text-xs shadow-lg transition cursor-pointer border border-amber-400"
              title="Klik untuk membuka status luring PWA"
            >
              <WifiOff className="w-3.5 h-3.5" />
              <span>PWA Offline Mode</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
