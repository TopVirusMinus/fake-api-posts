import { useEffect } from "react";
const [data, setData] = useState([]);

export const useFetch= (url)=>{
    useCallback(()=>{
        const fetchData = async _=>{
            await axios.get(url)
            .then((res)=>setData((prev)=>prev = res.data))       
        }
    },[])

    return [fetchData];
}
