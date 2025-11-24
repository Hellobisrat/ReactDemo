import {useContext,useState} from 'react'
import { Link } from 'react-router-dom'
import { productContext } from '../provider/ProductProvider'
import SearchIcon from '@mui/icons-material/Search';
import LoadingSpinner from '../component/Loading';


const Home = () => {
  const {products,loading} = useContext(productContext)
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault(); 
    setQuery(searchTerm); 
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );


  return (
    (loading  ? <section className='h-screen flex justify-center items-center'>
        <LoadingSpinner/>
      </section> : <div className=' max-w-sm mx-auto md:max-w-none md:mx-0 p-2 md:p-4 lg:p-6 '>
        <div className='  flex items-center justify-center border  border-blue-500 
        rounded-full w-[250px] lg:w-[700px] md:w-[400px] sm:w-[250px] my-6 md:my-15 lg:my-20 mx-auto focus-within:ring-2 focus-within:ring-pink-300'> 
          <form onSubmit={handleSearch} className='flex items-center w-full pl-4'>
           
            <span>
             <SearchIcon className='w-5 h-5 text-blue-500'/>
            </span>
            <input
             type='search'
             name='search'
             placeholder='Search your product'
             onChange={handleChange}
             className='flex-1 px-8 p-2   focus-within:outline-none placeholder:text-pink-200'
             />
             <button type='submit' className='bg-blue-400 text-white font-semibold rounded-r-full p-2'>search</button>
          
          </form>
        </div>
        <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px] '>
        {filteredProducts.map((product)=>{
        return(
        <Link key={product.id} to={`/productDetails/${product?.id}` }>
        <div  key={product.id} className='border border-[#e4e4e4] h-[300px] flex flex-col justify-center items-center  gap-2 rounded-sm p-2 md:p-4 lg:p-6'>
          <p className='font-semibold text-slate-900 '>{product.title}</p>
          <img src={product.image} alt='' className='w-40 h-40 content-around'/>
          <p className='text-sm mt-1 text-slate-500 flex justify-start'>Price: ${product.price}</p> </div>
        </Link>)
      })}
      </div>
       </div>)
  )
}

export default Home;