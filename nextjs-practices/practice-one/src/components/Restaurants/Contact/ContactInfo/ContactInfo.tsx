interface InfoSectionItem {
  key: string;
  content: React.ReactNode;
}

interface InfoSectionProps {
  icon: React.ReactNode;
  title: string;
  items: InfoSectionItem[];
  containerClassName?: string;
  titleClassName?: string;
  listClassName?: string;
}

const ContactInfo = ({
  icon,
  title,
  items,
  containerClassName = '',
  titleClassName = '',
  listClassName = '',
}: InfoSectionProps) => (
  <div className={containerClassName}>
    <p
      className={`flex items-center gap-[22px] mb-[22px] font-bold text-xl leading-[48px] 2xl:text-[32px] lg:gap-[15px] ${titleClassName}`}
    >
      {icon}
      {title}
    </p>
    <ul className={listClassName}>
      {items.map((item) => (
        <li key={item.key}>{item.content}</li>
      ))}
    </ul>
  </div>
);

export default ContactInfo;
