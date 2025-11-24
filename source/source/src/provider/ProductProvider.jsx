import {createContext ,useEffect,useState} from "react";


export const productContext = createContext();

 const ProductProvider =({children})=>{
   const [products,setProducts]= useState([])
   const [loading, setLoading] = useState(true)
   const [error,setError]=useState('')

    useEffect(()=>{
    const fetchProducts = async ()=>{
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    }
    
    
      fetchProducts();
    })

  return(
    <productContext.Provider value={{products,loading,error}}>
    {children}
    </productContext.Provider>
  )
}
export default ProductProvider;

