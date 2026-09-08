import './App.css';
import useFetch from './useFetch';

function App() {
  // Fetching the array of objects
  const { data, loading, error } = useFetch('https://api.escuelajs.co/api/v1/products');
  if (loading) {
    return (
      <div className='loading' role='status' aria-live='polite'>
        <span className='loading-spinner' aria-hidden='true' />
        <span>Loading data...</span>
      </div>
    );
  }
  if (error) return <p className='error'>Error: {error}</p>;

  return (
    <>
      <h2>Photos</h2>
      <div className='photos'>
        
        
            {/* Loop through the array of objects */}
            {data && data.map((item, index) => {
              const sizeClass = `photo-size-${(index % 4) + 1}`;

              return (
              <div className='photo' key={item.id}>
                
                  <div className={`photo-size ${sizeClass}`}>600 x 600</div>
                  <p>{item.title}</p>
                
              </div>
              );
            })}
      </div> 
    </> 
  );
}

export default App;
