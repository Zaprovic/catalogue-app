type props = {
  title: string;
  items?: string[];
  children?: React.ReactNode;
};

const FooterItem = ({ items, title, children }: props) => {
  return (
    <div className="flex-1 items-center">
      <h4 className="mb-2 font-semibold">{title}</h4>
      <ul className="flex flex-col gap-2">{children}</ul>
    </div>
  );
};

export default FooterItem;
