import React, { useRef, useEffect, useState } from "react";
import { ArrowLeft, MoreHorizontal, Camera, Image, Zap, ZapOff, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CameraScannerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CameraScanner: React.FC<CameraScannerProps> = ({ isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isFlashOn, setIsFlashOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const startCamera = async () => {
    try {
      setIsLoading(true);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
      }
    } catch (error) {
      console.error("Erreur d'accès à la caméra:", error);
      toast({
        title: "Erreur caméra",
        description: "Impossible d'accéder à la caméra. Vérifiez les permissions.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const toggleFlash = async () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      const capabilities = videoTrack.getCapabilities() as any;
      
      if (capabilities.torch) {
        try {
          await videoTrack.applyConstraints({
            advanced: [{ torch: !isFlashOn } as any]
          });
          setIsFlashOn(!isFlashOn);
        } catch (error) {
          console.error("Erreur flash:", error);
          toast({
            title: "Flash non disponible",
            description: "Le flash n'est pas supporté sur cet appareil.",
          });
        }
      } else {
        toast({
          title: "Flash non disponible",
          description: "Le flash n'est pas supporté sur cet appareil.",
        });
      }
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        
        // Convertir en blob pour traitement
        canvas.toBlob((blob) => {
          if (blob) {
            // Ici on pourrait envoyer l'image à une API d'analyse
            toast({
              title: "Photo capturée !",
              description: "Analyse de l'aliment en cours...",
            });
            
            // Simuler une analyse
            setTimeout(() => {
              toast({
                title: "Analyse terminée",
                description: "Pancakes aux myrtilles détectés !",
              });
              onClose();
            }, 2000);
          }
        }, 'image/jpeg', 0.8);
      }
    }
  };

  const openGallery = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        toast({
          title: "Image sélectionnée",
          description: "Analyse de l'image en cours...",
        });
        
        setTimeout(() => {
          toast({
            title: "Analyse terminée",
            description: "Aliment détecté dans l'image !",
          });
          onClose();
        }, 2000);
      }
    };
    input.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 pt-12">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <h1 className="text-white text-lg font-semibold">Scanner</h1>
        
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70"
        >
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Flash Button */}
      <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFlash}
          className="w-10 h-10 rounded-full bg-black/50 text-white hover:bg-black/70"
        >
          {isFlashOn ? <Zap className="w-5 h-5" /> : <ZapOff className="w-5 h-5" />}
        </Button>
      </div>

      {/* Camera View */}
      <div className="relative w-full h-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
              <p>Ouverture de la caméra...</p>
            </div>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            
            {/* Scan Frame */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 border-2 border-white rounded-3xl relative">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-3xl"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-3xl"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-3xl"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-3xl"></div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pb-12">
        {/* Scan food button */}
        <div className="bg-white rounded-full px-6 py-3 mb-6 mx-auto w-fit">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-sm font-medium">Scan food</span>
            <Button variant="ghost" size="sm" onClick={capturePhoto}>
              <Camera className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={openGallery}>
              <Image className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Capture button */}
        <div className="flex justify-center">
          <Button
            onClick={capturePhoto}
            className="w-20 h-20 rounded-full bg-white border-4 border-gray-300 hover:bg-gray-100 p-0"
          >
            <div className="w-16 h-16 rounded-full bg-white border-2 border-gray-400"></div>
          </Button>
        </div>
      </div>

      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default CameraScanner;