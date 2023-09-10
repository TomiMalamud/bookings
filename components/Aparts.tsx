export default function Aparts({ beds }) {
  return (
    <div className="py-10">
      <h2 className="text-xl mb-4 font-medium">Departamentos</h2>
      <div className="grid grid-cols-2 gap-x-4">
        {beds.map((bed, index) => (
          <div key={index} className="border p-4 my-2 rounded-xl">
            <div className="mb-4" aria-hidden="true">
              <span className=" inline-block mr-2">
                <svg
                  className="block h-6 w-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                >
                  <path d="M26 4a2 2 0 0 1 2 1.85v7.99l1.85 5.54a3 3 0 0 1 .11.46l.03.24.01.24V30h-2v-2H4v2H2v-9.68a3 3 0 0 1 .09-.71l.06-.23L4 13.84V6a2 2 0 0 1 1.7-1.98l.15-.01L6 4zm2 18H4v4h24zm-1.39-6H5.4l-1.34 4h23.9zM26 6H6v8h2v-4a2 2 0 0 1 1.85-2H22a2 2 0 0 1 2 1.85V14h2zm-11 4h-5v4h5zm7 0h-5v4h5z"></path>
                </svg>
              </span>
            </div>
            <p className="text-md font-semibold">Departamento {index + 1}</p>
            <p className="text-sm text-gray-600">{bed}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
