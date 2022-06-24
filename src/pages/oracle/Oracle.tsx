
import { useEffect, useState } from "react";
import Card from "./components/Card";
import { getCoinList } from '../../fakeapi/data'
import styles from './oracle.module.scss';
import vector from '../../icons/vector.svg'
import Loading from "./components/Loading";

const Oracle = () => {
  const [selectedId, setSelectedId] = useState()
  const [loading, setLoading] = useState(false)
  const [list, setList]: [Array<any>, Function] = useState([])

  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    setLoading(true)
    const res = await getCoinList()
    setLoading(false)
    setList(res)
  }

  const onItemClick = (id: any) => {
    setSelectedId(id)
  }

  return (
    <div className={styles.coinWrapper}>
      <div className={styles.coinList}>
        { loading && <Loading /> }
        {!loading && <div className={styles.logo}>
          <div className={styles.icon}><img alt="vector" src={vector}/></div>
          <div className={styles.text}>Oracle</div>
        </div>}
        <div className={styles.list}>
          {list && list.map((item: any) => <Card key={item.id} data={item} selected={item.id === selectedId} onClick={() => onItemClick(item.id)}/>)}
        </div>
      </div>
    </div>
  )
}

export default Oracle