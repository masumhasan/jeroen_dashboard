import React from "react";
import AppIcon from "@/assets/images/AppIcon.svg";
import ShowSvg from "@/components/shared/ShowSvg";
import Text from "@/components/shared/Text";

interface AuthCardProps {
  title: string;
  subtitle: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const AuthCard = ({ title, subtitle, children, footer }: AuthCardProps) => (
  <div
    className="flex items-center justify-center min-h-screen px-4 overflow-hidden"
    style={{ background: "#fff" }}
  >
    {/* Ambient glow */}
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: "60vw",
        height: "60vw",
        maxWidth: "500px",
        maxHeight: "500px",
        background:
          "radial-gradient(circle, rgba(137, 149, 127, 0.08) 0%, transparent 70%)",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />

    <div className="relative w-full max-w-100">
      <div
        className="rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        style={{
          background: "#fff",
          border: "1px solid rgba(137, 149, 127, 0.15)",
          boxShadow:
            "0 24px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(137, 149, 127, 0.08)",
        }}
      >
        {/* Inner top glow */}
        <div
          className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(137, 149, 127, 0.1) 0%, transparent 70%)",
          }}
        />
        {/* Top accent line */}
        <div
          className="absolute top-0 left-8 right-8 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(137, 149, 127, 0.5), transparent)",
          }}
        />

        {/* Icon */}
        <div className="flex justify-center mb-6 relative z-10">
          <div
            className="p-2 rounded-xl"
            style={{
              background: "rgba(137, 149, 127, 0.1)",
              border: "1px solid rgba(137, 149, 127, 0.2)",
              boxShadow: "0 4px 16px rgba(137, 149, 127, 0.15)",
            }}
          >
            <ShowSvg icon={AppIcon} height={36} width={36} alt="App Logo" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8 relative z-10">
          <Text text={title} color="text-black" />
          <p className="text-sm mt-3" style={{ color: "#000" }}>
            {subtitle}
          </p>
        </div>

        {/* Content */}
        <div className="relative z-10">{children}</div>

        {/* Footer links */}
        {footer && <div className="relative z-10">{footer}</div>}
      </div>

      <p
        className="text-center text-[10px] sm:text-xs mt-10"
        style={{ color: "#000" }}
      >
        Protected by ReCallPro &mdash; All rights reserved
      </p>
    </div>
  </div>
);

export default AuthCard;
