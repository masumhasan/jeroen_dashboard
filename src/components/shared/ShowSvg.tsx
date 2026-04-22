interface ShowSvgProps {
  icon: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  alt?: string;
}

const ShowSvg = ({
  icon,
  className = "",
  // Default values set to 24px (w-6 equivalent) if nothing is passed
  width = 30,
  height = 30,
  alt = "icon",
}: ShowSvgProps) => {
  return (
    <img
      src={icon}
      alt={alt}
      className={`${className} object-contain`}
      style={{
        width: width,
        height: height,
      }}
      draggable={false}
    />
  );
};

export default ShowSvg;
