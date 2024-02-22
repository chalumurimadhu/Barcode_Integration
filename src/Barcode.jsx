import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './styles.module.css'
const Barcode = () => {
    let [state,setState] = useState("");
    let [items,setItems] = useState([]);
    let handlechange = (e)=>{
       setState(e.target.value);
       console.log(e.target.value);
    }
    let handleSubmit = (e)=>{
        axios.get(`https://world.openfoodfacts.org/api/v2/product/${state}.json`).then((res)=>{
            if(res.data && res.data.product){
                setItems([res.data.product])
            }
            else{
                setItems([]);
            }
        }).catch((err)=>{
            console.log("Error");
        })
      
    }
  return (
    <div>
       <div className={styles.nav}>
            <h1>Enter a Barcode </h1>
            <input type="text" value={state} onChange={handlechange} />
            <button onClick={handleSubmit}>Check</button>
    
       </div>
        {items.map((data)=>{
            return <div className={styles.full} key={data.id}>
                    <div className={styles.left}>
                        <h1><span> Product Name :- </span>{data.product_name}</h1>
                        <div className={styles.card}>
                            <img src={data.image_url} alt="" />
                            <div className={styles.para1}>
                                <p className={styles.para}><span>Country Of Origin</span> :-{data.countries_tags}.</p>
                                <p className={styles.para}><span>Categories -</span> {data.categories}.</p>
                                <p className={styles.para}><span>Creator :-</span> {data.creator}.</p>
                            </div>
                        </div>
                    </div>
                </div>
        })
        }
    </div>
  )
}

export default Barcode