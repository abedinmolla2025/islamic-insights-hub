import { useState, useEffect } from "react";
import { Compass, Navigation, Loader2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePrayerTimes } from "@/hooks/usePrayerTimes";
import { motion } from "framer-motion";

const MECCA_LAT = 21.4225;
const MECCA_LNG = 39.8262;

const QiblaPage = () => {
  const navigate = useNavigate();
  const { location, isLoading } = usePrayerTimes();
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null);
  const [deviceHeading, setDeviceHeading] = useState<number | null>(null);
  const [compassSupported, setCompassSupported] = useState(false);

  const calculateQiblaDirection = (lat: number, lng: number): number => {
    const userLatRad = (lat * Math.PI) / 180;
    const userLngRad = (lng * Math.PI) / 180;
    const meccaLatRad = (MECCA_LAT * Math.PI) / 180;
    const meccaLngRad = (MECCA_LNG * Math.PI) / 180;

    const lngDiff = meccaLngRad - userLngRad;

    const x = Math.sin(lngDiff);
    const y =
      Math.cos(userLatRad) * Math.tan(meccaLatRad) -
      Math.sin(userLatRad) * Math.cos(lngDiff);

    let qibla = Math.atan2(x, y) * (180 / Math.PI);
    qibla = (qibla + 360) % 360;

    return qibla;
  };

  useEffect(() => {
    if (location?.latitude && location?.longitude) {
      const direction = calculateQiblaDirection(
        location.latitude,
        location.longitude
      );
      setQiblaDirection(direction);
    }
  }, [location]);

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        setCompassSupported(true);
        setDeviceHeading(event.alpha);
      }
    };

    if (typeof DeviceOrientationEvent !== "undefined") {
      if (
        typeof (DeviceOrientationEvent as any).requestPermission !== "function"
      ) {
        window.addEventListener("deviceorientation", handleOrientation);
        setCompassSupported(true);
      }
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  const requestCompassPermission = async () => {
    try {
      const permission = await (
        DeviceOrientationEvent as any
      ).requestPermission();
      if (permission === "granted") {
        window.addEventListener("deviceorientation", (event) => {
          if (event.alpha !== null) {
            setDeviceHeading(event.alpha);
            setCompassSupported(true);
          }
        });
      }
    } catch (error) {
      console.error("Compass permission denied:", error);
    }
  };

  const getCompassRotation = (): number => {
    if (qiblaDirection === null) return 0;
    if (deviceHeading !== null) {
      return qiblaDirection - deviceHeading;
    }
    return qiblaDirection;
  };

  const getDirectionLabel = (degrees: number): string => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
      >
        <div className="flex items-center gap-3 px-4 py-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 -ml-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <Compass className="w-5 h-5 text-primary" />
          <h1 className="text-xl font-bold">Qibla Direction</h1>
        </div>
      </motion.header>

      <div className="p-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-8"
          >
            {/* Compass Container */}
            <div className="relative w-72 h-72 mb-6">
              {/* Outer Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 shadow-xl" />

              {/* Cardinal Directions */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="absolute top-4 text-lg font-bold text-primary">N</span>
                <span className="absolute bottom-4 text-lg font-medium text-muted-foreground">S</span>
                <span className="absolute left-4 text-lg font-medium text-muted-foreground">W</span>
                <span className="absolute right-4 text-lg font-medium text-muted-foreground">E</span>
              </div>

              {/* Degree Markers */}
              <div className="absolute inset-3">
                {[...Array(72)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-0 left-1/2 origin-bottom h-full w-px"
                    style={{ transform: `rotate(${i * 5}deg)` }}
                  >
                    <div
                      className={`w-px ${
                        i % 6 === 0 ? "h-4 bg-primary/40" : "h-2 bg-primary/20"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {/* Inner Circle */}
              <div className="absolute inset-10 rounded-full bg-background/80 backdrop-blur-sm border border-primary/10 shadow-inner" />

              {/* Qibla Arrow */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ rotate: getCompassRotation() }}
                transition={{ type: "spring", stiffness: 50 }}
              >
                <div className="relative h-full w-full flex items-center justify-center">
                  <div className="absolute top-8 flex flex-col items-center">
                    <Navigation
                      className="w-10 h-10 text-primary fill-primary drop-shadow-lg"
                      strokeWidth={1.5}
                    />
                    <span className="text-sm font-bold text-primary mt-1">Qibla</span>
                  </div>
                </div>
              </motion.div>

              {/* Center Point */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-primary shadow-lg" />
              </div>
            </div>

            {/* Direction Info */}
            {qiblaDirection !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center space-y-3"
              >
                <p className="text-4xl font-bold text-primary">
                  {Math.round(qiblaDirection)}° {getDirectionLabel(qiblaDirection)}
                </p>
                <p className="text-muted-foreground">
                  {location?.city && `From ${location.city}`}
                </p>
                {!compassSupported && (
                  <p className="text-sm text-muted-foreground">
                    Point your device towards {getDirectionLabel(qiblaDirection)} to face Qibla
                  </p>
                )}
              </motion.div>
            )}

            {typeof (DeviceOrientationEvent as any).requestPermission === "function" &&
              !compassSupported && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={requestCompassPermission}
                  className="mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-medium hover:bg-primary/90 transition-colors"
                >
                  Enable Compass
                </motion.button>
              )}

            {compassSupported && deviceHeading !== null && (
              <p className="text-sm text-green-600 mt-4 flex items-center gap-2">
                ✓ Compass active - rotate your device
              </p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QiblaPage;
