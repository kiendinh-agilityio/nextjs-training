interface AccountInfoItemProps {
  label: string;
  value: string;
}

const AccountInfoItem = ({ label, value }: AccountInfoItemProps) => (
  <div className="flex flex-col gap-1 md:flex-row md:justify-between">
    <p className="font-medium">{label}</p>
    <p className="text-gray-600">{value}</p>
  </div>
);

export default AccountInfoItem;
