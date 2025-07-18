import AccountInfoItem from './AccountInfoItem/AccountInfoItem';

interface AccountInfoCardProps {
  email: string;
  phone: string;
  address: string;
}

const AccountInfoCard = ({ email, phone, address }: AccountInfoCardProps) => (
  <article className="mt-10 min-w-[280px] flex-1 rounded-xl bg-white p-6 shadow-base">
    <h3 className="mb-4 text-lg font-semibold">Account Information</h3>
    <div className="flex flex-col gap-2 md:justify-between">
      <AccountInfoItem label="Email" value={email} />
      <AccountInfoItem label="Phone" value={phone} />
      <AccountInfoItem label="Address" value={address} />
    </div>
  </article>
);

export default AccountInfoCard;
