import React, { useEffect, useState } from "react";
import { useInView } from "@/lib/useInView";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

// 画面に入ったら下からふわっと現れる枠。
// サーバーが出す HTML には data-reveal を付けないので、JavaScript が動かなくても内容は読める
const Reveal = ({ children, className, delay = 0 }: Props) => {
  const [ref, inView] = useInView<HTMLDivElement>();
  const [state, setState] = useState<"hidden" | "shown" | undefined>(undefined);

  useEffect(() => {
    setState(inView || prefersReducedMotion() ? "shown" : "hidden");
  }, [inView]);

  return (
    <div
      ref={ref}
      className={className}
      data-reveal={state}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};

export default Reveal;
