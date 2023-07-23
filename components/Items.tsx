export default function Items({ items, notItems }) {
    return (
      <div className="py-10">
        <h2 className='text-xl mb-3 font-medium'>¿Qué ofrece este lugar?</h2>
        <div className='grid grid-cols-2'>
          {items.map((item, index) =>
            <div key={index} className="p-2">
              <p>{item}</p>
            </div>
          )}
        </div>
        <h3 className='text-lg mt-6 mb-3 font-medium'>No incluye</h3>
        <div className='grid grid-cols-2'>
          {notItems.map((item, index) =>
            <div key={index} className="p-2">
              <p className='line-through'>{item}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
  