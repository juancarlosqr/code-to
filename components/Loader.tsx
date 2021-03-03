const Loader = ({ show = false }: { show?: boolean }) => {
  return show ? <section className="loader" /> : null;
};

export default Loader;
