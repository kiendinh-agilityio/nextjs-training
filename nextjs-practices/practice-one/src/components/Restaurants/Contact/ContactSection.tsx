// import components
import ContactInfo from './ContactInfo/ContactInfo';
import { TrackingIcon, IDVerifyIcon, ClockIcon } from '@/components/Icons';

// import constants
import { TIMES, CONTACT_INFO } from '@/constants/restaurants-data';

// import lib
import { cn } from '@/lib/utils';

const ContactSection = () => {
  const getDeliveryItems = () => {
    return [
      ...TIMES.map((t) => ({
        key: t.day,
        content: (
          <span>
            <span className="font-bold text-black">{t.day}:</span> {t.delivery}
          </span>
        ),
      })),
      {
        key: 'estimated-time',
        content: (
          <span>
            <span className="font-bold text-black">
              Estimated time until delivery:
            </span>{' '}
            20 min
          </span>
        ),
      },
    ];
  };

  const getContactItems = () => {
    return [
      {
        key: 'allergy-notice',
        content: (
          <span>{`If you have allergies or other dietary restrictions, please contact the restaurant. The restaurant will provide food-specific information upon request.`}</span>
        ),
      },
      ...CONTACT_INFO.map((info) => ({
        key: info.title,
        content: (
          <span>
            <p className="font-bold text-black">{info.title}</p>
            <p>{info.value}</p>
          </span>
        ),
      })),
    ];
  };

  const getOperationalItems = () => {
    return TIMES.map((t) => ({
      key: t.day,
      content: (
        <span>
          <span className="font-bold">{t.day}:</span> {t.operational}
        </span>
      ),
    }));
  };

  return (
    <section className="container mt-[28px] sm:px-0 lg:mt-[151px]">
      <div
        className={cn(
          'rounded bg-[#fbfbfb] shadow-[5px_5px_14px_0_rgba(0,0,0,0.25)]',
          'px-[11px] pb-9 pt-[69px]',
          'lg:flex lg:flex-row lg:rounded-xl lg:p-0 xl:gap-7 2xl:gap-[45px]',
        )}
      >
        <ContactInfo
          icon={<TrackingIcon />}
          title="Delivery information"
          items={getDeliveryItems()}
          containerClassName={cn(
            'mb-6 px-[15px]',
            'lg:w-1/3 lg:px-0 lg:pl-[56px] lg:pt-[67px] lg:pb-[43px]',
          )}
          listClassName="text-secondary font-base text-sm leading-[46px]"
        />
        <ContactInfo
          icon={<IDVerifyIcon />}
          title="Contact information"
          items={getContactItems()}
          containerClassName={cn(
            'mb-6 px-[15px]',
            'lg:w-1/3 lg:px-0 lg:pt-[67px] lg:pb-[43px]',
          )}
          listClassName="text-secondary font-base leading-[48px]"
        />
        <ContactInfo
          icon={<ClockIcon />}
          title="Operational Times"
          items={getOperationalItems()}
          containerClassName={cn(
            'bg-secondary text-white rounded pt-4 pb-[26px] px-[43px]',
            'shadow-[5px_5px_14px_0_rgba(0,0,0,0.25)]',
            'lg:w-1/3 lg:pt-[67px] lg:pb-[43px] 2xl:px-[60px]',
          )}
          listClassName="text-base font-base leading-[46px]"
        />
      </div>
    </section>
  );
};

export default ContactSection;
