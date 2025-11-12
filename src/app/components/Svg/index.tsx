"use client";

import styles from "./icon.module.css";

interface IProps {
  className?: string;
  onClick?: any;
  children?: React.ReactNode;
  icon: string; // 👈 asegúrate que es un string
}

const Svg = ({ children, icon, ...props }: IProps) => {
  return (
    <div
      className={styles.icon}
      dangerouslySetInnerHTML={{ __html: icon }} // 👈 siempre mismo valor SSR/CSR
      {...props}
    />
  );
};

export default Svg;
