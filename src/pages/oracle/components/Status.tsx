import active from '../../../icons/active.svg'
import terminated from '../../../icons/terminated.svg'
import suspended from '../../../icons/suspended.svg'
import styles from './status.module.scss'

type StatusProps = {
  status: any;
}
const Status = (props: StatusProps) => {
  const { status } = props

  return (
    <div className={styles.status}>
      {
        status === 1 &&
        <>
          <div className={styles.icon}>
            <img src={active} />
          </div>
          <div className={styles.active}>Active</div>
        </>
      }
      {
        status === 2 &&
        <>
          <div className={styles.icon}>
            <img src={terminated} alt='terminated' />
          </div>
          <div className={styles.terminated}>Terminated</div>
        </>
      }
      {
        status === 3 &&
        <>
          <div className={styles.icon}>
            <img src={suspended} alt='suspended' />
          </div>
          <div className={styles.suspended}>Suspended</div>
        </>
      }
    </div>
  )
}

export default Status