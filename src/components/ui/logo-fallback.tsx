import { Heart, Cross } from "lucide-react";

const LogoFallback = ({ className = "h-8 w-8" }: { className?: string }) => {
  return (
    <div className={`${className} bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center relative overflow-hidden`}>
      <Heart className="h-1/2 w-1/2 text-primary-foreground" fill="currentColor" />
      <div className="absolute top-0 right-0 h-3 w-3 bg-mission-gold rounded-full flex items-center justify-center">
        <div className="h-2 w-0.5 bg-white rounded-full" />
        <div className="h-0.5 w-2 bg-white rounded-full absolute" />
      </div>
    </div>
  );
};

export default LogoFallback;