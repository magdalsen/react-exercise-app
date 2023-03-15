import style from "./Wrapper.module.css";

export const Wrapper = ({children}:{children:React.ReactNode}) => {
    return (
      <div className={style.container}>{children}</div>
    )
}