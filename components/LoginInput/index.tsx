import styles from './styles.module.scss'

interface LoginInputProps {
  title: string;
  type: string;
}

export function LoginInput({ title, type }: LoginInputProps){
  return(
    <div className={styles.input_container}>
      <span>{title}</span>
      <input type={type}/>
    </div>
  )
}