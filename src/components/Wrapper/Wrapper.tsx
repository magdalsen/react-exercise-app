import style from "./Wrapper.module.css";

export const Wrapper = ({children}:{children:React.ReactNode}) => (
      <div className={style.container}>{children}</div>
    )