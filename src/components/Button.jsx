const Button = ({ children, variant = "primary", ...props }) => {
  const styles = {
    primary: "bg-blue-500 text-white",
    danger: "bg-red-500 text-white",
    success: "bg-green-600 text-white",
  };

  return (
    <button {...props} className={`px-3 py-1 rounded ${styles[variant]}`}>
      {children}
    </button>
  );
};


export default Button