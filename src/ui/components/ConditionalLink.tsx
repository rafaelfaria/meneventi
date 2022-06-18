import { Link } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  to?: string | null;
  href?: string | null;
  condition: boolean;
  target?: string;
  underline?: "none" | "always" | "hover";
  onClick?: (e: any) => void;
  children: React.ReactNode;
}

const ConditionalLink: React.FC<Props> = ({ children, to, href, condition, target, underline, onClick }) => {
  const navigate = useNavigate();

  const handleOnClick = (e: any) => {
      if (to) {
        e.preventDefault();
        navigate(to);
      }
      onClick && onClick(e);
      return null;
  }

  return (!!condition && (to || href))
      ? <Link href={(to || href || '#')} onClick={handleOnClick} target={target || '_self'} underline={underline || 'always'}>{children}</Link>
      : <>{children}</>;
}

export default ConditionalLink;