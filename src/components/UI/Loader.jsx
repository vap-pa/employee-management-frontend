const Loader = ({ size = 'medium' }) => {
    const sizes = {
      small: 'h-6 w-6',
      medium: 'h-8 w-8',
      large: 'h-12 w-12',
    };
  
    return (
      <div className="flex justify-center items-center">
        <div
          className={`${sizes[size]} animate-spin rounded-full border-4 border-solid border-current border-r-transparent`}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  };
  
  export default Loader;