import { cn } from '@/lib/utils';

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
      className={cn(
        'mb-[22px] flex items-center gap-[22px] text-xl font-bold leading-[48px]',
        'lg:gap-[15px] 2xl:text-[32px]',
        titleClassName,
      )}
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
