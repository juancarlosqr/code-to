const Loader = ({ show = false }: { show?: boolean }) => {
  return show ? <div className="loader" /> : null;
};

export default Loader;
