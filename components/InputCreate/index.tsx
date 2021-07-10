import styles from './styles.module.scss'

interface InputCreateProps{
  title: string;
  value: string;
  setValue: (value: string) => void;
  type: 'text' | 'textarea';
}

export function InputCreate({ value, setValue, type, title }: InputCreateProps){
  return(
    <div className={styles.input_container}>
      <span className={value ? styles.filled : ''}>{title}</span>
      {
        type !== "textarea" ? (
          <input 
            type={type} 
            onChange={event => setValue(event.target.value)}
            className={value ? styles.filled : ''}
            value={value}
          />
        ) : (
          <textarea
            onChange={event => setValue(event.target.value)}
            className={value ? styles.filled : ''}
            value={value}
          >
          </textarea>
        )
      }
      
    </div>
  )
}