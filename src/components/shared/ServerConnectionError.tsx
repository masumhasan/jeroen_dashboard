import { WifiOff, RefreshCw } from "lucide-react";

interface ServerConnectionErrorProps {
  onRetry?: () => void;
  title?: string;
  message?: string;
}

export default function ServerConnectionError({
  onRetry,
  title = "Unable to Connect to Server",
  message = "The backend server is currently unreachable. Please make sure the server is running and try again.",
}: ServerConnectionErrorProps) {
  return (
    <div className="flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md text-center space-y-5">
        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <WifiOff className="h-8 w-8 text-red-400" strokeWidth={1.5} />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold tracking-tight text-gray-900">
            {title}
          </h2>
          <p className="text-sm leading-relaxed text-gray-500">{message}</p>
        </div>

        {/* Retry */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "#89957F",
              boxShadow: "0 4px 12px rgba(137,149,127,0.3)",
            }}
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>
        )}

        {/* Status hint */}
        <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
          <p className="text-xs text-gray-400 leading-relaxed">
            Check that your backend server is running and the API URL is
            configured correctly. If the issue persists, contact your system
            administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
